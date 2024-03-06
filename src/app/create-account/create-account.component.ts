import { Component } from '@angular/core';
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

export class CreateAccountComponent {

   isLoading: boolean = false;

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
  
  
  OnSubmit() {

    var data:any = {
      fullname:this.CreateAccountForm.value["fullName"],
      department:this.CreateAccountForm.value["department"],
      email:this.CreateAccountForm.value["emailid"],
      password:crypto.AES.encrypt(this.CreateAccountForm.value["password"],this.Server.secretKey).toString(), 
      contact:this.CreateAccountForm.value["contactNumber"],
      token:this.CreateAccountForm.value["token"]
    }

    this.service.CreateAccount(data).subscribe((Response:any)=>{
      
        if(Response.success){
          this.Server.notification(Response.message)
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

      }
      else{
        this.Server.notification(Response.message)
      }

    })

   


  }

  ToNextField(id:string){
      document?.getElementById(id).focus(); // get the sibling element
  }
 

}
