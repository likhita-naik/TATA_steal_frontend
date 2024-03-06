import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
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

  notification(message: string, action?: string) {
    this.snackbar.open(message, action ? action : '', ({
      duration: 4000, panelClass: ['error'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
    )
  }

  

  AddUser(data:any,httpOptions:any){
    return this.http.post(this.IP+'/admin/admin_add_users',data,httpOptions)
  }

  ExistingUserDetails(httpOptions:any){
    return this.http.get(this.IP+'/admin/admin_view_users',httpOptions)
  }


  DeleteUser(data:any,httpOptions:any){
    return this.http.post(this.IP+'/admin/userdelete',data,httpOptions)
  }
  
}
