import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  IP:string
  autoLogoutInterval:any

  constructor(
    public http:HttpClient,
    public datePipe:DatePipe,
    public snackbar:MatSnackBar,
  ) { 
    var res=this.loadConfigFile('assets/config.json')
    res=JSON.parse(res)
    this.IP=res.IP
    this.autoLogoutInterval = res.autoLogoutInterval
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

  notification(message: string, action?: string) {
    this.snackbar.open(message, action ? action : '', ({
      duration: 4000, panelClass: ['error'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
    )
  }

  
  ChangeAdminPassword(data:any,httpOptions:any){
    return this.http.post(this.IP+'/admin/admin_changepassword',data,httpOptions)
  }

  UpdateAdminProfile(data:any,httpOptions:any){
    return this.http.post(this.IP+'/admin/update_admin_profile',data,httpOptions)
  }

  AdminProfileDetails(httpOptions:any){
    return this.http.get(this.IP+'/admin/admin_profile',httpOptions)
  }
  AdminLogout(httpOptions:any){
    return this.http.get(this.IP+'/admin/admin_logout',httpOptions)
  }

  UserProfileDetails(httpOptions:any){
    return this.http.get(this.IP+'/user/profile',httpOptions)
  }

  UserLogout(httpOptions:any){
    return this.http.get(this.IP+'/user/logout',httpOptions)
  }

  ChangeUserPassword(data:any,httpOptions:any){
    return this.http.post(this.IP+'/user/changepassword',data,httpOptions)
  }

  UpdateUserProfile(data:any,httpOptions:any){
    return this.http.post(this.IP+'/user/update_user_profile',data,httpOptions)
  }

  encodePassword(password: string): string {
    let encodedPassword = '';
    for (let i = 0; i < password.length; i++) {
      encodedPassword += password.charCodeAt(i);
      if (i !== password.length - 1) {
        encodedPassword += ', '; // Add comma and space if it's not the last character
      }
    }
    return encodedPassword;
  }

  }

  

