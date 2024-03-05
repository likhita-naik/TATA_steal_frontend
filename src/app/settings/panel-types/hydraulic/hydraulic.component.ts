import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { ServerService } from 'src/app/Services/server.service';
declare const  fabric:any
@Component({
  selector: 'app-hydraulic',
  templateUrl: './hydraulic.component.html',
  styleUrls: ['./hydraulic.component.css']
})
export class HydraulicComponent implements OnInit,OnDestroy,AfterViewInit {
  IP:any=''
  ID:any=''
  canvas:any
  currentArea:any=''
  currentPlant:any = ''
  currentParams?:any
  isPanelData:any
  hydro_key_id:number=0
  isPolygonDrawn:boolean=false
  selectedId:any
  hydroPanel: any
  @ViewChild('deleteModal', { static: false }) deleteModal: TemplateRef<any>
  loader1:boolean=false
  newPanelPoints:any[]=[]
  PanelData:any
  allPanelData:any[]=[]
  imageName:any
  currentData:any=null
  tempPanelID:FormControl=new FormControl('',Validators.required)
  hydrolicROIData: any[] = []
  selectedEditId:number
  unallocatedJobStatus:boolean=false
  PanelDataObservable:Observable<any[]>=of([])
jobType:any=''
  isHydrolic:boolean=false
  isHydroDraw:boolean=false
  hydroRoiName: FormControl = new FormControl('', Validators.required)
  polygonOptions: any = {
    fill: 'rgba(0,0, 0,0)',
    strokeWidth: 2,
    stroke: 'rgb(127, 255, 0)',
    scaleX: 1,
    scaleY: 1,
    hoverCursor: 'crosshair',

    objectCaching: false,
    selectable: false,
    transparentCorners: false,
    cornerColor: 'blue'
  }
  polygonOptions2: any = {
    fill: 'rgba(0,0,0,0)',
    strokeWidth: 2,
    stroke: 'rgba(15, 227, 242)',
    scaleX: 1,
    scaleY: 1,
    hoverCursor: 'crosshair',
    objectCaching: false,
    selectable: false,
    transparentCorners: false,
    cornerColor: 'blue',
  }
  @ViewChild('hydroNameModal', { static: false }) hydroNameModal: TemplateRef<any>
  //ROITypes: any[] = [{ label: '+ Add ROI', items: [{ label: 'Hydraulic', command: (onclick: any) => { console.log(onclick), this.AddNewHydroRoi(); } }, { label: 'Pneumatic', command: (onclick: any) => { console.log(onclick), this.AddNewPnueRoi(); } }, { label: 'Conveyor', command: (onclick: any) => { console.log(onclick), this.AddNewConveyor(); } },] }]
  selectedROIType: any
  constructor(public modalService:NgbModal,
    private ActiveRoute: ActivatedRoute,
    private server: ServerService,
    private router: Router,){
      this.IP=this.server.IP
      this.ActiveRoute.queryParams.subscribe((params: any) => {
this.currentParams=params
    this.ID= params.id
        this.currentData=params
        this.imageName = params.image_name
        this.currentArea = params.area
        this.currentPlant = params.plant
        this.jobType = params.type
      })
        if (this.currentParams.isNewJob == 'false') {
          this.server.GetPanelCameraData(this.ID, this.imageName).subscribe((response: any) => {
            console.log(response.message.data)
  
            if (response.success) {
              this.PanelData = response.message.data
              this.currentData=response.message

              console.log(this.imageName)
              this.PanelDataObservable = of(response.message)
              this.isPanelData = true
              if (Object.keys(this.PanelData).length!==0) {
                
  
                  this.DrawExistHydroPanels()
                
  
               
              }
          
              // }
              console.log(this.PanelData)
             
            }
            else {
              this.PanelData = {
  
              }
              this.PanelData.panel_data = []
  
              this.server.notification(response.message, 'Retry')
            }
          },
  
            Err => {
              this.server.notification("Error while fetching the data", "Retry")
            })
  
  
        }
        //if the case of  new job is adding
        else {
         // this.unallocatedJobStatus = true
  
          this.server.GetNewJobData(this.ID, this.imageName).subscribe((response: any) => {
            console.log(response.message)
  
            if (response.success) {
              this.PanelData = response.message.data
       this.currentData=response.message
              console.log(this.imageName)
              this.PanelDataObservable = of(response.message)
              this.isPanelData = true
              if (Object.keys(this.PanelData).length!==0) {
               
  
                if (this.jobType.toLowerCase() == 'hydraulic') {
                  this.DrawExistHydroPanels()
                }
  
                
              }
            
            }
            else {
              this.PanelData = {
  
              }
              this.PanelData.panel_data = []
  
              this.server.notification(response.message, 'Retry')
            }
          },
  
            Err => {
              this.server.notification("Error while fetching the data", "Retry")
            })
  
  
  
        }

  }
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.canvasSetup()
    this.canvas.on('mouse:up', (options: any) => {

      if (options.button === 1) {
        if (!((options.transform == null ? false : options.transform.action === 'modifyPolygon' ? false : true)) ) {
          console.log('polygon  is 1creating')
         
          if ((this.isHydroDraw)) {
            this.isHydroDraw = false
            this.PanelName()
          }
        }
      }
    })
    this.canvas.on('mouse:down', (event: any) => {
      console.log(event)
      if (event.button === 1) {
    
      //  this.CreateRectangle(event)
      
      if (this.isHydrolic) {
        this.HydroPanelOnMouseDown(event.e)
      }
      
     
      }})

    this.canvas.on('mouse:move', (options: any) => {
      //  this.createRect2(options)
      this.HydroPanelOnMouseMove(options.e)
    })

  }
  HydroPanelOnMouseDown(e: any) {
    if (this.isHydroDraw) {
      // started = true;
      var x = e.layerX;
      var y = e.layerY;

      this.hydroPanel = new fabric.Rect({
        width: 0,
        height: 0,
        left: x,
        top: y,
        stroke: 'yellow',
        strokeWidth: 3,
        selectable: false,
        objectCaching:false,
        fill: null,
      }, this.polygonOptions);
      console.log(this.hydroPanel)
      this.canvas.add(this.hydroPanel);
      this.canvas.setActiveObject(this.hydroPanel);

    }
  }

  HydroPanelOnMouseMove(e: any) {
    if (this.isHydroDraw) {
      if (this.canvas.getActiveObject()) {
        var w = Math.abs(e.layerX - this.hydroPanel.left),
          h = Math.abs(e.layerY - this.hydroPanel.top);

        if (!w || !h) {
          false;
        }

        //var square = canvas.getActiveObject(); 
        this.hydroPanel.set('width', w).set('height', h);
        this.canvas.renderAll()
      }
    }
  }
  AddNewHydroRoi() {
    this.polygonOptions.stroke = 'rgb(252, 176, 55)'
    // this.newPanel.stroke = 'rgb(252, 176, 55)'
   
    this.isHydrolic = true
    this.isHydroDraw = true
  } 

  SaveEditedChanges() {
    console.log(this.canvas.getObjects())
    console.log(this.allPanelData[this.selectedEditId].panel_id)
    this.allPanelData[this.selectedEditId].roi_data.panel_id
    this.allPanelData[this.selectedEditId].panel_id
    if (this.allPanelData[this.selectedEditId].panel_id == 'NA') {
     // this.AlterPanelName(this.selectedEditId)
    }
    else {
     // this.SaveEditedPanel()
    }
  }


  PanelName() {
 
      this.isPolygonDrawn = true
      // this.isHydrolic = false
      this.modalService.open(this.hydroNameModal, { size: 'small', centered: true, backdrop: 'static' }).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
        this.hydroRoiName.setValue('')
        this.hydroRoiName.updateValueAndValidity()
        this.hydroRoiName.markAsUntouched()
        //this.panelNameControl.
        this.DeleteNewPanel()
      
        this.isHydrolic = false
      }, (reason) => {
        this.isHydrolic = false
        this.hydroRoiName.markAsUntouched()
       
      });
  }
  onChange(event: any) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.unallocatedJobStatus = true
    }
    else {
      this.unallocatedJobStatus = false

    }
  }

 OnAddingHydroPanel() {
    this.modalService.dismissAll()
    this.isHydrolic = false
    var temp: any
    var cords = this.hydroPanel.aCoords
    var pointsString: any = ''
    var tempCanvas = new fabric.Rect({
      width: this.hydroPanel.width,
      height: this.hydroPanel.height,
      left: this.hydroPanel.left,
      top: this.hydroPanel.top,
      fill: null,
      stroke: 'yellow',
      strokeWidth: 3,
      selectable: false,
    })

    var text = new fabric.Text(this.hydroRoiName.value, {
      fontSize: 20,
      backgroundColor: 'black',
      left: tempCanvas.left,
      top: tempCanvas.top - 17,
      fill: 'yellow',
      stroke: 'yellow',
      selectabe:false
    })
    this.canvas.add(text)
    this.canvas.remove(this.hydroPanel),
      this.canvas.add(tempCanvas)
    this.canvas.renderAll()
    pointsString = cords.tl.x.toString() + ';' + cords.tl.y.toString() + ';' + cords.tr.x.toString() + ';' + cords.tr.y.toString() + ';' + cords.br.x.toString() + ';' + cords.br.y.toString() + ';' + cords.bl.x.toString() + ';' + cords.bl.y.toString()

    console.log(pointsString)
    temp = {
      roi_canvas: tempCanvas,
      roi_name_canvas: text,
      panel_id: this.hydroRoiName.value,
      points: pointsString,
      roi_data: { panel_id: this.hydroRoiName.value, isolation_status: null, flasher_status: null, panel_key_id: (++this.hydro_key_id), roi_data: { panel_no: this.hydroRoiName.value, bbox: pointsString, panel_key_id: (++this.hydro_key_id), unallocated_job_status: this.unallocatedJobStatus ? true : false } }

    }
    console.log(this.hydro_key_id)
    this.hydrolicROIData.push(temp)
    console.log(temp)
    this.hydroRoiName.setValue(null)
    this.hydroRoiName.updateValueAndValidity()
    this.hydroRoiName.reset()
    this.hydroRoiName.addValidators(Validators.required)
    this.SaveAddedHydroRoi()

  }
  SaveAddedHydroRoi() {
    var roiData: any[] = []

    var roi_points: any[] = []

    console.log(this.hydrolicROIData[this.hydrolicROIData.length - 1].roi_data)


    var rw_points: any[] = []

    roiData.push(this.hydrolicROIData[this.hydrolicROIData.length - 1].roi_data)


    console.log(this.selectedEditId)
    var data: any[] = []
    var cameraData = {
      id: this.ID,
      image_name: this.imageName,
      panel_id: this.hydrolicROIData[this.hydrolicROIData.length - 1].roi_data.panel_id,
      panel_key_id: this.hydrolicROIData[this.hydrolicROIData.length - 1].roi_data.roi_data.panel_key_id,
      roi_data: this.hydrolicROIData[this.hydrolicROIData.length - 1].roi_data.roi_data
    }
    data.push(cameraData)
    //

    console.log(data)
    var body = {
      data: cameraData
    }
    this.server.AddHydraulicROI(body).subscribe((response: any) => {
      console.log(response)
      if (response.success) {

        this.modalService.dismissAll()
        // setTimeout(() => {
        //   this.modalService.dismissAll()
        // }, 3000);
      }

      else {
        this.canvas.remove(this.hydrolicROIData[this.hydrolicROIData.length - 1].roi_canvas)
        this.canvas.remove(this.hydrolicROIData[this.hydrolicROIData.length - 1].roi_name_canvas)
        this.hydrolicROIData.splice((this.hydrolicROIData.length - 1), 1)
        this.hydro_key_id--;
      }

      this.server.notification(response.message)
    })



  }
 

  DrawExistHydroPanels() {
    console.log('drawing existing hydraulic rois')
    this.hydro_key_id=0
    if(this.PanelData.hydraulic_data){
    this.PanelData.hydraulic_data.forEach((data: any, i: number) => {
      console.log(data)
      var points = data.bbox.split(';')
      var ActualPoints: any[] = []
      // points.splice((points.length-1),1)
      points.forEach((element: any, index: number) => {
        points[index] = Number(element)
      });

      console.log(points)
      for (let i = 0; i < points.length; i = i + 2) {
        var tempPoint = {
          x: Number(points[i]),
          y: Number(points[i + 1])
        }
        ActualPoints.push(tempPoint)

        console.log(points[i], points[i + 1])
      }
      console.log(ActualPoints)

      var hydroROI = new fabric.Polygon(ActualPoints, {

        stroke: 'yellow',
        strokeWidth: 3,
        selectable: false,
        fill: null,
      })

      var text = new fabric.Text(data.panel_no, {
        fontSize: 20,
        // bottom:5
        backgroundColor: 'black',
        left: hydroROI.left,
        top: hydroROI.top - 17,
        stroke: 'yellow',
        fill: 'yellow',
        selectable:false
      });
      console.log(hydroROI)

      var tempObj = {
        roi_name_canvas: text,
        roi_canvas: hydroROI,
        panel_id: data.panel_no,
        roi_data: { panel_id: data.panel_no, panel_no: this.hydroRoiName.value, roi_data: { panel_no: data.panel_no, bbox: data.bbox, panel_key_id: data.panel_key_id, unallocated_job_status: data.unallocated_job_status } }

      }

      
      data.panel_key_id>this.hydro_key_id ? this.hydro_key_id = data.panel_key_id : ''
      console.log(this.hydro_key_id, "hydro key id")
      this.hydrolicROIData.push(tempObj)


      this.canvas.add(hydroROI)
      this.canvas.add(text)
          this.canvas.requestRenderAll()
    });
  }
  }

  canvasSetup() {
    var cContainer = document.getElementById('canvas-container')
    this.canvas = new fabric.Canvas('canvasROI', { fireRightClick: true })
    console.log(this.canvas)
    this.canvas.selection = false
    this.canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    this.canvas.setWidth(cContainer.clientWidth)
    // console.log(this.canvasContainer.clientx)
    // this.canvas.setWidth(img.width)
    this.SetCameraImageToCanvas()
  }
  SetCameraImageToCanvas(){
    fabric.Image.fromURL(this.IP + '/get_roi_image/' + this.imageName, (img: any) => {
      console.log(img.width)
      console.log(img.height)
      this.canvas.setWidth(img.width)
  
      //var newHeight= this.CalculateAspectRatio(img.width,img.height,cContainer.clientWidth)
      this.canvas.setHeight(img.height)
  
      this.canvas.setBackgroundImage(img, this.canvas.requestRenderAll.bind(this.canvas), {
        scaleX: this.canvas.width / img.width,
        scaleY: this.canvas.height / img.height
      });
  
    });
  }

  DeletePanel() {
    console.log(this.jobType, 'jobtype')
   
      this.DeleteHydraulicROI(this.selectedEditId)
    
  }

 DeleteNewPanel() {
  this.newPanelPoints.splice(0, this.newPanelPoints.length)
  this.canvas.remove(this.hydroPanel)
  this.canvas.renderAll()
} 
isDelete(id: number) {
  this.selectedEditId = id
  this.selectedId = id
  this.modalService.open(this.deleteModal)
}

RefetchCameraImage(){
  this.loader1=true
  this.server.FetchJobCameraImg(this.ID).subscribe((response:any)=>{
    if(response.success){
      this.loader1=false
       this.imageName=response.message.data.image_name
this.SetCameraImageToCanvas()
      this.router.navigate([],{relativeTo:this.ActiveRoute,queryParams:{image_name:this.imageName},queryParamsHandling:'merge'})
    }
    else{
      this.loader1=false
      this.server.notification(response.message)
    }
  },Err=>{
    this.loader1=false
  
       this.server.notification('Unable to load image from the server','Retry')

    
    
  })
}

  DeleteHydraulicROI(id: number) {
    this.selectedEditId = id
    this.selectedId = id
    var tempRoiCanvas = this.hydrolicROIData[id].roi_canvas
    var tempTextCanvas = this.hydrolicROIData[id].roi_name_canvas

    console.log(this.hydrolicROIData[this.selectedEditId].roi_data)
    // this.allPanelData.splice(id, 1)
    var body = {
      id: this.ID,
      panel_key_id: this.hydrolicROIData[this.selectedId].roi_data.roi_data.panel_key_id,
      imagename: this.imageName,

    }
    this.server.DeleteHydroRoi(body).subscribe((response: any) => {
      this.server.notification(response.message)
      if (response.success) {
        this.hydrolicROIData.splice(id, 1)
        this.canvas.remove(tempRoiCanvas)
        this.canvas.remove(tempTextCanvas)
        window.location.reload();

      }

    })
    console.log(body)

    this.canvas.renderAll()
    //need to integrate the delete hydraulic apis


    this.modalService.dismissAll()
  }
  Back() {
    //this.router.navigate(['app/jobsheetMoniter'])
    window.close()
  }
ngOnDestroy(): void {
  
}

}
