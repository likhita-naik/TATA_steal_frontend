import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  IP:string

  constructor(
    public http:HttpClient,
    public snackbar:MatSnackBar,
    public datePipe:DatePipe
  ) {
    var res=this.loadConfigFile('assets/config.json')
    res=JSON.parse(res)
    this.IP=res.IP
    
   }

   loadConfigFile(filepath:any){
    const JSON=this.readConfigFile(filepath,'application/json')
    return JSON
  }

  readConfigFile(filepath:any,mimeType:any){
   var xmlRequest=new XMLHttpRequest() 
   xmlRequest.open('GET',filepath,false)
   if (mimeType != null) {
    if (xmlRequest.overrideMimeType) {
        xmlRequest.overrideMimeType(mimeType);
    }
    xmlRequest.send()
    if(xmlRequest.status){
        return xmlRequest.response
    }
    else{
        return null
    }
  }
  
  }

  dateTransform(date:Date){
    return this.datePipe.transform(date,'yyyy-MM-dd HH:mm:ss')
  }
   
  dateTransformbyPattern(date:Date,pattern:string){
    return this.datePipe.transform(date,pattern)
  }


  EncodePassword(password: string): string {
    let encodedPassword = '';
    for (let i = 0; i < password.length; i++) {
      encodedPassword += password.charCodeAt(i);
      if (i !== password.length - 1) {
        encodedPassword += ', '; // Add comma and space if it's not the last character
      }
    }
    return encodedPassword;
  }

  AdminLogin(data:any){
    return this.http.post(this.IP+'/admin/admin_login',data)

  }

  SendAdminLogDetails(data:any,httpOptions:any){
    return this.http.post(this.IP+'/admin/adminloginlogdetails',data,httpOptions)

  }

  AdminLogout(httpOptions:any){
    return this.http.get(this.IP+'/admin/admin_logout',httpOptions)
  }


  UserLogin(data:any){
    return this.http.post(this.IP+'/user/login',data)
  }


  SendUserLogDetails(data:any,httpOptions:any){
    return this.http.post(this.IP+'/user/userloginlogdetails',data,httpOptions)
  }


  UserLogout(httpOptions:any){
    return this.http.get(this.IP+'/user/logout',httpOptions)
  }

  
  GetOTP(data:any){
    return this.http.post(this.IP+'/admin/admin_forgot_password',data)
  }


  ForgottenPassword(data:any){
    return this.http.post(this.IP+'/admin/admin_reset_password',data)
  }

}
