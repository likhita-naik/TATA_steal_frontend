import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServerService } from "../Services/server.service";
 import crypto from "crypto-js";
// import * as CryptoJS from 'crypto-js';
import * as CryptoJS from 'crypto-js';
// import * as FingerprintJS from 'fingerprintjs2';
import { LoginService } from './login.service'
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { HttpHeaders } from "@angular/common/http";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit{
  userType:string
  userIsAdmin:boolean = false
  userIsUser:boolean = false
  secretKey: string = "docketrun@123"; 
  userName: string = "";
  Password: any;
  Token:any
  
  fail: boolean = false;
  // isLoading: boolean = false;
  adminLoginLoading:boolean = false
  userLoginLoading:boolean = false
  adminLogoutLoginLoading:boolean = false
  userLogoutLoginLoading:boolean = false

  OTP:any
  captcha: string;
  OTPVerified :boolean = false
  gotOTP:boolean = false
  uniqueId: string;

  Website :string=''
  jwtoken: string;
  emailId:string;

  loginNotification:string
  adminAlreadyLoggedIn:boolean =false
  userAlreadyLoggedIn:boolean = false

 userLoggedType:string =''
 adminAccountCreated:string=''
 selectedTabIndex: number 
 firstTabSelected: boolean = false;
 wantToLogin:boolean = false
  

  AdminLoginForm: FormGroup = new FormGroup({
    emailid: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    token:new FormControl("",Validators.required),
  })

  ChangePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl("", Validators.required),
    newPassword: new FormControl("", Validators.required),
    confirmPassword:new FormControl("",Validators.required),
  })

  ForgottenPasswordForm: FormGroup = new FormGroup({
    emailid: new FormControl("", Validators.required),
    userInput:new FormControl("",Validators.required),
     forgottenNewPassword: new FormControl("", Validators.required),
     forgottenConfirmPassword:new FormControl("",Validators.required),
  })

  UserLoginForm: FormGroup = new FormGroup({
    emailid: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    token:new FormControl("",Validators.required),
  })


  @ViewChild('emailid')emailid: ElementRef;
  @ViewChild('password')password: ElementRef;
  @ViewChild('token')token: ElementRef;
  @ViewChild('forgottenNewPassword')forgottenNewPassword: ElementRef;
  @ViewChild('forgottenConfirmPassword')forgottenConfirmPassword: ElementRef;

  constructor(
    private Router: Router, 
    private Server: ServerService,
    private service:LoginService,
    public modalService: NgbModal,
    ) {
      this.uniqueId = uuidv4();
      this.captcha = this.generateRandomString(10);
      

      this.adminAccountCreated = localStorage.getItem('admin')
      // console.log(this.adminAccountCreated,'this is from the login page ')
      if(this.adminAccountCreated ==='admin Account is created successfully')
      {
        this.firstTabSelected = true
        // console.log(this.firstTabSelected,'this is form the login page and first tab selected')

      }
      else{
        this.selectedTabIndex = 1
        this.firstTabSelected = false
      }

      

  }
  // ngOnDestroy(): void {
  //   throw new Error("Method not implemented.");
  // }

  CreateAccount(){
    this.Router.navigate(['/create-account'])
    //  this.firstTabSelected = true
  }


  ngOnInit(): void {

    const userAgent = navigator.userAgent;
   
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      this.Website='Chrome'
    } 
    else if (userAgent.includes('Firefox')) {
      this.Website = 'Firefox'
    } 
    else if (userAgent.includes('Edg')) {
      this.Website = 'Edge'
    }
     else if (userAgent.includes('Safari')) {
      this.Website = 'Safari'
    } 
    else {
      this.Website = 'Other browser'
    }

  }

  
  AdminLoginSubmit() {

    this.adminLoginLoading = true;

    var data:any = {
      email:this.AdminLoginForm.value["emailid"],
      password:this.service.encodePassword(this.AdminLoginForm.value["password"]),     
      token:this.AdminLoginForm.value["token"]
    }
   
    this.service.AdminLogin(data).subscribe((Response:any)=>
    {
      this.userLoggedType='admin'
      
    
      if(Response.success){
      const jwtoken = Response.jwtoken; 
      localStorage.setItem('jwtoken', jwtoken);
       this.jwtoken = localStorage.getItem('jwtoken')

        this.userIsAdmin = true

        var userData = JSON.stringify({
          emailid: this.emailId,
          password: this.Password,
          userType: this.userIsAdmin?"admin":"user"
        });

        var encodedUserData = crypto.AES.encrypt(
          userData,
          this.Server.secretKey
        );

      sessionStorage.setItem("session", encodedUserData.toString());


     


        this.Server.GetJobSheet().subscribe((response: any) => {
                  this.adminLoginLoading = false;

                  if (response.job_sheet_status) {
                    this.Router.navigate(["app/jobsheetMoniter"]);
                  }
                   else {
                    this.Router.navigate(["app/jobsheetUpload"]);
                  }
                },Err=>{
                  this.Router.navigate(["app/jobsheetUpload"]);
                });

                this.SendAdminLoginDetails()
      }

      else{
        const jwtoken = Response.jwtoken; 
        localStorage.setItem('jwtoken', jwtoken);
        this.jwtoken = localStorage.getItem('jwtoken')
        this.adminLoginLoading=false
        this.loginNotification = Response.message
        // console.log(this.loginNotification,'this is loginNotification varibale from the admin login function')
        this.service.notification(Response.message)

        if(this.loginNotification.includes('already logged in')){
          this.adminAlreadyLoggedIn= true
            this.myFunction()

        }
        else{
          this.adminAlreadyLoggedIn = false
        }
      }

    })

    let userDetails: any = sessionStorage.getItem("session");
    var decodedString = crypto.AES.decrypt(userDetails, this.Server.secretKey);
    userDetails = JSON.parse(decodedString.toString(crypto.enc.Utf8));
    this.userType = userDetails.userType;

    this.emailId = this.AdminLoginForm.value["emailid"],
    this.Password = this.service.encodePassword(this.AdminLoginForm.value["password"]),
    this.Token = this.AdminLoginForm.value["token"]

    // console.log(this.password)

  }

  ToNextField(id:string){
      document?.getElementById(id).focus(); // get the sibling element
  }


  ToUserNextField(name:string){
    const nextInput = document.getElementById(name);
    if (nextInput) {
      nextInput.focus();
    }
}


  ChangePassword(modal:any){
    this.modalService.open(modal)
  }

  ForgotPassword(modal:any){
    this.modalService.open(modal)
  }

  ChangePasswordSubmit(){
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
    this.service.ChangePassword(data,httpOptions).subscribe((Response:any)=>{
      this.Server.notification(Response.message)
    })
  }

  SendOTP(){
    var data:any = {
      email:this.ForgottenPasswordForm.value["emailid"]
    }

    this.service.SendOTP(data).subscribe((Response:any)=>{
      this.Server.notification(Response.message)
      this.OTP = Response.otp
      if(Response.success){
        this.gotOTP = true
      }
      else{
        this.gotOTP = false
      }
    })
  }


 generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


verify() {
if (this.ForgottenPasswordForm.value['userInput'] == this.OTP+this.captcha){
  this.Server.notification('You have entered the correct OTP you can procced')
  this.OTPVerified = true
}
else{
  this.Server.notification(" Please Check Once You have entered Wrong OTP ")
  this.OTPVerified = false
}
 }

 ForgottenPasswordSubmit(){

  var data :any ={
    otp:this.ForgottenPasswordForm.value["userInput"],
    password:this.service.encodePassword(this.ForgottenPasswordForm.value["forgottenNewPassword"]),
    confirm_password:this.service.encodePassword(this.ForgottenPasswordForm.value["forgottenConfirmPassword"]),
    email:this.ForgottenPasswordForm.value["emailid"]

  }
    this.service.ForgottenPassword(data).subscribe((Response:any)=>{

      if(Response.success){
        this.Server.notification(Response.message)
        this.modalService.dismissAll()
        this.ForgottenPasswordForm.reset()
        this.OTPVerified = false
        this.gotOTP = false
      }
      else{
        this.Server.notification(Response.message)
      }
      
})
 }
 

 SendAdminLoginDetails(){
  var data :any = {
    browser:this.Website,
    systemid:this.uniqueId
  }

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };
  this.service.SendAdminLogDetails(data,httpOptions).subscribe((response:any)=>
  {
    if(response.success){
      this.Server.notification(response.message)
    }
    else{
      this.Server.notification(response.message)
    }
    
  })

 }



 UserLoginSubmit() {
  this.userLoginLoading = true;
  var data:any = {
    email:this.UserLoginForm.value["emailid"],
    password:this.service.encodePassword(this.UserLoginForm.value["password"]),
    token:this.UserLoginForm.value["token"]
  }

  this.service.UserLogin(data).subscribe((Response:any)=>
  {
    this.userLoggedType = 'user'
    
    if(Response.success){
      const jwtoken = Response.jwtoken; 
      localStorage.setItem('jwtoken', jwtoken);
      this.jwtoken = localStorage.getItem('jwtoken')
   
      this.userIsUser = true

  var userData = JSON.stringify({
    emailid: this.emailId,
    password: this.Password,
    userType: this.userIsUser?"user":"admin"
  });

  // console.log(this.userIsUser)
  var encodedUserData = crypto.AES.encrypt(
    userData,
    this.Server.secretKey
  );
  sessionStorage.setItem("session", encodedUserData.toString());


     
      this.Server.GetJobSheet().subscribe((response: any) => {


                this.userLoginLoading = false;
                if (response.job_sheet_status) {
                  this.Router.navigate(["app/jobsheetMoniter"]);
                } else {
                  this.Router.navigate(["app/jobsheetUpload"]);
                }
              },Err=>{
                this.Router.navigate(["app/jobsheetUpload"]);
    
              }); 
              
              this.SendUserLoginDetails();
    }
    else{

      const jwtoken = Response.jwtoken; 
      localStorage.setItem('jwtoken', jwtoken);
      this.jwtoken = localStorage.getItem('jwtoken')

      this.userLoginLoading=false
        this.loginNotification = Response.message
        // console.log(this.loginNotification,'this is loginNotification varibale from the admin login function')
        this.service.notification(Response.message)

        if(this.loginNotification.includes('already logged in')){
          this.userAlreadyLoggedIn= true
        }
        else{
          this.userAlreadyLoggedIn = false
        }
      
      this.service.notification(Response.message)
    }
  })

  let userDetails: any = sessionStorage.getItem("session");
      var decodedString = crypto.AES.decrypt(userDetails, this.Server.secretKey);
      userDetails = JSON.parse(decodedString.toString(crypto.enc.Utf8));
      this.userType = userDetails.userType;

      this.emailId = this.UserLoginForm.value["emailid"],
      this.Password = this.service.encodePassword(this.UserLoginForm.value["password"]),
      this.Token = this.UserLoginForm.value["token"]
  

}


SendUserLoginDetails(){
  var data :any = {
    browser:this.Website,
    systemid:this.uniqueId
  }

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };
  this.service.SendUserLogDetails(data,httpOptions).subscribe((response:any)=>
  {
    if(response.success){
      this.Server.notification(response.message)
    }
    
  })

 }


 userLogout(){

  this.userLogoutLoginLoading = true
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };

   

  this.service.UserLogout(httpOptions).subscribe((Response:any)=>
  {
    if(Response.success){
      this.modalService.dismissAll()

      this.service.notification(Response.message)
      // sessionStorage.removeItem('session')
      this.service.notification(Response.message)
      localStorage.setItem('logout',Response.message)
      this.userLogoutLoginLoading = false
      this.UserLoginSubmit()
    }
    else{

      this.modalService.dismissAll()
      this.UserLoginSubmit()
    }
    
  })
  //  localStorage.removeItem('jwtoken')
   this.Router.navigate(['/login']) 
}

adminLogout(){
   this.adminLogoutLoginLoading= true
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };

   

  this.service.AdminLogout(httpOptions).subscribe((Response:any)=>
  {
    if(Response.success){
      
      this.modalService.dismissAll()
      this.service.notification(Response.message)
      // sessionStorage.removeItem('session')
      localStorage.setItem('logout',Response.message)
      // console.log(localStorage.getItem('logout'),'this is localstorage of the logout from the login page')
      this.adminLogoutLoginLoading = false
      this.AdminLoginSubmit()
    }
    else{
      this.modalService.dismissAll()
      this.AdminLoginSubmit()
    }
    
  })
  //  localStorage.removeItem('jwtoken')
   this.Router.navigate(['/login']) 
}
 
 ngOnDestroy():void{
  this.modalService.dismissAll()
  // this.reloadPage()
   this.firstTabSelected = false
   localStorage.removeItem('admin')
   this.adminAccountCreated = ''
  //  this.jwtoken = ''

 }

 reloadPage(){
  window.location.reload()
 }

  onTabChange(event: any) {
    // Reset the appropriate form group when switching away from the tab
    if (event.index === 0) {
      this.UserLoginForm.reset();
  } else if (event.index === 1) {
      this.AdminLoginForm.reset();
  }
}

focusNext(nextInput: HTMLInputElement) {
  if (nextInput) {
    nextInput.focus();
  }
}


 myFunction() {
  let text = confirm("Do you want to logout in other device OR Browser and login here") == true 
  if (text) {
    // text = "You pressed OK!";
    this.userLoggedType==='admin'?this.adminLogout():this.userLogout()
    this.wantToLogin = true

  } else {
    // text = "You canceled!";
    this.wantToLogin = false
  }
  // document.getElementById("demo").innerHTML = text;
}





}



  

