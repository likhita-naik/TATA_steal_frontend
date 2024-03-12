import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ServerService } from 'src/app/Services/server.service';
import { saveAs } from 'file-saver';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-panel-violations',
  templateUrl: './panel-violations.component.html',
  styleUrls: ['./panel-violations.component.css']
})
export class PanelViolationsComponent implements OnInit {
  violationData:Observable<any[]>=of([])
  total:Observable<number>=of(0)
  page:number=1
  pageSize:number=10;
  panel:any
  tempData:any[]=[]
  images:any[]=[]
  API:any
  currentPanel:any
  area:any
  currentData:any=null
  editViol:any
  department:any
  objectKeys = Object.keys

  constructor(private server:ServerService,private activatedRoute:ActivatedRoute,private http:HttpClient,
    private _lightbox: Lightbox,
    private _lightBoxConfig: LightboxConfig,) {
    this.activatedRoute.queryParams.subscribe((data:any)=>{
      this.currentData=data
      console.log(data)
      var  body={
        id:data.id,
        panel_no:data.panel,
        imagename:data.imageName
      }
      this.currentPanel=data.panel
      this.area=data.area
      this.department=data.department

      this.panel=body
    })
    this.API=this.server.IP
  
   }

  ngOnInit(): void {
    this.GetPPEViolations(this.panel)

  }

  imageCarousal(viol: any) {

    //  NgImageSliderServi
    this.images = []
    viol.imagename.forEach((imgname: string, index: number) => {
      console.log(imgname)
      this.images[index] = {
        src: this.API + '/image/' + imgname,
  
        thumb: this.API + '/image/' + imgname,
        caption: imgname,
  
      }
    })
  
    this.open(0)
    console.log(this.images)
  
  }
  open(index: number): void {
    // open lightbox
    console.log('opening lightbox')
    this._lightbox.open(this.images, index);
  }
  downloadImage(img: any) {
    const imgUrl = img;
    const requestOptions = {
      headers: new HttpHeaders({
        responseType: 'blob',
        // observe:'body'
      }),
      withCredentials: true
    };
    console.log(imgUrl)
    const imgName = imgUrl.substr(imgUrl.lastIndexOf('/') + 1);

  
    this.http.get(imgUrl, {responseType:'blob'}).subscribe(
      (d: any) => {
        console.log("image url data", d);
        saveAs(d, imgName);
  
      },
      (err: any) => {
        console.log("error", err)
      }
    )
  
  }


  Back() {
    // this.router.navigate(['app/CameraSettings'])
     window.close()
 
   }


   GetPPEViolations(data:any){
    var table=document.getElementById('dataTable')
    table.classList.add('loading')
    this.server.GetRiRoViolationData(data).subscribe((data:any)=>{
      console.log(data)
      table.classList.remove('loading')
      if(data.success===true){
        this.tempData=data.message
  
    this.sliceVD()
      }
      else{
        table.classList.remove('loading')
        this.server.notification(data.message)
      }
    },
    Err=>{
      table.classList.remove('loading')
      this.server.notification('Error While fetching the Data','Retry')
    })

   }
   SelectViol(data:any,modal:any){
    this.editViol=data
    }
    VerifyTrueViol(event:any,viol:any){
      this.editViol=viol
      this.server.VerifyViolation(this.editViol._id.$oid,true).subscribe((response:any)=>{
        console.log(response)
        this.server.notification(response.message)
        if(response.success){
          // this.modalService.dismissAll()
          this.server.GetRiRoViolationData(this.panel).subscribe((data:any)=>{
            console.log(data)
            if(data.success===true){
              this.tempData=data.message
        
          this.sliceVD()
            }
            else{
              // this.server.notification(data.message)
            }
          })
          
        }
        
      },(Err:any)=>{
        this.server.notification("Error while the  Process",'Retry')
      })
    }
    
    
    VerifyFalseViol(event:any,viol:any){
      this.editViol=viol
      this.server.VerifyViolation(this.editViol._id.$oid,false).subscribe((response:any)=>{
        console.log(response)
        this.server.notification(response.message)
        if(response.success){
          // this.modalService.dismissAll()
          this.server.GetRiRoViolationData(this.panel).subscribe((data:any)=>{
            console.log(data)
            if(data.success===true){
              this.tempData=data.message
        
          this.sliceVD()
            }
            else{
              this.server.notification(data.message)
            }
          })  
        }
        
      },(Err:any)=>{
        this.server.notification("Error while the  Process",'Retry')
      })
    }
    
 
  sliceVD(){
    this.total = of((this.tempData.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)).length)
    this.total = of(this.tempData.length)
    this.violationData = of((this.tempData.map((div: any, SINo: number) => ({ SNo: SINo + 1, ...div })).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))
  }

}
