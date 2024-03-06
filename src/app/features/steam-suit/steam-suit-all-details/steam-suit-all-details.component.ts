import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SteamSuitService } from '../steam-suit-detection/steamSuitDetection.service';
import { Lightbox } from 'ngx-lightbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steam-suit-all-details',
  templateUrl: './steam-suit-all-details.component.html',
  styleUrls: ['./steam-suit-all-details.component.css']
})
export class SteamSuitAllDetailsComponent implements OnInit {
   allViolations:any[]=[]
   dataFetchStatus:string=''
   responseMessage:string=''
   @Output() BackToLiveStatus=new EventEmitter()
   IP:any
   
  constructor(public Server:SteamSuitService,public lightbox:Lightbox,private Router:Router){
  this.IP=this.Server.IP
  this.GetDetails()
  }
ngOnInit(): void {

}
  GetDetails(){
     //clearInterval(this.intervalVar)
     this.dataFetchStatus='init'
    this.Server.GetAnalyticsData().subscribe((response:any)=>{
      if(response.success){
        this.dataFetchStatus='success'
        // response.message.forEach((element:any) => {
        //   console.log(element)
          
        // });
        this.allViolations=response.message

      
      }
      else{
    this.dataFetchStatus="fail"
    this.responseMessage=response.message
      }
    },Err=>{
      this.dataFetchStatus='error'
      this.Server.notification("Error while fetching the data",'Retry')
    })
  }


  onImageClick(violation:any,type?:string){
    var imgArr:any[]=[ {
     src: this.Server.IP + '/STEAMVIOLATIONIMAGE/' + violation.image_name,
   
     thumb:this.Server.IP + '/STEAMVIOLATIONIMAGE/' +violation.image_name,
     caption: ` ${violation.message}`,
     }]
   console.log(imgArr)
   this.lightbox.open(imgArr,0)
   
   }
   BackToLive(){
    this.Router.navigate(['app/SteamSuitDetection/Details'])
  }
}
