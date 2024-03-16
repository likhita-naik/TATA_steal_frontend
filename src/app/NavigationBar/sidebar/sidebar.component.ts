import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/Services/server.service';
import { SidebarService } from './sidebar.service';
import crypto from "crypto-js";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit ,AfterViewInit{
   isCollapse:boolean=false
   adminProfileDetails:any
   userProfileDetails:any
   jwtoken :string
   userType:string
   autoLogout:any
   isLogout:any

   ChangePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl("", Validators.required),
    newPassword: new FormControl("", Validators.required),
    confirmPassword:new FormControl("",Validators.required),
  })

  EditProfileForm: FormGroup = new FormGroup({
    fullName: new FormControl("", Validators.required),
    contactNumber: new FormControl("", Validators.required),
    department:new FormControl("",Validators.required),
  })

  constructor(
    private router:Router,
    public server:ServerService,
    private ModalService:NgbModal,
    public service:SidebarService) 
    { 
      this.server.isCollapse.subscribe((value:any)=>{
        this.isCollapse=value
        console.log('iscollapse',this.isCollapse)
      })
   
      console.log(this.isCollapse,'collapse')

        this.jwtoken = localStorage.getItem('jwtoken')
        

        let userData: any = sessionStorage.getItem("session");
      var decodedString = crypto.AES.decrypt(userData, this.server.secretKey);
      userData = JSON.parse(decodedString.toString(crypto.enc.Utf8));
      this.userType = userData.userType;


      this.userType === 'admin'?this.ViewAdminProfileDetails():this.ViewUserProfileDetails()

      this.autoLogout =  setInterval(()=>{
      this.userType === 'admin'?this.ViewAdminProfileDetails():this.ViewUserProfileDetails()
      // console.log(this.userType,'this is user type from the constructor')
    },this.service.autoLogoutInterval)

    this.isLogout=localStorage.getItem('logout')
    // console.log(this.isLogout,'this is  logout localstorage from the sidebar')
    }

  ngOnInit(): void {

    this.userType === 'admin'?this.ViewAdminProfileDetails():this.ViewUserProfileDetails()
    
  }

  ngAfterViewInit(): void {

    if(localStorage.getItem('isCollapse')=='true'){
      this.isCollapse=true
      var sidebarWrapper=document.getElementById('sidebarWrapper')
      var sidebar=document.getElementById('sidebar')
      var footer=document.getElementById('footer')
      var wrapper=document.getElementsByClassName('dashboard-wrapper')[0]
      sidebar.classList.toggle('active')
      footer.classList.toggle('active')
      wrapper.classList.toggle('active')
      this.server.isCollapse.next(true)
    }

    else{
      this.isCollapse=false
    }

  }


  adminLogout(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.jwtoken
      })
    };

    

    this.service.AdminLogout(httpOptions).subscribe((Response:any)=>
    {
      if(Response.success){
        this.ModalService.dismissAll()
        this.service.notification(Response.message)
        sessionStorage.removeItem('session')
        // localStorage.removeItem('jwtoken')
      }
      else{
        this.ModalService.dismissAll()
      }
      
    })
    // localStorage.removeItem('jwtoken')
    sessionStorage.removeItem("session")
    this.router.navigate(['/login']) 
}


openAdminLogoutModal(modal:any){
  this.ModalService.open(modal,{centered:true,backdrop:'static'})
}

openUserLogoutModal(modal:any){
  this.ModalService.open(modal,{centered:true,backdrop:'static'})
}


toggleSidebar(){
  this.isCollapse=!this.isCollapse
  localStorage.setItem('isCollapse','true')
  var sidebarWrapper=document.getElementById('sidebarWrapper')
  var sidebar=document.getElementById('sidebar')
  var footer=document.getElementById('footer')
  var wrapper=document.getElementsByClassName('dashboard-wrapper')[0]
  console.log(wrapper)
  sidebar.classList.toggle('active')
  footer.classList.toggle('active')
  wrapper.classList.toggle('active')
  this.server.isCollapse.next(this.isCollapse)
}


OpenChangePassword(modal:any){
  this.ModalService.dismissAll()
  this.ModalService.open(modal)
}

ChangeAdminPasswordSubmit(){
  var data:any = {
    current_password:this.service.encodePassword(this.ChangePasswordForm.value["currentPassword"]),
    new_password:this.service.encodePassword(this.ChangePasswordForm.value["newPassword"]),
    confirm_password:this.service.encodePassword(this.ChangePasswordForm.value["confirmPassword"])
  }

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };

  this.service.ChangeAdminPassword(data,httpOptions).subscribe((Response:any)=>{

    if(Response.success){
      this.ModalService.dismissAll()
      this.server.notification(Response.message)
    }
    else{

    }
    
  })
}


OpenUpdateProfileModal(modal:any){


  this.userType ==='admin'?this.EditProfileForm.patchValue({
    fullName: this.adminProfileDetails.fullname,
    department: this.adminProfileDetails.department,
    contactNumber: this.adminProfileDetails.contact
  }):this.EditProfileForm.patchValue({
    fullName: this.userProfileDetails.fullname,
    department: this.userProfileDetails.department,
    contactNumber: this.userProfileDetails.contact
  });
  

  this.ModalService.dismissAll()
  this.ModalService.open(modal)
}

OpenViewAdminProfileModal(modal:any){
  this.ModalService.open(modal)
}

OpenViewUserProfileModal(modal:any){
  this.ModalService.open(modal)
}


UpdateAdminProfileSubmit(){
  var data:any = {
    fullname:this.EditProfileForm.value["fullName"],
    department:this.EditProfileForm.value["department"],
    contact:this.EditProfileForm.value["contactNumber"]
  }

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };
this.service.UpdateAdminProfile(data,httpOptions).subscribe((response:any)=>
{
  if(response.success){
    this.ModalService.dismissAll()
    this.service.notification(response.message)
    this.ViewAdminProfileDetails()
  }
  else{
     this.service.notification(response.message)
  }
 
})

}


ViewAdminProfileDetails(){

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };

  this.service.AdminProfileDetails(httpOptions).subscribe((Response:any)=>
  {
    if(Response.success){
      this.adminProfileDetails = Response.message
      // sessionStorage.removeItem("session")
      // this.router.navigate(['/login'])   Response.message.includes('Invalid authorization token')||


      // if(this.isLogout.includes('Logged out successfully')){
      //   console.log('this is from the side bar inside the if condition')

      //   sessionStorage.removeItem("session")
      //   // this.reloadPage()
      //   localStorage.removeItem('jwtoken')

      //   this.router.navigate(['/login'])
      // }

    }
    else{
      this.service.notification(Response.message)
      // if(Response.message.includes('expired')||Response.message.includes('Invalid authorization token')||Response.message.includes('logged out')){
      //   sessionStorage.removeItem("session")
      //   // this.reloadPage()
      //   //localStorage.removeItem('jwtoken')
      //   this.adminLogout();
      //   this.router.navigate(['/login']) 
      //   // console.log('this is from the if function')
      // }
      // else{
      //   // console.log('this is from the else function ')
      // }
      this.ModalService.dismissAll()
      // this.service.notification(Response.message)
      
    }
  })
}


ViewUserProfileDetails(){

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };

  this.service.UserProfileDetails(httpOptions).subscribe((Response:any)=>
  {
    if(Response.success){
      this.userProfileDetails = Response.message
    }
    else{
      // this.ModalService.dismissAll()
      // this.service.notification(Response.message)
      // if(Response.message.includes('session expired, please login once again')){
      //   sessionStorage.removeItem("session")
      //   this.router.navigate(['/login']) 
      //   console.log('this is from the login ')
      // }
      this.server.notification(Response.message)
      if(Response.message.includes('expired')||Response.message.includes('Invalid authorization token')||Response.message.includes('logged out')){
        //  localStorage.removeItem("jwtoken")
        sessionStorage.removeItem("session")
        // this.reloadPage()
        this.userLogout();
        this.router.navigate(['/login']) 
        // console.log('this is from the if function')
      }
      else{
        // console.log('this is from the else function ')
      }
      this.ModalService.dismissAll()
    }
  })


}

userLogout(){

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };

  sessionStorage.removeItem('session')

  this.service.UserLogout(httpOptions).subscribe((Response:any)=>
  {
    if(Response.success){
      this.ModalService.dismissAll()
      this.service.notification(Response.message)
      // localStorage.removeItem('jwtoken')

    }
    else{
      this.ModalService.dismissAll()
    }
    
  })
  // localStorage.removeItem('jwtoken')
 sessionStorage.removeItem("session")
  this.router.navigate(['/login']) 
}


ChangeUserPasswordSubmit(){
  var data:any = {
    current_password:this.service.encodePassword(this.ChangePasswordForm.value["currentPassword"]),
    new_password:this.service.encodePassword(this.ChangePasswordForm.value["newPassword"]),
    confirm_password:this.service.encodePassword(this.ChangePasswordForm.value["confirmPassword"])
  }

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };

  this.service.ChangeUserPassword(data,httpOptions).subscribe((Response:any)=>{

    if(Response.success){
      this.ModalService.dismissAll()
      this.server.notification(Response.message)
    }
    else{
     this.server.notification(Response.message)
    }
    
  })
}

UpdateUserProfileSubmit(){
  var data:any = {
    fullname:this.EditProfileForm.value["fullName"],
    department:this.EditProfileForm.value["department"],
    contact:this.EditProfileForm.value["contactNumber"]
  }

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };
this.service.UpdateUserProfile(data,httpOptions).subscribe((response:any)=>
{
  if(response.success){
    this.ModalService.dismissAll()
    this.service.notification(response.message)
    this.ViewUserProfileDetails()
  }
  else{

  }
 
})

}

reloadPage(){
  window.location.reload()
 }

// AutoLogout(){
//   sessionStorage.removeItem("session")
//   this.router.navigate(['/login'])
// }

focusNext(nextInput: HTMLInputElement) {
  if (nextInput) {
    nextInput.focus();
  }
}

ngOnDestroy(): void {
  this.ModalService.dismissAll()
  clearInterval(this.autoLogout)
  this.adminProfileDetails = ''
  this.userProfileDetails = ''
  
}

}
