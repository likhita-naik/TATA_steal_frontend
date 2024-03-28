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
   userType:string
   adminProfileDetails:any
   userProfileDetails:any

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

   jwtoken :string
  
   autoLogout:any


  constructor(
    private router:Router,
    public server:ServerService,
    private ModalService:NgbModal,
    public service:SidebarService) 
    { 
      this.server.isCollapse.subscribe((value:any)=>{
        this.isCollapse=value
      })
        
      let userData: any = sessionStorage.getItem("session");
      var decodedString = crypto.AES.decrypt(userData, this.server.secretKey);
      userData = JSON.parse(decodedString.toString(crypto.enc.Utf8));
      this.userType = userData.userType;


      this.autoLogout =  setInterval(()=>{
      this.userType === 'admin'?this.ViewAdminProfileDetails():this.ViewUserProfileDetails()
    },this.service.autoLogoutInterval)

    
    }


  ngOnInit(): void {

    this.jwtoken = localStorage.getItem('jwtoken')
    this.userType === 'admin'?this.ViewAdminProfileDetails():this.ViewUserProfileDetails()

    this.server.getLoginStatus().subscribe((response:any)=>{
      if(response){
        
        let userData: any = sessionStorage.getItem("session");
        var decodedString = crypto.AES.decrypt(userData, this.server.secretKey);
        userData = JSON.parse(decodedString.toString(crypto.enc.Utf8));
        this.userType = userData.userType;
        
        this.jwtoken = localStorage.getItem('jwtoken')
        this.userType === 'admin'?this.ViewAdminProfileDetails():this.ViewUserProfileDetails()
      }

    })

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

  OpenViewAdminProfileModal(modal:any){
    this.ModalService.open(modal)
  }

  OpenViewUserProfileModal(modal:any){
    this.ModalService.open(modal)
  }

  openAdminLogoutModal(modal:any){
    this.ModalService.open(modal,{centered:true,backdrop:'static'})
  }

  openUserLogoutModal(modal:any){
    this.ModalService.open(modal,{centered:true,backdrop:'static'})
  }


OpenUpdateProfileModal(modal:any){
  this.userType ==='admin'?
  this.EditProfileForm.patchValue({
    fullName: this.adminProfileDetails.fullname,
    department: this.adminProfileDetails.department,
    contactNumber: this.adminProfileDetails.contact
  }):
  this.EditProfileForm.patchValue({
    fullName: this.userProfileDetails.fullname,
    department: this.userProfileDetails.department,
    contactNumber: this.userProfileDetails.contact
  });
  
  this.ModalService.dismissAll()
  this.ModalService.open(modal)
}


OpenChangePassword(modal:any){
  this.ModalService.dismissAll()
  this.ModalService.open(modal)
}

focusNext(nextInput: HTMLInputElement) {
  if (nextInput) {
    nextInput.focus();
  }
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
    }

    else{
      this.service.notification(Response.message)

      if(Response.message.includes('admin details not found')|| 
      Response.message.includes('Invalid authorization token')||
      Response.message.includes('logged out')||
      Response.message.includes('expired'))
      {
        this.adminLogout()
      }
      else{

      }

      this.ModalService.dismissAll()

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
      this.server.notification(Response.message)

      if(Response.message.includes('expired')||
      Response.message.includes('Invalid authorization token')||
      Response.message.includes('logged out')||
      Response.message.includes('admin details not found'))
      {
        this.userLogout()
      }
      
      else{

      }

      this.ModalService.dismissAll()

    }
  })

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
      localStorage.removeItem('jwtoken')
      sessionStorage.removeItem('session')
      this.router.navigate(['/login']) 

    }
    else{
      this.ModalService.dismissAll()
      localStorage.removeItem('jwtoken')
      sessionStorage.removeItem('session')
      this.router.navigate(['/login'])
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

  this.service.UserLogout(httpOptions).subscribe((Response:any)=>
  {
    if(Response.success){
      this.ModalService.dismissAll()
      this.service.notification(Response.message)
      localStorage.removeItem('jwtoken')
      sessionStorage.removeItem("session")
      this.router.navigate(['/login']) 

    }
    else{
      this.ModalService.dismissAll()
      localStorage.removeItem('jwtoken')
      sessionStorage.removeItem("session")
      this.router.navigate(['/login']) 
    }
    
  })

}


ngOnDestroy(): void {
  this.ModalService.dismissAll()
  clearInterval(this.autoLogout)
  this.adminProfileDetails = ''
  this.userProfileDetails = ''
  this.jwtoken = ''
}

}
