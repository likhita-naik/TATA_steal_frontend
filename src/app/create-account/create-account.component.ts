import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ServerService } from '../Services/server.service';
import { CreateAccountService } from './create-account.service';
import { Router } from "@angular/router";
import crypto from "crypto-js";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit{

   isLoading: boolean = false;
   adminAccountCreated:string =''

  CreateAccountForm: FormGroup = new FormGroup({
    fullName: new FormControl("", Validators.required),
    contactNumber: new FormControl("", Validators.required),
    emailid: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    token:new FormControl("",Validators.required),
    department:new FormControl("",Validators.required)
  })

  constructor(
    private Router: Router, 
    private Server: ServerService,
    private service:CreateAccountService) 
    {

     }


  ngOnInit(): void {

  }
 
  CreateAccountSubmit() {
    this.isLoading = true

    var data:any = {
      fullname:this.CreateAccountForm.value["fullName"],
      department:this.CreateAccountForm.value["department"],
      email:this.CreateAccountForm.value["emailid"], 
      password:this.service.encodePassword(this.CreateAccountForm.value["password"]), 
      contact:this.CreateAccountForm.value["contactNumber"],
      token:this.CreateAccountForm.value["token"]
    }

    this.service.CreateAccount(data).subscribe((Response:any)=>{
      
        if(Response.success){
          this.isLoading = false
          this.Server.notification(Response.message)

            this.adminAccountCreated = 'admin Account is created successfully'
            localStorage.setItem('admin', this.adminAccountCreated);
            // console.log(this.adminAccountCreated,'this is from the create account page')
            this.Router.navigate(['/login'])

        }
        else{
          this.Server.notification(Response.message)
        }

    })
  }


  ToNextField(id:string){
      document?.getElementById(id).focus(); // get the sibling element
  }
 
  
  ngOnDestory(){
    
  }
}
