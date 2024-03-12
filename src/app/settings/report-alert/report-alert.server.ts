import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ServerService } from "src/app/Services/server.service";

@Injectable({
    providedIn:'root'
})

export class ReportService{
   IP:any

    constructor(public webServer:ServerService,public httpClient:HttpClient,public snackbar:MatSnackBar){
     this.IP= this.webServer.IP
    }

    AddReportDetails(data:any){
      return this.httpClient.post(this.IP+'/insert_email_details',data)

    }
    GetThresholdDetails(){
      return  this.httpClient.get(this.IP+'/modelthresshold')
    }

    UpdateThreshold(data:any){
      return this.httpClient.post(this.IP+'/updatethreshold',{data})
    }

    UpdateConfigValues(data:any)
  {
    return this.httpClient.post(this.IP+'/CONFIGConfiguration',data)
  }
GetConfigValues()
{
  return this.httpClient.get(this.IP+'/CONFIGConfiguration')
}

notification(message: string, action?: string,duration?:number) {
  console.log('snackbar')
  this.snackbar.open(message, action ? action : '', ({
    duration:duration?duration:4000, panelClass: ['error'],
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  })

  )
}


GetReportsDetails(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  return this.httpClient.get(this.IP+'/get_alert_emaildata',httpOptions)
}

EditReportDetails(details:any){
  return this.httpClient.post(this.IP+'/edit_email_details',details)
}
DeleteReportDetails(data:any){
  return this.httpClient.post(this.IP+'/delete_email_detail',data)
}

GetDepartmentList(){
   return this.httpClient.get(this.IP+'/departments_list')
  //return this.httpClient.get('http://192.168.1.51:5000/departments_list')
}
}