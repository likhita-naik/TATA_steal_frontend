import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  IP:string
  dashboardInterval:number

  constructor(
    public http:HttpClient,
    public snackbar:MatSnackBar,
    public datePipe:DatePipe
  ) 
  {
    var res=this.loadConfigFile('assets/config.json')
    res=JSON.parse(res)
    this.IP=res.IP
    this.dashboardInterval=res.dashboardInterval
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

  GetLicenseDetails(){
    return this.http.get(this.IP+'/licenseNewcount')
  }

 GetViolationsList(){
  return this.http.get(this.IP+'/violation_type_details')
 }

 GetCamerasStatus(){
   return this.http.get(this.IP+'/get_cam_status_enable_cam_count')
 }

  GetLiveViolationsCount(){
    return this.http.get(this.IP+'/get_current_date_violation_counts')
  }

  GetDatewiseViolationsCount(fromDate:any,toDate:any){
    return this.http.post(this.IP+'/date_wise_violations_count',{from_date:fromDate,to_date:toDate})
  }

  EnabledCamDetails(){
    return this.http.get(this.IP+'/get_all_solns_enable_cam_details')
  }

  DisabledCamDetails(){
    return this.http.get(this.IP+'/disable_camera_details')
  }

  NotWorkingCamDetails(){
    return this.http.get(this.IP+'/get_not_working_camera_details')
  }

  TotalViolationsDetails(){
    return this.http.get(this.IP+'/current_date_violations_cam_wise')
  }

  DatewiseTotalViolationsDetails(fromDate:any,toDate:any){
    return this.http.post(this.IP+'/cam_wise_violations_count_by_date',{from_date:fromDate,to_date:toDate})
  }
  
  PPEViolationsDetails(){
    return this.http.get(this.IP+'/cam_wise_PPE_violations_count')
  }

  DatewisePPEViolationsDetails(fromDate:any,toDate:any){
    return this.http.post(this.IP+'/cam_wise_PPE_violations_by_date',{from_date:fromDate,to_date:toDate})
  }

  RAViolationsDetails(){
    return this.http.get(this.IP+'/cam_wise_RA_violations_count')
  }

  DatewiseRAViolationsDetails(fromDate:any,toDate:any){
    return this.http.post(this.IP+'/cam_wise_RA_violations_by_date',{from_date:fromDate,to_date:toDate})
  }

  CCViolationsDetails(){
    return this.http.get(this.IP+'/cam_wise_CR_violations_count')
  }

  DatewiseCCViolationsDetails(fromDate:any,toDate:any){
    return this.http.post(this.IP+'/cam_wise_CR_violations_by_date',{from_date:fromDate,to_date:toDate})
  }

}
