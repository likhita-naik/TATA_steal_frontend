import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { ServerService } from "src/app/Services/server.service";

@Injectable({
    providedIn:'root'
})

export class SteamSuitService{
    public IP:any
    public steamDataDelay:number
    constructor(public http:HttpClient,public server:ServerService,public snackbar:MatSnackBar){
    this.IP=this.server.IP
    this.steamDataDelay=this.server.steamDataDelay
    

    }
    AddFirstCameraByRtsp(data:any){
        return  this.http.post(this.server.IP+'/add_maincamera_rtsp',data)

    }
  AddFirstCameraByIp(data:any){
   return this.http.post(this.server.IP+'/add_maincameraIP',data)
  }
  AddSecondCameraByRtsp(data:any){
    return  this.http.post(this.server.IP+'/add_subcamera_rtsp',data)

}
AddSecondCameraByIp(data:any){
return this.http.post(this.server.IP+'/add_subcameraip',data)
}

GetSteamSuitCameraInfo(){
    return this.http.get(this.server.IP+'/GetSteamCamdetails')
}

AddAlarmToSteamSuit(data:any){
  return this.http.post(this.IP+'/Steamsuitalarmdetails',data)
}

AddRoiToSteamSuit(data:any){
  return this.http.post(this.IP+'/add_streamsuitroi',data)
}

AddPPEToSteamSuit(data:any){
  return  this.http.post(this.IP+'/add_streamsuitppe',data)
}

GetRoiDetails(data:any){
 return this.http.post(this.IP+'/GETstreamWisedata',data)
}
notification(message: string, action?: string) {
    this.snackbar.open(message, action ? action : '', ({
      duration: 4000, panelClass: ['error'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
    )
  }

  DeleteSteamSuitRoi(data:any){
    return this.http.post(this.IP+'/delete_steam_roi',data)
  }
  
  AddSteamTC(data:any)
{
return this.http.post(this.IP+'/add_steamtc_data',data)
}
DeleteSteamTC(data:any){
 return this.http.post(this.IP+'/delete_steam_tc_data',data)
}
AddSteamCC(data:any){
  return this.http.post(this.IP+'/add_steamcr_data',data)


}

CheckApplicationStatus(){
  return this.http.get(this.IP+'/check_process')
}
StopSteamSuitApp(){
  return this.http.get(this.IP+'/stopsteamsuitapp')
}


DeleteMainSteamCamera(id:any){
  return this.http.get(this.IP+'/delete_main/'+id)
}
GetSetValueConfig(){
 return this.http.get(this.IP+'/GetL1datadetails')
}
UpdateSetvalueConfig(data:any){

}
StartSteamSuitApp(){
  return this.http.get(this.IP+'/startsteamsuit')
}
SetValueConfig(data:any){
  return this.http.post(this.IP+'/set_value_configuration',data)
}
GetAnalyticsData(){
return this.http.get(this.IP+'/GetLsteamsuit')
}
DeleteSteamCC(data:any){
  return this.http.post(this.IP+'/delete_steam_cr_data',data)

}
GetCameraBrandDetails(){
  return this.http.get(this.IP+'/get_camera_brand_details')
}
GetCurrentViolations(){
  return this.http.get(this.IP+'/GetLlateststeamsuitviolation')
}
}