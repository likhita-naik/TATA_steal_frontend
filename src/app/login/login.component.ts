import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ServerService } from "../Services/server.service";
import crypto from "crypto-js";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  userName: string = "";
  password: any;
  isLoading: boolean = false;
  secretKey: string = "docketrun@123";
  fail: boolean = false;
  credentials: any[] = [
    { userName: "admin", password: "admin@123" },
    { userName: "user1", password: "user1@123" },
    { userName: "user2", password: "user2@123" },
  ];
  constructor(private Router: Router, private Server: ServerService) {}

  ngOnInit(): void {}

  OnSubmit(f: NgForm) {
    this.isLoading = true;
    this.userName = f.value.userName;
    this.password = f.value.password;
    var index = this.credentials.findIndex((data: any) => {
      return data.userName == this.userName;
    });

    if (index != -1) {
      if (this.credentials[index].password == this.password) {
        try {
          console.log("logged in");
          var userData = JSON.stringify({
            userName: this.userName,
            password: this.password,
            userType: this.userName == "admin" ? "admin" : "user",
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
            } else {
              this.Router.navigate(["app/jobsheetUpload"]);
            }
          },Err=>{
            this.Router.navigate(["app/jobsheetUpload"]);

          });
          //this.Router.navigate(['app/jobsheetUpload'])
        } catch {
          this.Server.notification("error while logging  in");
        }
      } else {
        this.isLoading = false;
        this.fail = true;
      }
    } else {
      this.isLoading = false;
      this.fail = true;
    }
  }

  ToNextField(id:string){
      document?.getElementById(id).focus(); // get the sibling element
     
    
  }
}
