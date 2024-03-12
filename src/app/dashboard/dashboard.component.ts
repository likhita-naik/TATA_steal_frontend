
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import dayjs from 'dayjs/esm';
import {  Moment } from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { DashboardService } from './dashboard.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  selectedMoments: { startDate: Moment, endDate: Moment } = null
  enabledCamDetails: any[]=[]
  cameraStatus: any = { total_cam_count: 0, enable_data_count: 0, disable_data_count: 0, not_working_cam_count: 0, working_cam_count: 0 }
  disabledCamDetails: any[] = []
  violationsCount: any = { total_count: 0, ppe_count: 0, ra_count: 0,cr_count:0 }
  NWCamDetails: any[] = []
  fromDate: any
  toDate: any
  violationList: any[] = []
  DaterangepickerDirective: DaterangepickerDirective
  IP: any
  dashboardInterval: number
  PPEViolations: any[] = []
  CCViolations:any[]=[]
  RAViolations: any[] = []
  chartOptionsBar: any
  chartOptionsPie: any
  isDatewise: boolean =false
  camerasStatusAndViolationsInterval:any
  Object:any=Object
  allViolationsDetails: any[] = []
  images: any[] = []
  AISolutions:any={RA:'Danger Zone',PPE:'Personal Protective Equipment',TC:'Traffic Count' ,CR:'Crowd Count',fire:'Fire',smoke:'Smoke' }
  dateInputControl:FormControl=new FormControl('',Validators.required)
  calendarIcon: boolean = false
  dataFetchStatus:string ='init'
  camerasLicenseDetails:{added_cameras_count:number,remaining_license:number,total_license:number}
  camerasLicenseDetailsInterval: any;

  ranges: any = {
    'Today': [dayjs().hour(0).minute(0).second(0), dayjs()],
    'Yesterday': [dayjs().subtract(1, 'days').hour(0).minute(0).second(0), dayjs().subtract(1, 'days')],
    'Last 7 Days': [dayjs().subtract(6, 'days').hour(0).minute(0).second(0), dayjs()],
    'Last 30 Days': [dayjs().subtract(29, 'days').hour(0).minute(0).second(0), dayjs()],
    'This Month': [dayjs().startOf('month').hour(0).minute(0).second(0), dayjs().endOf('month')],
  }

  @ViewChild('reportrange', { static: true }) reportRange: any
  @ViewChild('datepicker', { static: true }) datePicker: any
  @ViewChild(DaterangepickerDirective, { static: true }) pickerDirective: DaterangepickerDirective

  constructor(
    private service:DashboardService, 
    private modalService: NgbModal, 
    private Router: Router,
    private _lightbox: Lightbox,
    private _lightBoxConfig: LightboxConfig
    )
  {
    this.IP = this.service.IP
    this.dashboardInterval = this.service.dashboardInterval


    //Interval for the cameras status and live violations counts 
    this.camerasStatusAndViolationsInterval=  setInterval(() => {
      this.service.GetCamerasStatus().subscribe((data: any) => {
        this.cameraStatus = data.message[0]
      })
      if (!this.isDatewise) {
        this.service.GetLiveViolationsCount().subscribe((response: any) => {
          if (response.success) {
            if (!this.isDatewise) {
              this.violationsCount = response.message
              this.ChartDraw()
            }
          }
          else{
            this.violationsCount={total_count: 0, ppe_count: 0, ra_count: 0 ,cr_count:0}
          }
        },Err=>{
          this.violationsCount={total_count: 0, ppe_count: 0, ra_count: 0,cr_count:0 }

        })
      }

    }, this.dashboardInterval)


 //Interval for the cameras license details 
    this.camerasLicenseDetailsInterval = setInterval(() =>{
      this.GetLicenseDetails()
    },this.dashboardInterval)


    //lightbox configaration
    this._lightBoxConfig.showDownloadButton = false
    this._lightBoxConfig.showZoom = true
    this._lightBoxConfig.showImageNumberLabel = true
    this._lightBoxConfig.fitImageInViewPort = true
    this._lightBoxConfig.disableScrolling = false
    this._lightBoxConfig.centerVertically = false 

  }


  ngOnInit(): void {
    this.GetLicenseDetails()


    this.service.GetCamerasStatus().subscribe((camerasStatus: any) => {
      this.cameraStatus = camerasStatus.message[0]
    })


    this.service.GetLiveViolationsCount().subscribe((violationsCount: any) => {
      if (violationsCount.success) {
        this.violationsCount = violationsCount.message
        this.ChartDraw()
      }
      else{
        this.violationsCount={total_count: 0, ppe_count: 0, ra_count: 0 ,cr_count:0 }
      }
    },Err=>{
      this.violationsCount={total_count: 0, ppe_count: 0, ra_count: 0,cr_count:0 }
    })


    this.service.GetViolationsList().subscribe((violationList: any) => {
      this.violationList = violationList.message
    })

  }

  ngAfterViewInit(): void {
   
  }

  GetLicenseDetails(){
    this.service.GetLicenseDetails().subscribe((licenseDetails:any)=>{
      if(licenseDetails.success){
       this.camerasLicenseDetails = licenseDetails.message
      }
      else{
        this.service.notification(licenseDetails.message)
      }
    },Err=>{
      
    })
  }

  ToCameras() {
    this.Router.navigate(['/app/CameraSettings'])
  }

  OpenECDetailsModal(modal: any) {
    this.modalService.open(modal, { scrollable: true, size: 'xl' })
    this.images.splice(0, this.images.length)

    var table = document.getElementById('dataTableEC')
    table.classList.add('loading')

    this.service.EnabledCamDetails().subscribe((ECDetails: any) => {
      if(ECDetails.success){
        table.classList.remove('loading')
        this.enabledCamDetails = ECDetails.message
      }
      else{
        table.classList.remove('loading')
        this.dataFetchStatus='success'
      }
    },Err=>{
      table.classList.remove('loading')
      this.dataFetchStatus='Error'
      this.modalService.dismissAll()
    })  
  }


  OpenDCDetailsModal(modal: any) {
    this.images.splice(0, this.images.length)
    this.modalService.open(modal, { size: 'xl', scrollable: true })

    var table = document.getElementById('dataTableDC')
    table.classList.add('loading')

    this.service.DisabledCamDetails().subscribe((DCDetails: any) => {
      
      if (DCDetails.success) {
        table.classList.remove('loading')
        this.disabledCamDetails = DCDetails.message

        this.disabledCamDetails.forEach((element: any, index: number) => {
          this.images[index] = {
            src: this.IP + '/get_roi_image/' + element.imagename,
            thumb: this.IP + '/get_roi_image/' + element.imagename,
            caption: element.imagename,
          }
        });

      }
      else{
        table.classList.remove('loading')
        this.dataFetchStatus='success'
      }
    },
      Err => {
        table.classList.remove('loading')
        this.dataFetchStatus='Error'
        this.modalService.dismissAll() 
      })

  }

  OpenNWCDetailsModal(modal: any) {
    this.images.splice(0, this.images.length)
    this.modalService.open(modal, { size: 'xl', scrollable: true })

    var table = document.getElementById('dataTableNW')
    table.classList.add('loading')

    this.service.NotWorkingCamDetails().subscribe((NWCDetails: any) => {
      
      if (NWCDetails.success) {
        table.classList.remove('loading')
        this.NWCamDetails = NWCDetails.message

        this.NWCamDetails.forEach((element: any, index: number) => {
          this.images[index] = {
            src: this.IP + '/get_roi_image/' + element.imagename,
            thumb: this.IP + '/get_roi_image/' + element.imagename,
            caption: element.imagename,
          }
        });

      }
      else{
        table.classList.remove('loading')
        this.dataFetchStatus='success'
      }
    }, Err => {
      table.classList.remove('loading')
      this.dataFetchStatus='Error'
      this.modalService.dismissAll()
    })

  }


  RefreshData(){
    this.isDatewise = false

    this.service.GetLiveViolationsCount().subscribe((liveViolationsCount: any) => { 
      if (liveViolationsCount.success) {

        if (!this.isDatewise) {
          this.violationsCount = liveViolationsCount.message
          this.ChartDraw()
          this.ClearDateInputField()
        }
      }

      else{ 
        this.violationsCount={ total_count: 0, ppe_count: 0, ra_count: 0 ,cr_count:0}
        this.ChartDraw()
        this.ClearDateInputField()
      }
    },
    Err=>{
      this.service.notification('Error while fetching the data','Retry')
      this.violationsCount={ total_count: 0, ppe_count: 0, ra_count: 0 ,cr_count:0}
      this.ClearDateInputField()
    })
  }

  ChartDraw() {
    this.chartOptionsPie = {
      animationEnabled: true,
      title: {
        text: 'Violations',
      },
      subtitles: [
        {
          text: ''
        },
      ],
      data: [
        {
          type: 'pie', //change type to column, line, area, doughnut, etc
          indexLabel: '{name}: {y}',
          dataPoints: [
           
          ],
        },
      ],
    };

   if( this.violationList.indexOf('RA')>=0){
    this.chartOptionsPie.data[0].dataPoints.push( {
      name: 'Danger Zone',
      y: this.violationsCount.ra_count? this.violationsCount.ra_count:0,
      color: '#5DABFF',
    })
   }
  
   if( this.violationList.indexOf('CRDCNT')>=0){
    this.chartOptionsPie.data[0].dataPoints.push( {
      name: 'Crowd Count',
      
      y: this.violationsCount.cr_count? this.violationsCount.cr_count:0,
      // color: '#00d4ff',
      color:'#128ec1',
    })
   }
   if( this.violationList.indexOf('PPE')>=0){
    this.chartOptionsPie.data[0].dataPoints.push( {
      name: 'Personal Protective Equipment',
      y: this.violationsCount.ppe_count? this.violationsCount.ppe_count:0,
      color: '#6287b2',
 
    })
   }
  //  console.log(this.chartOptionsPie)
    this.chartOptionsBar = {
      // theme:'',
      title: {
        text: 'Violations',
      },
      animationEnabled: true,
      axisY: {
        includeZero: true,
        suffix: '',
      },
      axisX:{
        // valueFormatString: "str",
      },
     
      data: [
        {
          type: 'column',
          indexLabel: '{y}',

          yValueFormatString: '',
          dataPoints: [
            
          ],
        },
      ],
    };

    if( this.violationList.indexOf('RA')>=0){
      this.chartOptionsBar.data[0].dataPoints.push( {
        label: 'Danger Zone',

        y: this.violationsCount.ra_count? this.violationsCount.ra_count:0,
        color: '#5DABFF',
        // color:'#128ec1',
      })
     }
     if( this.violationList.indexOf('PPE')>=0){
      this.chartOptionsBar.data[0].dataPoints.push( {
        label: 'Personal Protective Equipment',

        y: this.violationsCount.ppe_count? this.violationsCount.ppe_count:0,
        color: '#6287b2',
        
      },)
     }
     if( this.violationList.indexOf('CRDCNT')>=0){
      this.chartOptionsBar.data[0].dataPoints.push( {
        label: 'Crowd Count',

        y: this.violationsCount.cr_count? this.violationsCount.cr_count:0,
        // color: '#00d4ff',
        color:'#128ec1',
      },)
     }
    //  console.log(this.chartOptionsBar)
  }


  ClearDateInputField(){
    this.dateInputControl.reset()
    this.calendarIcon = false
  }

  DateUpdated(event: any) {
    if (this.selectedMoments.startDate || this.selectedMoments.endDate) {
      var fromDate = this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss')
      var toDate = this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss')

      this.service.GetDatewiseViolationsCount(this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss'), this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss')).subscribe((datewiseViolCount: any) => {
        this.isDatewise = true 

       if(datewiseViolCount.success){  
        this.violationsCount = datewiseViolCount.message 
        this.ChartDraw()
       }
       else{
        this.violationsCount={ total_count: 0, ppe_count: 0, ra_count: 0 ,cr_count:0}
        this.ChartDraw()
       }

        if (this.selectedMoments.startDate.date() == new Date().getDate() &&
        this.selectedMoments.startDate.month() == new Date().getMonth() &&
        this.selectedMoments.startDate.year() == new Date().getFullYear() ) 
        {
          this.isDatewise = false
        }
      },
        err => {
          this.violationsCount={ total_count: 0, ppe_count: 0, ra_count: 0 ,cr_count:0}
          this.service.notification('Error while fetching the data')
        })

    }

    else {
      this.isDatewise = false

      this.service.GetDatewiseViolationsCount(this.service.dateTransform(new Date(new Date(new Date(new Date().setHours(0)).setMinutes(0)).setSeconds(0))), this.service.dateTransform(new Date())).subscribe((datewiseViolCount: any) => { 

        if(datewiseViolCount.success){
        this.violationsCount = datewiseViolCount.message
        this.ChartDraw()
        }

        else{
          this.violationsCount={ total_count: 0, ppe_count: 0, ra_count: 0 ,cr_count:0}
          this.ChartDraw()
        }

      },
        err => {
          this.service.notification('Error while fetching the data')
          this.violationsCount={ total_count: 0, ppe_count: 0, ra_count: 0,cr_count:0 }
          this.ChartDraw()
        })
    }
  }

  OpenDatePicker(e: MouseEvent) {
    this.calendarIcon = true
    this.pickerDirective.open(e)
  }



  OpenAllViolationsModal(modal: any) {
    this.modalService.open(modal, { size: 'xl', scrollable: true })

    var table = document.getElementById('dataTable')
    table.classList.add('loading')

    this.dataFetchStatus = 'init'

    if (this.isDatewise) {
      this.service.DatewiseTotalViolationsDetails(this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss'), this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss'))
        .subscribe((datewiseTotalViolDetails: any) => {
          if (datewiseTotalViolDetails.success) {
            table.classList.remove('loading')
            this.allViolationsDetails = datewiseTotalViolDetails.message
          }
          else{
            table.classList.remove('loading')
            this.dataFetchStatus = 'success'
            this.service.notification(datewiseTotalViolDetails.message)
          }
          
        }, Err => {
          table.classList.remove('loading')
          this.dataFetchStatus = 'Error'
          this.service.notification('Error while fetching the data')
          this.modalService.dismissAll()
        })
    }
    else {
      this.service.TotalViolationsDetails().subscribe((totalViolDetails: any) => {
          if (totalViolDetails.success) {
            table.classList.remove('loading')
            this.allViolationsDetails = totalViolDetails.message
          }
          else{
            table.classList.remove('loading')
           this.dataFetchStatus='success'
           this.service.notification(totalViolDetails.message)
          }
          
        }, Err => {
          table.classList.remove('loading')
           this.dataFetchStatus='Error'
          this.service.notification('Error while fetching the data')
          this.modalService.dismissAll()
        })
    }
  }

  RAViolationsModal(modal: any) {
    this.modalService.open(modal, { size: 'xl', scrollable: true })

    var table = document.getElementById('dataTableRA')
    table.classList.add('loading')

    this.dataFetchStatus = 'init'

    if (this.isDatewise) {
      this.service.DatewiseRAViolationsDetails(this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss'), this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss')).subscribe((datewiseRAViolDetails: any) => {
        
        if (datewiseRAViolDetails.success) {
          table.classList.remove('loading')
          this.RAViolations = datewiseRAViolDetails.message
          
        } else {
          table.classList.remove('loading')
          this.dataFetchStatus ='success'
          this.service.notification(datewiseRAViolDetails.message)
        }
      }, Err => {
        table.classList.remove('loading')
        this.dataFetchStatus ='Error'
        this.service.notification('Error while fetching the data')
        this.modalService.dismissAll()
      })
    }

    else {
      this.service.RAViolationsDetails().subscribe((RAViolDetails: any) => {

        if (RAViolDetails.success) {
          table.classList.remove('loading')
          this.RAViolations = RAViolDetails.message
        }
        else {
          table.classList.remove('loading')
          this.dataFetchStatus = 'success'
          this.service.notification(RAViolDetails.message)
        }
      }, Err => {
        table.classList.remove('loading')
        this.dataFetchStatus = 'Error'
        this.service.notification('Error while fetching the data')
        this.modalService.dismissAll()
      })
    }

  }


  PPEViolationsModal(modal: any) {
    this.modalService.open(modal, { size: 'xl', scrollable: true })

    var table = document.getElementById('dataTablePPE')
    table.classList.add('loading')

    this.dataFetchStatus = 'init'

    if (this.isDatewise) {
      this.service.DatewisePPEViolationsDetails(this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss'), this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss'))
        .subscribe((datewisePPEViolDetails: any) => {
          
          if (datewisePPEViolDetails.success) {
            table.classList.remove('loading')
            this.PPEViolations = datewisePPEViolDetails.message
          }
          else {
            table.classList.remove('loading')
            this.dataFetchStatus = 'success'
            this.service.notification(datewisePPEViolDetails.message)
          }
        }, Err => {
          table.classList.remove('loading')
          this.dataFetchStatus = 'Error'
          this.service.notification('Error while fetching the data')
          this.modalService.dismissAll()
        })
    }
    else {
      this.service.PPEViolationsDetails().subscribe((PPEViolDetails: any) => {

        if (PPEViolDetails.success) {
          table.classList.remove('loading')
          this.PPEViolations = PPEViolDetails.message
        } else {
          table.classList.remove('loading')
          this.dataFetchStatus = 'success'
          this.service.notification(PPEViolDetails.message)
        }
      }, Err => {
        table.classList.remove('loading')
        this.dataFetchStatus='Error'
        this.service.notification('Error while fetching the data')
        this.modalService.dismissAll()
      })
    }

  }


  CCViolationsModal(modal: any) {
    this.modalService.open(modal, { size: 'xl', scrollable: true })

    var table = document.getElementById('dataTableCC')
    table.classList.add('loading')

    this.dataFetchStatus = 'init'

    if (this.isDatewise) {
      this.service.DatewiseCCViolationsDetails(this.selectedMoments.startDate.format('YYYY-MM-DD HH:mm:ss'), this.selectedMoments.endDate.format('YYYY-MM-DD HH:mm:ss'))
      .subscribe((datewiseCCVoilDetails: any) => {
          
          if (datewiseCCVoilDetails.success) {
            table.classList.remove('loading')
            this.CCViolations = datewiseCCVoilDetails.message
          }
          else {
            table.classList.remove('loading')
            this.dataFetchStatus = 'success'
            this.service.notification(datewiseCCVoilDetails.message)
          }
        }, Err => {
          table.classList.remove('loading')
          this.dataFetchStatus = 'Error'
          this.service.notification('Error while fetching the data', 'Retry')
          this.modalService.dismissAll()
        })
    }
    else {
      this.service.CCViolationsDetails().subscribe((CCViolDetails: any) => {
        
        if (CCViolDetails.success) {
          table.classList.remove('loading')
          this.CCViolations = CCViolDetails.message
        } else {
          table.classList.remove('loading')
          this.dataFetchStatus = 'success'
          this.service.notification(CCViolDetails.message)
        }
      }, Err => {
        table.classList.remove('loading')
        this.dataFetchStatus = 'Error'
        this.service.notification('Error while fetching the data', 'Retry')
        this.modalService.dismissAll()
      })
    }
  }

  OpenCameraImage(img:any){
    var tempImgs :any=[]
    var  temp = {
      src: this.IP + '/get_roi_image/' + img,
      thumb: this.IP + '/get_roi_image/' + img,
      caption: img,
    }
    tempImgs.push(temp)
    this._lightbox.open(tempImgs,0)
  }


  ngOnDestroy(): void {
    this.modalService.dismissAll()
    clearInterval(this.camerasStatusAndViolationsInterval)
    clearInterval(this.camerasLicenseDetailsInterval)
  }
}
