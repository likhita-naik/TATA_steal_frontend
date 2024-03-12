import { Component , OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lightbox } from 'ngx-lightbox';
import { UserManagementService } from './user-management.service';
import { HttpHeaders } from '@angular/common/http';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  existingUserDetails:any[] = []
  jwtoken: string;
  dataFetchStatus:string='init'
  deleteUserEmailId:string
  
  
  AddUserForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    contactnumber: new FormControl("", Validators.required),
    emailid: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    token:new FormControl("",Validators.required),
    department:new FormControl("",Validators.required)
  })
  

  constructor(
    public modalService: NgbModal,
    public router: Router,
    public server:UserManagementService,
  )
  {
    this.jwtoken = localStorage.getItem('jwtoken')
  }

  ngOnInit(){

    this.ExistingUserDetails();

    const userAgent = navigator.userAgent;
    console.log('User-Agent:', userAgent);

    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      console.log('Running in Chrome');
    } else if (userAgent.includes('Firefox')) {
      console.log('Running in Firefox');
    } else if (userAgent.includes('Edg')) {
      console.log('Running in Edge');
    } else if (userAgent.includes('Safari')) {
      console.log('Running in Safari');
    } else {
      console.log('Running in another browser');
    }

  }


  AddUser(modal:any){
    this.modalService.open(modal)
  }

  AddUserSubmit(){
    var data:any ={
      fullname:this.AddUserForm.value["username"],
      contact:this.AddUserForm.value["contactnumber"],
      email:this.AddUserForm.value["emailid"],
      password:this.server.encodePassword(this.AddUserForm.value['password']),
      token:this.AddUserForm.value["token"],
      department:this.AddUserForm.value["department"]
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.jwtoken
      })
    };

    this.server.AddUser(data,httpOptions).subscribe((response:any)=>
    {
      if(response.success){
        this.server.notification(response.message)
        this.modalService.dismissAll()
        this.ExistingUserDetails()
        // Reset the appropriate form group when switching away from the tab
        this.AddUserForm.reset();
      }
      else{
        this.server.notification(response.message)
      }
  
    })
  }
    
  
    ExistingUserDetails(){

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ this.jwtoken
        })
      };

      this.server.ExistingUserDetails(httpOptions).subscribe((response:any)=>{
        if(response.success){
          this.existingUserDetails = response.message
        }
        else{
          this.dataFetchStatus="success"
          this.existingUserDetails = []
        }
        
      })
    }

  EditUser(modal:any,){
    this.modalService.open(modal,{size:'M'})
  }


  DeleteUserOpenModal(modal:any,data:any){
    this.modalService.open(modal)
    this.deleteUserEmailId = data.email
  }

  DeleteUser(){
    var data:any = {
      email:this.deleteUserEmailId
    }
    console.log(data,'data of the email')
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.jwtoken
      })
    };

    this.server.DeleteUser(data,httpOptions).subscribe((Response:any)=>
    {
      if(Response.success){
        this.server.notification(Response.message)
        this.modalService.dismissAll()
        this.ExistingUserDetails()
      }
    })

  }

}
