import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EsiUnallocatedService } from './esi-unallocated.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Lightbox } from 'ngx-lightbox';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-esi-unallocated',
  templateUrl: './esi-unallocated.component.html',
  styleUrls: ['./esi-unallocated.component.css']
})

export class EsiUnallocatedComponent implements OnInit,OnDestroy {
  // remark:boolean
  // rtsp:string
    data:any[] = []
    images: any[] = []
    tempData:any[]
    pageSize: number = 10
    page: number = 1
    id:any
    // shutdownName: any;
    // time: any;
    IP: any;
    selectedEditIndex: any
    queryParams:any
    selectedRiro: any
    editViol: any
    unplannedInterval:any
    // unallocatedJob:any
    editedRackProc:any
    editedFeedNo:any
    editField: string
    dataFetchStatus:string='init'
    remarkControl:FormControl=new FormControl('',Validators.required)
   
    verifyControl:FormControl=new FormControl()
    editfeednoControl:FormControl=new FormControl('',Validators.required)
    // verification:FormControl=new FormControl
    rackProcess:FormControl= new FormControl('',Validators.required)
    total: Observable<number> = of(0)
    panelData:Observable< any[]>=of([])
    isHistory:boolean=false
    // loading: boolean = false
    // table: HTMLElement
    excelLoader:boolean = false
    deleteFeedLoader:boolean = false
    saveFeedLoader:boolean = false
    deleteRemarkLoader:boolean = false
    saveRemarkLoader:boolean=false
    @ViewChild('unAllocatedJobAlert') Violation: ElementRef<any>;
  
    constructor
    ( private http :HttpClient,
      public service:EsiUnallocatedService,
      public modalService: NgbModal,
      public router: Router,
      private _lightbox: Lightbox,
      public  toasterService:ToastrService,
      public currentRoute:ActivatedRoute)
    {
      this.currentRoute.queryParams.subscribe((queryParamsData:any)=>{
        queryParamsData.isHistory === true ?this.isHistory = true:this.isHistory = false
      // this.isHistory = queryParamsData.isHistory
      this.id=queryParamsData.shutdownId
      // console.log(this.shutdownName=data.shutdownName)
      // console.log(this.time=data.time)
      this.queryParams=queryParamsData})

      // var res=this.loadConfigFile('assets/config.json')
      // res=JSON.parse(res)
      this.IP=this.service.IP
    }


    // loadConfigFile(filepath:any){
    //   const JSON=this.readConfigFile(filepath,'application/json')
    //   return JSON
    // }

    // readConfigFile(filepath:any,mimeType:any){
    //   var xmlRequest=new XMLHttpRequest() 
    //   xmlRequest.open('GET',filepath,false)
    //   if (mimeType != null) {
    //     if (xmlRequest.overrideMimeType) {
    //       xmlRequest.overrideMimeType(mimeType);
    //     }
    //     xmlRequest.send()

    //     if(xmlRequest.status){
    //       return xmlRequest.response
    //     }
    //     else{
    //       return null
    //     }
    //   }
    // }


    ngOnInit(): void{
      var table = document.getElementById('dataTable')
      table?.classList.add('loading')
      
      if(!this.isHistory){
        table?.classList.remove('loading')
        this.GetUnplannedData()
      }
      
        table?.classList.remove('loading')
        this.GetunallocatedJobs()
      
 
    }


    GetunallocatedJobs(){

      var table = document.getElementById('dataTable')
      table?.classList.add('loading')

      this.service.GetunallocatedJobs(this.isHistory,this.id).subscribe((response:any) =>{
        if(response.success){
          this.tempData =  response.message;
          this.panelData = of(response.message)
          this.sliceData();
          table?.classList.remove('loading')
        }

        else{
          table != null ? table.classList.remove('loading') : ''
          this.dataFetchStatus = 'success'
          this.total=of(0)
          this.tempData=[]
          this.service.notification(response.message,'Retry')
          table?.classList.remove('loading')
          // table?.classList.remove('loading')
        }},
        Err => {
          table?.classList.remove('loading')
          this.service.notification("Error While Fetching the Data",'Retry')
          this.dataFetchStatus='Error'
        }) 
    }


    sliceData(){
      this.total = of((this.tempData.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)).length)
      this.total = of(this.tempData.length)
      this.data=(this.tempData.map((div: any, SINo: number) => ({ SNo: SINo + 1, ...div })).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize))
      this.panelData = of((this.tempData.map((div: any, SINo: number) => ({ SNo: SINo + 1, ...div })).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))
    }



    imageCarousal(viol: any) {
      this.images = [];
      if(Array.isArray(viol.riro_image.After)) {
        viol.riro_image.After.forEach((imgname: string, index: number) => {
        this.images[index] = {
          src: this.IP + '/Unplannedriroimage/' + imgname,
          thumb: this.IP + '/Unplannedriroimage/' + imgname,
          caption: imgname,
        };
      });
      }
      else if (typeof viol.riro_image.After === 'string') {
        // If viol.riro_image.After is a string, assume it's a single image
        this.images[0] = {
          src: this.IP + '/Unplannedriroimage/' + viol.riro_image.After,
          thumb: this.IP + '/Unplannedriroimage/' + viol.riro_image.After,
          caption: viol.riro_image.After,
        };
      } 
      else{
        console.error('Invalid format for viol.riro_image.After');
        // Handle other cases or throw an error if needed
        return;
      }
    
      this.open(0);
    }
    

    ImageCarousal2(viol: any) {
      this.images = [];
        if (Array.isArray(viol.Before)) {
          viol.Before.forEach((Before: string, index: number) => {
            this.images[index] = {
              src: this.IP + '/Unplannedriroimage/' + Before,
              thumb: this.IP + '/Unplannedriroimage/' + Before,
              caption: Before,
            };
          });
        } 
        else if (typeof viol.Before === 'string') {
            // If viol.Before is a string, assume it's a single image
          this.images[0] = {
            src: this.IP + '/Unplannedriroimage/' + viol.Before,
            thumb: this.IP + '/Unplannedriroimage/' + viol.Before,
            caption: viol.Before,
          };
        } 
        else {
            console.error('Invalid format for viol.Before');
            // Handle other cases or throw an error if needed
            return;
         }
    
        this.open(0);
    }

    
    open(index: number): void {
        this._lightbox.open(this.images, index);
    }

    close(): void {
      this._lightbox.close();
    }
    
    EditRack(event: any) {
      console.log(event)
      this.editedRackProc = event.target.value
    }

    EditFeedNo(event: any) {
      console.log(event)
      this.editedFeedNo =event.target.value
    }
    
    SaveRackChanges() {
        var index = this.tempData.findIndex((data: any) => {
            return data.riro_key_id == this.selectedEditIndex
        })
        var field=this.editField
        // console.log(index)
        var data1:any={
        riro_key_id:this.selectedEditIndex
        }
        data1[this.editField]= this.editedRackProc
        // console.log(data1)
        this.service.EditRiroJob(data1).subscribe((response:any)=>{

        if(response.success){
          this.service.notification(response.message)
          this.tempData[index].rack_process = this.editedRackProc
          this.sliceData() 
          this.GetunallocatedJobs()  
          this.modalService.dismissAll()
        }
        else{
          this.service.notification(response.message,'Retry')
        }
        },
        Err=>{
          this.service.notification('Error while updating','Retry')
        })
    }


    SaveFeedNoChanges() {
      this.saveFeedLoader=true
      var index = this.tempData.findIndex((data: any) => {
        return data.riro_key_id == this.selectedEditIndex
      })
      var data1:any ={
      riro_key_id:this.selectedEditIndex,
      }

      data1[this.editField]=this.editfeednoControl.value
      this.service.EditRiroJob(data1).subscribe((response:any)=>{
    
      if(response.success){
        this.saveFeedLoader=false
        this.service.notification(response.message)
        this.GetunallocatedJobs()
        this.modalService.dismissAll()
      }
      else{
        this.saveFeedLoader=false
        this.service.notification(response.message,'Retry')
      }
      },
      _Err=>{
        this.saveFeedLoader=false
        this.service.notification('Error while updating','Retry')
      })
      
    }
    

    VerifyTrueViol(event: any, viol: any) {
      this.editViol = viol
      console.log(viol)
      // this.verifyControl.setValue(viol)
      this.service.VerifyViolation(this.editViol._id.$oid, true).subscribe((response: any) => {
        this.service.notification(response.message)
        // var table = document.getElementById('dataTable')
        // table?.classList.add('loading')
        if (response.success) {
          this.GetunallocatedJobs();
          // this.modalService.dismissAll()
         
          // this. GetunallocatedJobs()
        }
        // this. GetunallocatedJobs()
        }, 
        (_Err: any) => {
        this.service.notification("Error while the  Process", 'Retry')
        })
    }

    VerifyFalseViol(event: any, viol: any) {
      this.editViol = viol
      // this.verifyControl.setValue(viol)
      this.service.VerifyViolation(this.editViol._id.$oid, false).subscribe((response: any) => {
      //   var table = document.getElementById('dataTable')
      // table?.classList.add('loading')
        this.service.notification(response.message)
       
        if (response.success) {
          this.GetunallocatedJobs();
          // this.modalService.dismissAll()
          // this. GetunallocatedJobs()
          
        }
        // this. GetunallocatedJobs()
        }, 
        (_Err: any) => {
            this.service.notification("Error while the  Process", 'Retry')
        })
    }



    RemarkModal(modal: any, data: any,field:any,) {
      this.editField=field
      console.log('remark modal')
      this.selectedRiro=data
      this.selectedEditIndex = data.riro_key_id
      this.modalService.open(modal, {size:'xl'})
      this.rackProcess.setValue(data.rack_process)
       this.editfeednoControl.setValue(data.panel_no)
    }

    FeedNoModal(modal:any,data:any,field:any){
      this.editField=field
      this.selectedRiro =data
      this.selectedEditIndex = data.riro_key_id
      this.modalService.open(modal,{size:'xl'})
      this.editfeednoControl.setValue(data.panel_no)

    }
    

    EditRemark(modal:any,data:any,field:any){
      this.editField=field
      this.selectedEditIndex = data.riro_key_id
      console.log(this.tempData,'this is tempdata')
      var index = this.tempData.findIndex((data: any) => {
        return data.riro_key_id == this.selectedEditIndex
      })
      var temp = this.tempData[index]
      console.log(temp,'this.temp')
      this.remarkControl.setValue(temp.remarks == "None"?null:temp.remarks)
      
      this.modalService.open(modal, {  backdrop:'static'})
    }

    EditFeed(modal:any,data:any,field:any){
      this.editField=field
      this.selectedEditIndex = data.riro_key_id
      console.log(this.tempData,'this is tempdata')
      var index = this.tempData.findIndex((data: any) => {
        return data.riro_key_id == this.selectedEditIndex
      })
      var temp = this.tempData[index]
      console.log(temp,'this.temp')
      this.editfeednoControl.setValue(temp.panel_no)
      this.modalService.open(modal, {  backdrop:'static'})
    }
   

    
    SaveRemark() {
      this.saveRemarkLoader=true
      var index = this.tempData.findIndex((data: any) => {
        return data.riro_key_id == this.selectedEditIndex
      })
      console.log(index)
      var data1:any ={
      riro_key_id:this.selectedEditIndex,
      }
     data1[this.editField]=this.remarkControl.value
     this.service.EditRiroJob(data1).subscribe((response:any)=>{
        if(response.success){
          this.saveRemarkLoader=false
          this.service.notification(response.message)
          this. GetunallocatedJobs()
          this.modalService.dismissAll()
        }
        else{
          this.saveRemarkLoader=false
          this.service.notification(response.message,'Retry')
        }
      },
      _Err=>{
        this.saveRemarkLoader=false
        this.service.notification('Error while updating','Retry')
      })
    }
    
    clearRemarkarea() {
      this.remarkControl.reset(); // Reset the value of the textarea
    }
    

    clearFeedNoarea() {
      this.editfeednoControl.reset(); // Reset the value of the textarea
    }
    



    CreateExcel(id?:any) {
      // var table = document.getElementById('dataTable')
      // table?.classList.add('loading')
      this.excelLoader = true
      if(this.isHistory){
        
        const createExcelUrl = this.IP + '/UnplannedJobscreate_excel/' +id;
          // Make a GET request to create the Excel file
        this.http.get(createExcelUrl).subscribe((Response: any) => {
            console.log('Excel created successfully:', Response);
            this.service.notification('Excel is downloading')

            // Extract relevant information from the server response
            const serverResponse = Response.message; // Adjust this based on the actual structure of the response
  
            // Call the downloadExcel function with the server response
            if(Response.success){
              this.DownloadExcel(serverResponse,Response.filename);
              // table?.classList.remove('loading')
            }
            else{
              this.service.notification(Response.message,'Retry')
              // table?.classList.remove('loading')
              this.excelLoader = false
            }
          }
         ,
          (error) => {
            // Display error message to the user
            this.handleServerError(error);
            // table?.classList.remove('loading')
            this.excelLoader=false
          }
        );
      }
      else{
        const createExcelUrl = this.IP + '/UnplannedJobscreate_excel';
          // Make a GET request to create the Excel file
        this.http.get(createExcelUrl).subscribe( (Response: any) => {
          console.log('Excel created successfully:', Response);

            // Extract relevant information from the server response
          const serverResponse = Response.message; // Adjust this based on the actual structure of the response
  if(Response.success){
 // Call the downloadExcel function with the server response
 this.DownloadExcel(serverResponse,Response.filename);
 this.excelLoader=false
  }
  else{
   this.service.notification(Response.message,'Retry')
    this.excelLoader=false
  }
           
        },
        (error) => {
            // Display error message to the user
            this.handleServerError(error);
            // table?.classList.remove('loading')
            this.excelLoader=false
        }
      );}
    }
  
    DownloadExcel(serverResponse: any,filename?:any) {
      // var table = document.getElementById('dataTable')
      // table?.classList.add('loading')
      const downloadExcelUrl = this.IP + '/Unplannedexcel_download';
  
      // Make a GET request to download the Excel file
      this.http.get(downloadExcelUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
          // Use the server response or perform additional actions as needed
          console.log('Download Excel successful');
  
          // Save the Blob as a file
          saveAs(blob,filename);
  
          // Display success message for Excel download
  
          // Display success message to the user using the server response
          this.handleServerResponse(serverResponse);
          // table?.classList.remove('loading')
          this.excelLoader=false
      },
      (error) => {
          // Display error message to the user
        this.handleServerError(error);
        // table?.classList.remove('loading')
        this.excelLoader=false
      });
    }

    handleServerResponse(response: any) {
      // Display server response to the user
      console.log('Server Response:', response);
  
      // You can use the response to perform additional actions or display information to the user
      this.service.notification(' Excel is downloaded successfully');
    }
  
    handleServerError(error: any) {
      // Assuming server response contains an 'error' property
      const errorMessage = error.error && error.error.error ? error.error.error : 'An error occurred';
  
      // Display error message to the user
      this.service.notification(errorMessage, 'Error');
      console.error('Server error', error);
    }

   
    RirDeleteModal(modal:any,id:any){
      this.selectedEditIndex=id
      this.modalService.open(modal)
    }


    RiroDelete(){ 
        // var index = this.tempData.findIndex((data: any) => {
        //   return data.riro_key_id === this.selectedEditIndex
        // })
        
        // var tempData = this.tempData[index]
        
        this.service.DeleteUnallocated(this.selectedEditIndex).subscribe((response: any) => {
          this.service.notification(response.message)
          if (response.success) {
              this.GetunallocatedJobs();
              
          }
            this.modalService.dismissAll()
        },
        _Err => {
          this.service.notification('Error while deleting job', 'Retry')
        })

    }
DeleteRemark(){
  // var index = this.tempData.findIndex((data:any) =>{
  //   return data.riro_key_id === this.selectedEditIndex
  // })
  this.deleteRemarkLoader = true
  var data1:any ={
    riro_key_id:this.selectedEditIndex,
    }
  this.service.DeleteRemark(data1).subscribe((Response:any) => {
    this.service.notification(Response.message)
    if(Response.success){
      this.deleteRemarkLoader=false
      this.GetunallocatedJobs();
      this.modalService.dismissAll();
    }
    // this.modalService.dismissAll();
  }
  ,_Err =>{
    this.deleteRemarkLoader=false
    this.service.notification("Error while deleting the Remark",'Retry')
  })

}

DeleteFeedNo(){
  // var index = this.tempData.findIndex((data:any) =>{
  //   return data.riro_key_id === this.selectedEditIndex
  // })
  this.deleteFeedLoader=true
  var data1:any ={
    riro_key_id:this.selectedEditIndex,
    }
  this.service.DeleteFeedNo(data1).subscribe((Response:any) => {
    this.service.notification(Response.message)
    if(Response.success){
      this.deleteFeedLoader=false
      this.GetunallocatedJobs();
      this.modalService.dismissAll();
    }
    // this.modalService.dismissAll();
  }
  ,_Err =>{
    this.deleteFeedLoader=false
    this.service.notification("Error while deleting the Remark",'Retry')
  })

}



    Back() {
      window.close()
    }


    ngOnDestroy(): void {
      this.modalService.dismissAll()
      clearInterval(this.unplannedInterval)
      this.toasterService.clear()
    }

    GetUnplannedData(){
      this.unplannedInterval=  setInterval(()=>{
      this.service.GetUnallocatedLiveCount().subscribe((response:any)=>{
        if(response.success){
          if(response.now_live_count-response.previous_live_count>0){
              this.GetunallocatedJobs();
            }
          }
        })
      },this.service.unplannedInterval)
    }
    
    resetVerification(data: any): void {
      // Reset the verification status to null or any initial value as needed
      data.violation_verificaton_status = null;
    }

    // RTSP(){
    //   var rtsp= 'rtsp://admin:admin123@10.11.3.211:554/cam/realmonitor?channel=1&subtype=0';
    //   console.log(rtsp,'this is from the RTSP Function')
    //   var data
    //   {
    //     data:rtsp
        
    //   }
      
    //   this.server.RTSP(data).subscribe((response:any) =>
    //   {
    //    var rts = response;
    //    console.log(rts,'this is rtsp from the RTSP function ')
    //   })
    // }


    
}

