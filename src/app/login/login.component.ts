import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServerService } from "../Services/server.service";
import crypto from "crypto-js";
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
export class LoginComponent implements OnInit {
  userType:string
  userIsAdmin:boolean = false
  userIsUser:boolean = false
  secretKey: string = "docketrun@123"; 
  userName: string = "";
  password: any;
  token:any
  
  fail: boolean = false;
  isLoading: boolean = false;

  OTP:any
  captcha: string;
  OTPVerified :boolean = false
  gotOTP:boolean = false
  uniqueId: string;

  Website :string=''
  jwtoken: string;
  emailid:string;

  loginNotification:string
  alreadyLoggedIn:boolean =false

 userLoggedType:string =''
  

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


  constructor(
    private Router: Router, 
    private Server: ServerService,
    private service:LoginService,
    public modalService: NgbModal,
    ) {
      this.uniqueId = uuidv4();
      this.captcha = this.generateRandomString(6);
      this.jwtoken = localStorage.getItem('jwtoken')
  }

  CreateAccount(){
    this.Router.navigate(['/create-account'])
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

    this.isLoading = true;
     
    var data:any = {
      email:this.AdminLoginForm.value["emailid"],
      password:this.AdminLoginForm.value["password"],
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
          emailid: this.emailid,
          password: this.password,
          userType: this.userIsAdmin?"admin":"user"
        });

        var encodedUserData = crypto.AES.encrypt(
          userData,
          this.Server.secretKey
        );

      sessionStorage.setItem("session", encodedUserData.toString());


     


        this.Server.GetJobSheet().subscribe((response: any) => {
                  this.isLoading = false;

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
        this.isLoading=false
        this.loginNotification = Response.message
        console.log(this.loginNotification,'this is loginNotification varibale from the admin login function')
        this.service.notification(Response.message)

        if(this.loginNotification.includes('already logged in,')){
          this.alreadyLoggedIn= true
        }
        else{
          this.alreadyLoggedIn = false
        }
      }
    })

    let userDetails: any = sessionStorage.getItem("session");
    var decodedString = crypto.AES.decrypt(userDetails, this.Server.secretKey);
    userDetails = JSON.parse(decodedString.toString(crypto.enc.Utf8));
    this.userType = userDetails.userType;

    this.emailid = this.AdminLoginForm.value["emailid"],
    this.password = this.AdminLoginForm.value["password"],
    this.token = this.AdminLoginForm.value["token"]

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
      current_password:this.ChangePasswordForm.value["currentPassword"],
      new_password:this.ChangePasswordForm.value["newPassword"],
      confirm_password:this.ChangePasswordForm.value["confirmPassword"]
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
  this.Server.notification(" Please Check the OTP You have entered Wrong OTP ")
  this.OTPVerified = false
}
 }

 ForgottenPasswordSubmit(){

  var data :any ={
    otp:this.ForgottenPasswordForm.value["userInput"],
    password:this.ForgottenPasswordForm.value["forgottenNewPassword"],
    confirm_password:this.ForgottenPasswordForm.value["forgottenConfirmPassword"],
    email:this.ForgottenPasswordForm.value["emailid"]

  }
    this.service.ForgottenPassword(data).subscribe((Response:any)=>{

      if(Response.success){
        this.Server.notification(Response.message)
        this.modalService.dismissAll()
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
    
  })

 }



 UserLoginSubmit() {
  this.isLoading = true;
  var data:any = {
    email:this.UserLoginForm.value["emailid"],
    password:this.UserLoginForm.value["password"],
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
    emailid: this.emailid,
    password: this.password,
    userType: this.userIsUser?"user":"admin"
  });

  console.log(this.userIsUser)
  var encodedUserData = crypto.AES.encrypt(
    userData,
    this.Server.secretKey
  );
  sessionStorage.setItem("session", encodedUserData.toString());


     
      this.Server.GetJobSheet().subscribe((response: any) => {


                this.isLoading = false;
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

      this.isLoading=false
        this.loginNotification = Response.message
        console.log(this.loginNotification,'this is loginNotification varibale from the admin login function')
        this.service.notification(Response.message)

        if(this.loginNotification.includes('already logged in,')){
          this.alreadyLoggedIn= true
        }
        else{
          this.alreadyLoggedIn = false
        }
      
      this.service.notification(Response.message)
    }
  })

  let userDetails: any = sessionStorage.getItem("session");
      var decodedString = crypto.AES.decrypt(userDetails, this.Server.secretKey);
      userDetails = JSON.parse(decodedString.toString(crypto.enc.Utf8));
      this.userType = userDetails.userType;

      this.emailid = this.UserLoginForm.value["emailid"],
      this.password = this.UserLoginForm.value["password"],
      this.token = this.UserLoginForm.value["token"]
  

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

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };

  // sessionStorage.removeItem('session')

  this.service.UserLogout(httpOptions).subscribe((Response:any)=>
  {
    if(Response.success){
      this.modalService.dismissAll()
      this.service.notification(Response.message)
      this.UserLoginSubmit()
    }
    else{
      this.modalService.dismissAll()
    }
    
  })

  // this.router.navigate(['/login']) 
}

adminLogout(){

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.jwtoken
    })
  };

  // sessionStorage.removeItem('session')

  this.service.AdminLogout(httpOptions).subscribe((Response:any)=>
  {
    if(Response.success){
      
      this.modalService.dismissAll()
      this.service.notification(Response.message)
      this.AdminLoginSubmit()
    }
    else{
      this.modalService.dismissAll()
    }
    
  })

  // this.router.navigate(['/login']) 
}
 
 ngOnDestory(){
  this.modalService.dismissAll()
  this.reloadPage()

 }

 reloadPage(){
  window.location.reload()
 }


}



  

