import { Component,OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServerService } from "../Services/server.service";
import crypto from "crypto-js";
import { LoginService } from './login.service'
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpHeaders } from "@angular/common/http";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})

export class LoginComponent implements OnInit{

  selectedTabIndex: number 
  firstTabSelected: boolean = false;

  AdminLoginForm: FormGroup = new FormGroup({
    emailid: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    token:new FormControl("",Validators.required),
  })

  adminAlreadyLoggedIn:boolean =false
  adminLoginLoading:boolean = false
  userLoggedType:string =''
  adminLogoutLoginLoading:boolean = false


  UserLoginForm: FormGroup = new FormGroup({
    emailid: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    token:new FormControl("",Validators.required),
  })

  userAlreadyLoggedIn:boolean = false
  userLoginLoading:boolean = false
  userLogoutLoginLoading:boolean = false

  ForgottenPasswordForm: FormGroup = new FormGroup({
    emailid: new FormControl("", Validators.required),
    userInput:new FormControl("",Validators.required),
    forgottenNewPassword: new FormControl("", Validators.required),
    forgottenConfirmPassword:new FormControl("",Validators.required),
  })

  gotOTP:boolean = false
  isOTPVerified :boolean = false
  OTP:any
  captcha: string;

  userType:string = ''

  userIsAdmin:boolean = false
  userIsUser:boolean = false
  secretKey: string = "docketrun@123"; 
  
  password: any;
  token:any
  
  uniqueId: string;
  currentWebsite:string=''

  jwtoken: string;
  emailId:string;
 
 adminAccountCreated:string=''

  // @ViewChild('emailid')emailid: ElementRef;
  // @ViewChild('password')password: ElementRef;
  // @ViewChild('token')token: ElementRef;
  // @ViewChild('forgottenNewPassword')forgottenNewPassword: ElementRef;
  // @ViewChild('forgottenConfirmPassword')forgottenConfirmPassword: ElementRef;


  constructor(
    private Router: Router, 
    private Server: ServerService,
    private service:LoginService,
    public modalService: NgbModal,
    ) {

      this.captcha = this.GenerateRandomString(10);
      
      this.adminAccountCreated = localStorage.getItem('admin')
      if(this.adminAccountCreated ==='admin Account is created successfully')
      {
        this.firstTabSelected = true
      }
      else{
        this.selectedTabIndex = 1
        this.firstTabSelected = false
      }
  }
  

  ngOnInit(): void {
    const userAgent = navigator.userAgent;
   
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) 
    {
      this.currentWebsite='Chrome'
    } 

    else if (userAgent.includes('Firefox')) 
    {
      this.currentWebsite = 'Firefox'
    } 

    else if (userAgent.includes('Edg')) 
    {
      this.currentWebsite = 'Edge'
    }

     else if (userAgent.includes('Safari')) 
    {
      this.currentWebsite = 'Safari'
    } 

    else {
      this.currentWebsite = 'Other browser'
    }

    const osInfo = userAgent.match(/\((.*?)\)/)[1];
    this.uniqueId = osInfo
  }

  GenerateRandomString(length: number): string {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  
  }


  OnTabChange(event: any) {
    if (event.index === 0) {
      this.UserLoginForm.reset();
      this.userLoginLoading = false 
  } else if (event.index === 1) {
      this.AdminLoginForm.reset();
      this.adminLoginLoading = false
  }
}


CreateAccount(){
  this.Router.navigate(['/create-account'])
  this.firstTabSelected = true
}
  

ToNextField(id:string){
  document?.getElementById(id).focus(); 
}


OpenForgotPasswordModal(modal:any){
  this.modalService.open(modal)
}


AdminLoginSubmit(){

  this.adminLoginLoading = true
  this.adminAlreadyLoggedIn = false

    var data:any = {
      email:this.AdminLoginForm.value["emailid"],
      password:this.service.EncodePassword(this.AdminLoginForm.value["password"]),     
      token:this.AdminLoginForm.value["token"]
    }
   
    this.service.AdminLogin(data).subscribe((Response:any)=>
    {
      this.userLoggedType='admin'
      
      if(Response.success)
      {
        const jwtoken = Response.jwtoken;
        localStorage.setItem('jwtoken', jwtoken);
        this.jwtoken = localStorage.getItem('jwtoken')

        this.userIsAdmin = true

        var userData = JSON.stringify({
          emailid: this.emailId,
          password: this.password,
          userType: this.userIsAdmin?"admin":"user"
        });

        var encodedUserData = crypto.AES.encrypt(
          userData,
          this.Server.secretKey
        );

      sessionStorage.setItem("session", encodedUserData.toString())

      this.Server.setLoginStatus(true)

      this.Server.GetJobSheet().subscribe((response: any) => 
      {
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
        this.adminLoginLoading=false
        // this.Server.notification(Response.message)

        const jwtoken = Response.jwtoken; 
        localStorage.setItem('jwtoken', jwtoken);
        this.jwtoken = localStorage.getItem('jwtoken') 

        if(Response.message.includes('already logged in')){
          this.adminAlreadyLoggedIn= true
          this.LogoutLoginMessage()
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
    this.password = this.service.EncodePassword(this.AdminLoginForm.value["password"]),
    this.token = this.AdminLoginForm.value["token"]

  }

  
  SendAdminLoginDetails(){

    var data :any = {
      browser:this.currentWebsite,
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
        this.Server.notification(Response.message)
        this.modalService.dismissAll()
        
        localStorage.removeItem('jwtoken')
        sessionStorage.removeItem('session')
        this.jwtoken = ''
        setTimeout(() => {
        this.AdminLoginSubmit()},10000)
      }
      else{
        this.Server.notification(Response.message)
        this.modalService.dismissAll()
        if(Response.message.includes('expired')){
          localStorage.removeItem('jwtoken')
          this.jwtoken = ''
          setTimeout(() => {
            this.AdminLoginSubmit()
          },10000);
          
        }
      
      }
  
    })
    
  }



  FocusNext(nextInput: HTMLInputElement) {
    if (nextInput) {
      nextInput.focus();
    }
  }


  UserLoginSubmit() {

    this.userLoginLoading = true
    this.userAlreadyLoggedIn = false
  
    var data:any = {
      email:this.UserLoginForm.value["emailid"],
      password:this.service.EncodePassword(this.UserLoginForm.value["password"]),
      token:this.UserLoginForm.value["token"]
    }
  
    this.service.UserLogin(data).subscribe((Response:any)=>
    {
      this.userLoggedType = 'user'
      
      if(Response.success)
      {
        const jwtoken = Response.jwtoken; 
        localStorage.setItem('jwtoken', jwtoken);
        this.jwtoken = localStorage.getItem('jwtoken')
     
        this.userIsUser = true
  
    var userData = JSON.stringify({
      emailid: this.emailId,
      password: this.password,
      userType: this.userIsUser?"user":"admin"
    });
  
    
    var encodedUserData = crypto.AES.encrypt(
      userData,
      this.Server.secretKey
    );
    sessionStorage.setItem("session", encodedUserData.toString());
  
    this.Server.setLoginStatus(true)
  
       
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
        this.userLoginLoading=false
        // this.Server.notification(Response.message)
  
        const jwtoken = Response.jwtoken; 
        localStorage.setItem('jwtoken', jwtoken);
        this.jwtoken = localStorage.getItem('jwtoken')
    
          if(Response.message.includes('already logged in')){
            this.userAlreadyLoggedIn= true
            this.LogoutLoginMessage()
          }
          else{
            this.userAlreadyLoggedIn = false
          }
        
      }
    })
  
    let userDetails: any = sessionStorage.getItem("session");
        var decodedString = crypto.AES.decrypt(userDetails, this.Server.secretKey);
        userDetails = JSON.parse(decodedString.toString(crypto.enc.Utf8));
        this.userType = userDetails.userType;
  
        this.emailId = this.UserLoginForm.value["emailid"],
        this.password = this.service.EncodePassword(this.UserLoginForm.value["password"]),
        this.token = this.UserLoginForm.value["token"]
    
  
  }


  SendUserLoginDetails(){

    var data :any = {
      browser:this.currentWebsite,
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
      else{
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
        this.Server.notification(Response.message)
        this.modalService.dismissAll()
  
         localStorage.removeItem('jwtoken')
         sessionStorage.removeItem('session')
        this.jwtoken = ''
        setTimeout(() => {
        this.UserLoginSubmit()},10000)
      }
      else{
        this.Server.notification(Response.message)
        this.modalService.dismissAll()
        if(Response.message.includes('expired')){
          localStorage.removeItem('jwtoken')
          this.jwtoken = ''
          setTimeout(() => {
          this.UserLoginSubmit()},10000)
        }
        
      }
      
    })
    
  }
  

  GetOTP(){

    var data:any = {
      email:this.ForgottenPasswordForm.value["emailid"]
    }

    this.service.GetOTP(data).subscribe((Response:any)=>{
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

  VerifyCaptcha() {
    if (this.ForgottenPasswordForm.value['userInput'] == this.OTP+this.captcha){
      this.Server.notification('You have entered the correct OTP you can procced')
      this.isOTPVerified = true
    }
    else{
      this.Server.notification(" Please Check Once You have entered Wrong OTP ")
      this.isOTPVerified = false
    }
     }

     ForgottenPasswordSubmit(){

      var data :any ={
        otp:this.ForgottenPasswordForm.value["userInput"],
        password:this.service.EncodePassword(this.ForgottenPasswordForm.value["forgottenNewPassword"]),
        confirm_password:this.service.EncodePassword(this.ForgottenPasswordForm.value["forgottenConfirmPassword"]),
        email:this.ForgottenPasswordForm.value["emailid"]
    
      }
        this.service.ForgottenPassword(data).subscribe((Response:any)=>{
    
          if(Response.success){
            this.Server.notification(Response.message)
            this.modalService.dismissAll()
            this.ForgottenPasswordForm.reset()
            this.isOTPVerified = false
            this.gotOTP = false
          }
          else{
            this.Server.notification(Response.message)
          }
          
    })
    }
  

 LogoutLoginMessage() {
  let message = confirm("Do you want to logout in other device OR Browser and login here") == true 
  if (message) {
    this.userLoggedType ==='admin'?this.adminLogout():this.userLogout()
  
  } else {
    
  }
  
}


ngOnDestroy():void{
  this.modalService.dismissAll()
   this.firstTabSelected = false
   localStorage.removeItem('admin')
   this.adminAccountCreated = ''
 }


}



  

