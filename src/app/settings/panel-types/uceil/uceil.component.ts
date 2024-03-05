import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { ServerService } from 'src/app/Services/server.service';

declare const fabric:any
interface polygonPoints{
  x:number,
  y:number
}
@Component({
  selector: 'app-uceil',
  templateUrl: './uceil.component.html',
  styleUrls: ['./uceil.component.css']
})
export class UceilComponent {
  PanelData: any = {}
  PanelDataObservable: Observable<any> = of({})
  ID: string
  IP: string
  currentData:any
  isPanelData: boolean = false
  canvas: any
  PanelsRoiPoints: any[] = []
  newPanelPoints: polygonPoints[] = []
  imageName: string
  isAddPanel: boolean = false
  newPt: any
  newPanel: any
  isChanges: boolean = false
  isPolygonDrawn: boolean = false
  isEdit: boolean = false
  isLock1: boolean = false
  isTag: boolean = false
  isLock2: boolean = false
  isRackWindow: boolean = false
  AllPanels: {}[] = []
  selectedEditId: any
  rectangle: any
  isDeleteRW: boolean = false
  tempData: any[] = []
  allPanelData: any[] = []
  isEditText: boolean = false
  selectedId: number
  tempRectPoints:any[]=[]
  tempPanelID: FormControl = new FormControl('', Validators.required)
  currentArea: any
  currentPlant: any
  rwCount: number = 0
  panel_key_id: number = 0
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
  isEditPanel:boolean=false
  iseditRW:boolean=false
  isLoading: boolean = false
  newRw: any
  newRWPoints: polygonPoints[] = []
  isAddRW: boolean = false
  selectedPanelforRW: number
  unallocatedJobStatus: boolean = false
jobType :any

  panelNameControl: FormControl = new FormControl('', Validators.required)
  @ViewChild('panelNameChangeModal', { static: false }) panelChangeModal: TemplateRef<any>
  @ViewChild('panelNameModal', { static: false }) panelNameModal: TemplateRef<any>
  @ViewChild('roiType', { static: false }) roiType: TemplateRef<any>
  @ViewChild('alertRW', { static: false }) RWAlert: TemplateRef<any>
  @ViewChild('deleteModal', { static: false }) deleteModal: TemplateRef<any>

  constructor(
    private ActiveRoute: ActivatedRoute,
    private server: ServerService,
    private router: Router,
    private modalService: NgbModal) {
      this.IP = server.IP

      this.ActiveRoute.queryParams.subscribe((params: any) => {
        console.log(params)
        this.ID = params.id
        this.imageName = params.image_name
        this.currentArea = params.area
        this.currentPlant = params.plant
        this.jobType = params.type

        if (params.isNewJob == 'false') {
          this.server.GetPanelCameraData(this.ID, this.imageName).subscribe((response: any) => {
            console.log(response.message)
           this.currentData=response.message
            if (response.success) {
              this.PanelData = response.message
  
              console.log(this.imageName)
              this.PanelDataObservable = of(response.message)
              this.isPanelData = true
              if (Object.keys(this.PanelData).length) {
                  this.GetPanelPoints()
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
  
            (Err:any) => {
              this.server.notification("Error while fetching the data", "Retry")
            })
  
  
        }
        //if the case of  new job is adding
        else {
          this.unallocatedJobStatus = true
  
          this.server.GetNewJobData(this.ID, this.imageName).subscribe((response: any) => {
            console.log(response.message)
            this.currentData=response.message

            if (response.success) {
              this.PanelData = response.message.data
  
              console.log(this.imageName)
              this.PanelDataObservable = of(response.message)
              this.isPanelData = true
              if (this.PanelData.length > 0) {
                  this.GetPanelPoints()
                
              }
            
              console.log(this.PanelData)
           
            }
            else {
              this.PanelData = {
  
              }
              this.PanelData.panel_data = []
  
              this.server.notification(response.message, 'Retry')
            }
          },
  
           ( Err:any) => {
              this.server.notification("Error while fetching the data", "Retry")
            })
  
  
  
        }
      }
  
      )
      
}
ngAfterViewInit(): void {
  this.canvasSetup()
  this.makeNewPanel()
  this.makeNewRW()
  this.canvas.on('mouse:up', (options: any) => {

    if (options.button === 1) {
      if (!((options.transform == null ? false : options.transform.action === 'modifyPolygon' ? false : true)) && !this.isEdit
      ) {
        console.log('polygon  is 1creating')
        if (this.isAddPanel) {
          console.log('panel cords')

          this.getClickCoords(options.e);
        }
        
       

      }
    }
    if (options.button === 3) {
      if (this.isAddPanel ) {
        if (this.newPanelPoints.length < 4) {
          console.log('polygon is  3creating')
          this.isPolygonDrawn = false;
        } else {
          console.log('polygon is  3creating')
          this.isPolygonDrawn = true;
        }
      }
      if (this.isAddRW) {
        if (this.newRWPoints.length < 4) {
          console.log('polygon is  3creating')
          this.isPolygonDrawn = false;
        } else {
          console.log('polygon is  3creating')
          this.isPolygonDrawn = true;
        }
      }
    }

  });

  this.canvas.on('mouse:down', (event: any) => {
    console.log(event)
    if (event.button === 1) {
      if (!((event.transform == null ? false : event.transform.action === 'modifyPolygon' ? false : true)) && !this.isEdit
      ) {
        console.log('polygon  is 1creating')
      
      }
    }
    //  this.CreateRectangle(event)
    if (this.isAddPanel ) {
      if (event.button === 3) {
        if (this.newPanelPoints.length < 3) {
          this.isPolygonDrawn = false;
        } else {
          //this.makePolygon();
          // this.OnAddingNewPanel()
          this.PanelName()

          this.isPolygonDrawn = true;

        }

      }
    }
   
    if (this.isAddRW) {
      if (event.button === 3) {
        if (this.newRWPoints.length < 3) {
          this.isPolygonDrawn = false;
        } else {
          //this.makePolygon();
          // this.OnAddingNewPanel()
          //this.PanelName() if(this.isAddRW){
          console.log('rw is created')
          this.OnAddingNewRw()

          this.isPolygonDrawn = true;

        }


      }
    }
    else {
      if ((event.transform == null ? true : event.transform.action === 'drag' ? false : true)) {
      }
    }
  })

}


PanelName() {
  if (this.isAddPanel) {
    this.isPolygonDrawn = true
    this.isAddPanel = false
    this.modalService.open(this.panelNameModal, { size: 'small', centered: true, backdrop: 'static' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      this.panelNameControl.setValue('')
      this.panelNameControl.updateValueAndValidity()
      this.panelNameControl.markAsUntouched()
      //this.panelNameControl.
      this.DeleteNewPanel()
      // this.OnAddingNewPanel()
      // this.download = '',
      //   this.isalert = false
    }, (reason) => {
      this.panelNameControl.markAsUntouched()
    
    });
  }
}

Confirm() {
  if (this.isAddPanel) {
    this.OnAddingNewPanel()
  }

 
}

SaveChanges() {
  console.log(this.isLoading = true)


  console.log(this.allPanelData)
  var roiData: any[] = []
  this.PanelData.forEach((element: any, id: number) => {
    roiData.push({ ...element.roi_data, panel_key_id: id + 1 })


  });
  console.log(roiData)
  var cameraData = {
    id: this.ID,
    //  ai_solutions:['RA'],
    imagename: this.imageName,
    roi_data: roiData
  }


  console.log(cameraData)
  this.server.AddROI(cameraData).subscribe((response: any) => {
    console.log(response)
    this.isLoading = false
    if (response.success) {

    }
  })


}



DeleteNewPanel() {
  this.newPanelPoints.splice(0, this.newPanelPoints.length)
  this.newRWPoints.splice(0, this.newRWPoints.length)
  this.canvas.renderAll()
}



OnAddingNewPanel() {
    this.isAddPanel = false
    var exist = false
    console.log(this.panelNameControl.value)
    console.log(this.allPanelData)
    this.allPanelData.forEach((data: any) => {
      console.log(data)
      if (data.panel_id == this.panelNameControl.value) {
        exist = true

      }
    })
    console.log(exist)
    if (!exist) {
      fabric.util.resetObjectTransform(this.newPanel)
      var roi_points: any[] = []
      const tempPoints = [...this.newPanelPoints]
      console.log(tempPoints)
      var dimensions = this.newPanel._calcDimensions()
      const currentPanel = new fabric.Polygon(tempPoints, this.polygonOptions)
      //this.modalService.open(this.panelNameModal,{size:'small',centered:true})
      var panelName = this.panelNameControl.value
      if (panelName != null) {
        console.log(panelName)
        this.canvas.add(currentPanel)
        this.canvas.renderAll()
        console.log(this.newPanel)
        for (let i = 0; i < this.newPanelPoints.length; i++) {

          let tempX = (this.newPanelPoints[i].x)

          let tempY = (this.newPanelPoints[i].y)
          roi_points.push(`${tempX};${tempY};`)
        }
        //to remove the ,
        var comma = /,/g
        var roiPointsString = roi_points.toString().replace(comma, '')
        console.log(roiPointsString)
        var panelNameObject = new fabric.Text(panelName, {
          fontSize: 20,
          // bottom:5
          backgroundColor: 'black',

          left: dimensions.left,
          top: dimensions.top,
          stroke: 'rgb(127, 255, 0)',
          fill: 'rgb(127, 255, 0)',
        });
        console.log(panelNameObject)
        this.canvas.add(panelNameObject)
        this.canvas.renderAll()
      
        var tempObj: any = {
          panel_name_canvas: panelNameObject,
          roi_canvas: currentPanel,
          panel_id: panelName,
          rw: [],
          roi_data: { panel_id: panelName, panel_status: false, isolation_status: null, flasher_status: null, roi_data: { panel_no: panelName, bbox: roiPointsString, panel_key_id: (++this.panel_key_id), RW: [], unallocated_job_status: this.unallocatedJobStatus ? true : false } }
        }
        console.log(tempObj.roi_data)
        this.PanelData.panel_data.push(tempObj.roi_data)

        this.allPanelData.push(tempObj)

        console.log(this.allPanelData.length)
        this.newPanelPoints.splice(0, this.newPanelPoints.length)
        this.panelNameControl.setValue(null)
        this.panelNameControl.updateValueAndValidity()
        this.panelNameControl.markAsUntouched()
        this.panelNameControl.reset()
        this.panelNameControl.addValidators(Validators.required)

        // this.selectedEditId = this.allPanelData.length - 1
        console.log(this.selectedEditId)
        this.SaveAddedPanel()
      }
      else {
        //this.newPanelPoints.splice(0, this.newPanelPoints.length)
        this.DeleteNewPanel()
        this.isPolygonDrawn = false

      }
    }
    else {
      this.server.notification('Job for that panel already exist')
      this.DeleteNewPanel()
      this.isPolygonDrawn = false
    }
  

  //hydrolic roi

  

}

OnAddingNewRw() {
  this.isAddPanel = false
  this.isAddRW = false
  this.isChanges = true
  console.log('rw added')
  fabric.util.resetObjectTransform(this.newRw)
  var rw_points: any[] = []
  const tempPoints = [...this.newRWPoints]
  console.log(tempPoints)
  // var tempRoiCanvas = this.allPanelData[this.selectedPanelforRW].rw_canvas
  // this.canvas.remove(tempRoiCanvas)
  var dimensions = this.newRw._calcDimensions()
  const currentRw = new fabric.Polygon(tempPoints, this.polygonOptions2)
  //this.modalService.open(this.panelNameModal,{size:'small',centered:true})
  var panelName = this.panelNameControl.value
  if (true) {
    console.log(panelName)
    this.canvas.add(currentRw)
    this.canvas.renderAll()
    console.log(this.newPanel)
    for (let i = 0; i < this.newRWPoints.length; i++) {

      let tempX = (this.newRWPoints[i].x)

      let tempY = (this.newRWPoints[i].y)
      rw_points.push(`${tempX};${tempY};`)
    }
    //to remove the ,
    var comma = /,/g
    var rwPointsString = rw_points.toString().replace(comma, '')
    console.log(rwPointsString)
    

    this.PanelData.panel_data[this.selectedPanelforRW].roi_data.RW = rwPointsString

    this.allPanelData[this.selectedPanelforRW].rw_canvas = currentRw

    console.log(this.allPanelData.length)
    this.newRWPoints.splice(0, this.newRWPoints.length)
    this.panelNameControl.setValue(null)
    this.selectedEditId = this.selectedPanelforRW
    console.log(this.selectedEditId)
    this.SaveEditedChanges()
    //this.SaveEditedPanel()
  }
  else {
    //this.newPanelPoints.splice(0, this.newPanelPoints.length)
    this.DeleteNewPanel()
    this.isPolygonDrawn = false

  }

}
nameSubmit() {
  this.modalService.dismissAll()
  this.OnAddingNewPanel()
}

AddNewPanel() {
  this.polygonOptions.stroke = 'rgb(127, 255, 0)'
  this.newPanel.stroke = 'rgb(127, 255, 0)'
  this.newPanelPoints.splice(0, this.newPanelPoints.length)
  this.isAddPanel = true
  this.isEdit = false

}


SaveEditedChanges() {

  this.allPanelData[this.selectedEditId].roi_data.panel_id
  this.allPanelData[this.selectedEditId].panel_id
  if (this.allPanelData[this.selectedEditId].panel_id == 'NA') {
    this.AlterPanelName(this.selectedEditId)
  }
  else {
    this.SaveEditedPanel()
  }
}
public Edit(i: number) {
  this.isEditPanel = true
  this.selectedEditId = i
  this.isAddPanel = false
  var canvasObject = this.allPanelData[i].roi_canvas
  this.isEdit = true
  if (this.isEdit) {

    //var polygonPositionHandler=
    var anchorWrapper = (anchorIndex: any, fn: any) => {
      return (eventData: any, transform: any, x: any, y: any) => {
        this.isEditPanel = true
        var fabricObject = transform.target,

          absolutePoint = fabric.util.transformPoint(
            new fabric.Point(
              fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
              fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y
            ),
            fabricObject.calcTransformMatrix()
          ),
          actionPerformed = fn(eventData, transform, x, y),
          newDim = fabricObject._setPositionDimensions({}),
          polygonBaseSize = fabricObject._getNonTransformedDimensions(),
          newX =
            (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) /
            polygonBaseSize.x,
          newY =
            (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) /
            polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        return actionPerformed;
      };
    }
    var actionHandler = (eventData: any, transform: any, x: number, y: number) => {
      console.log(eventData)
      this.isEditPanel = true
      var polygon = transform.target,
        currentControl = polygon.controls[polygon.__corner],
        mouseLocalPosition = polygon.toLocalPoint(
          new fabric.Point(x, y),
          'center',
          'center'
        ),
        polygonBaseSize = polygon._getNonTransformedDimensions(),
        size = polygon._getTransformedDimensions(0, 0),
        finalPointPosition = {
          x:
            (mouseLocalPosition.x * polygonBaseSize.x) / size.x +
            polygon.pathOffset.x,
          y:
            (mouseLocalPosition.y * polygonBaseSize.y) / size.y +
            polygon.pathOffset.y
        };
      polygon.points[currentControl.pointIndex] = finalPointPosition;
      console.log(polygon.points)
      return true;
    }

    let poly = canvasObject
    console.log(poly)
    this.canvas.setActiveObject(canvasObject);
    poly = this.canvas.getActiveObject()
    console.log(poly)
    // poly.edit = !poly.edit;
    if (true) {
      console.log('poly first')
      let lastControl = poly.points.length - 1;
      poly.cornerStyle = 'circle';
      poly.cornerColor = 'rgba(0,0,255,0.5)';
    
      this.isEditPanel = true
      this.allPanelData[i].roi_canvas.controls = poly.points.reduce((acc: any, point: number, index: number) => {
        // this.pointIndex=index
        // console.log(this.pointIndex)
        acc['p' + index] = new fabric['Control']({
          pointIndex: index,
          positionHandler: (dim: any, finalMatrix: any, fabricObject: any) => {
            console.log(dim)
            console.log(finalMatrix)
            console.log(fabricObject)
            // fabricObject.points=points
            console.log(fabricObject)
          
            let x =
              fabricObject.points[index].x - fabricObject.pathOffset.x,
              y = fabricObject.points[index].y - fabricObject.pathOffset.y;
            return fabric.util.transformPoint(
              new fabric.Point(x, y),
              fabric.util.multiplyTransformMatrices(
                fabricObject.canvas.viewportTransform,
                fabricObject.calcTransformMatrix()
              )
            );
          },
          actionHandler: anchorWrapper(
            index > 0 ? index - 1 : lastControl,
            actionHandler
          ),
          actionName: 'modifyPolygon'
        });
        console.log(acc)
        return acc;
      }, {});
    }
    console.log(new fabric['Control'])
    // poly.hasBorders = !poly.edit;
    this.canvas.renderAll();
  }
}

EditRW(i: number) {
  this.SaveChanges()
  this.canvas.requestRenderAllBound()
  this.selectedPanelforRW = i
  this.selectedEditId = i
  this.isEdit = true
  this.isEditPanel = false
  this.isDeleteRW = false
  console.log(this.allPanelData[this.selectedPanelforRW].roi_canvas, 'rw canvas')
  // this.allPanelData[this.selectedPanelforRW].roi_canvas.selectable=false
  this.allPanelData[this.selectedPanelforRW].rw_canvas.selectable = true
  this.allPanelData[this.selectedPanelforRW].rw_canvas.selectionFullyContained = true
}

public EditRect(i: number) {
  this.selectedPanelforRW = i
  this.selectedEditId = i

  var canvasObject = this.allPanelData[i].rw_canvas
  this.isEdit = true
  if (this.isEdit) {

    //var polygonPositionHandler=
    var anchorWrapper = (anchorIndex: any, fn: any) => {
      return (eventData: any, transform: any, x: any, y: any) => {
        var fabricObject = transform.target,
          absolutePoint = fabric.util.transformPoint(
            new fabric.Point(
              fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
              fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y
            ),
            fabricObject.calcTransformMatrix()
          ),
          actionPerformed = fn(eventData, transform, x, y),
          newDim = fabricObject._setPositionDimensions({}),
          polygonBaseSize = fabricObject._getNonTransformedDimensions(),
          newX =
            (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) /
            polygonBaseSize.x,
          newY =
            (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) /
            polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        return actionPerformed;
      };
    }
    var actionHandler = (eventData: any, transform: any, x: number, y: number) => {
      console.log(eventData)
      var polygon = transform.target,
        currentControl = polygon.controls[polygon.__corner],
        mouseLocalPosition = polygon.toLocalPoint(
          new fabric.Point(x, y),
          'center',
          'center'
        ),
        polygonBaseSize = polygon._getNonTransformedDimensions(),
        size = polygon._getTransformedDimensions(0, 0),
        finalPointPosition = {
          x:
            (mouseLocalPosition.x * polygonBaseSize.x) / size.x +
            polygon.pathOffset.x,
          y:
            (mouseLocalPosition.y * polygonBaseSize.y) / size.y +
            polygon.pathOffset.y
        };
      polygon.points[currentControl.pointIndex] = finalPointPosition;
      console.log(polygon.points)
      return true;
    }

    let poly = canvasObject
    console.log(poly)
    this.canvas.setActiveObject(canvasObject);
    poly = this.canvas.getActiveObject()
    console.log(poly)
    // poly.edit = !poly.edit;
    if (true) {
      console.log('poly first')
      let lastControl = poly.points.length - 1;
      poly.cornerStyle = 'circle';
      poly.cornerColor = 'rgba(0,0,255,0.5)';
      this.allPanelData[i].roi_canvas.controls = poly.points.reduce((acc: any, point: number, index: number) => {
        // this.pointIndex=index
        // console.log(this.pointIndex)
        acc['p' + index] = new fabric['Control']({
          pointIndex: index,
          positionHandler: (dim: any, finalMatrix: any, fabricObject: any) => {
            console.log(dim)
            console.log(finalMatrix)
            console.log(fabricObject)
            // fabricObject.points=points
            console.log(fabricObject)
            let x =
              fabricObject.points[index].x - fabricObject.pathOffset.x,
              y = fabricObject.points[index].y - fabricObject.pathOffset.y;
            return fabric.util.transformPoint(
              new fabric.Point(x, y),
              fabric.util.multiplyTransformMatrices(
                fabricObject.canvas.viewportTransform,
                fabricObject.calcTransformMatrix()
              )
            );
          },
          actionHandler: anchorWrapper(
            index > 0 ? index - 1 : lastControl,
            actionHandler
          ),
          actionName: 'modifyPolygon'
        });
        console.log(acc)
        return acc;
      }, {});
    }
    console.log(new fabric['Control'])
    // poly.hasBorders = !poly.edit;
    this.canvas.renderAll();
  }
}


SaveEditedPanel() {
  this.allPanelData[this.selectedEditId].roi_data.panel_id
  //this.AlterPanelName(this.selectedEditId)
  console.log('save edited function')
  var roiData: any[] = []
 
  var roi_points: any[] = []
  // this.allPanelData[this.selectedEditId].rw_canvas.calcCoords()
  // roiData.push(this.allCameraData[this.selectedEditId].roi_data)
  this.allPanelData[this.selectedEditId].rw_canvas != null ? fabric.util.resetObjectTransform(this.allPanelData[this.selectedEditId].rw_canvas) : ''
  var dimensions = this.allPanelData[this.selectedEditId].rw_canvas != null ? this.allPanelData[this.selectedEditId].rw_canvas._calcDimensions() : ''
  console.log(dimensions)
  for (let i = 0; i < this.allPanelData[this.selectedEditId].roi_canvas.points.length; i++) {
    console.log(this.allPanelData[this.selectedEditId].roi_canvas.points)
    var points = this.allPanelData[this.selectedEditId].roi_canvas.points
    let tempX = (Math.round(points[i].x))

    let tempY = (Math.round(points[i].y))
    roi_points.push(`${tempX};${tempY};`)
  }
  var comma = /,/g
  var roiPointsString = roi_points.toString().replace(comma, '')
  console.log(roiPointsString)
  console.log(this.allPanelData[this.selectedEditId].roi_data)
  this.allPanelData[this.selectedEditId].roi_data.bbox = roiPointsString
  this.PanelData.panel_data[this.selectedEditId].roi_data.bbox = roiPointsString

  var rw_points: any[] = []
  if (this.allPanelData[this.selectedEditId].rw_canvas != null) {
    if (this.iseditRW && (!this.isEditPanel) && !this.isDeleteRW) {
      console.log('editing  rack window')
      this.allPanelData[this.selectedPanelforRW].rw_canvas.points[0] = this.canvas._activeObject.aCoords.tl
      this.allPanelData[this.selectedPanelforRW].rw_canvas.points[1] = this.canvas._activeObject.aCoords.tr
      this.allPanelData[this.selectedPanelforRW].rw_canvas.points[2] = this.canvas._activeObject.aCoords.br
      this.allPanelData[this.selectedPanelforRW].rw_canvas.points[3] = this.canvas._activeObject.aCoords.bl
    }
    for (let i = 0; i < this.allPanelData[this.selectedEditId].rw_canvas.points.length; i++) {
      console.log(this.allPanelData[this.selectedEditId].rw_canvas.points)
      var points = this.allPanelData[this.selectedEditId].rw_canvas.points
      let tempX = (Math.round(points[i].x))

      let tempY = (Math.round(points[i].y))
      rw_points.push(`${tempX};${tempY};`)
    }
    //to remove the ,
    var comma = /,/g
    var rwPointsString = rw_points.toString().replace(comma, '')
    console.log(rwPointsString)
    console.log(this.allPanelData[this.selectedEditId].roi_data)
    this.allPanelData[this.selectedEditId].roi_data.RW = rwPointsString
    this.PanelData.panel_data[this.selectedEditId].roi_data.RW = rwPointsString

    console.log(this.allPanelData[this.selectedEditId].roi_data)
  }
  roiData.push(this.allPanelData[this.selectedEditId].roi_data)

  console.log(this.selectedEditId)
  console.log(this.allPanelData[this.selectedEditId].roi_data.roi_data.panel_key_id)
  var data: any[] = []
  var cameraData: any = {
    id: this.ID,
    image_name: this.imageName,
    flasher_status: null,
    isolation_status: null,

    panel_id: this.allPanelData[this.selectedEditId].roi_data.panel_id,
    panel_key_id: this.allPanelData[this.selectedEditId].roi_data.roi_data.panel_key_id,
    roi_data: this.allPanelData[this.selectedEditId].roi_data.roi_data
  }
  data.push(cameraData)
  //

  console.log(data)
  var body = {
    data: data
  }
  this.server.UpdatePanelRoi(body).subscribe((response: any) => {
    console.log(response)
    if (response.success) {
      // this.GetPanelPoints()
      // this.DrawExistPanels()
      window.location.reload();
      this.modalService.dismissAll()
    }

    this.server.notification(response.message)
  })

}
ChangePanelName() {
  this.PanelData.panel_data[this.selectedId].panel_id = this.tempPanelID.value
  this.allPanelData[this.selectedId].panel_id = this.tempPanelID.value

  console.log(this.PanelData.panel_data[this.selectedId].panel_id)
  this.PanelData.panel_data[this.selectedId].roi_data.panel_number = this.tempPanelID.value

  this.allPanelData[this.selectedId].panel_name_canvas.text = this.tempPanelID.value
  this.allPanelData[this.selectedId].panel_name_canvas.panel_id = this.tempPanelID.value

  this.canvas.renderAll()
  this.modalService.dismissAll()
  this.SaveEditedPanel()

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


AlterPanelName(id: number) {
  console.log(id)
  this.isEditText = !this.isEditText
  this.selectedId = id
  this.selectedEditId = id
  this.tempPanelID.setValue(this.PanelData.panel_data[id].panel_id)
  this.modalService.open(this.panelChangeModal, { size: 'small', animation: true, centered: true }).result.then((result) => {
    // this.closeResult = `Closed with: ${result}`;

    // this.OnAddingNewPanel()
    // this.download = '',
    //   this.isalert = false
  }, (reason) => {
    //  this.panelNameControl.setValue(null)
    //  this.OnAddingNewPanel()
    /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // this.download = '',
    //   this.isalert = false
  });


}


OnDeletePanel() {
 // this.AlterPanelName(this.selectedEditId)
  console.log('save edited function')
  var roiData: any[] = []
  //  this.allCameraData.forEach((element:any,id:number) => {
  // roiData.push({...element.roi_data,roi_id:id+1})


  //  })
  var roi_points: any[] = []
  // this.allPanelData[this.selectedEditId].rw_canvas.calcCoords()
  // roiData.push(this.allCameraData[this.selectedEditId].roi_data)
  this.allPanelData[this.selectedEditId].rw_canvas != null ? fabric.util.resetObjectTransform(this.allPanelData[this.selectedEditId].rw_canvas) : ''
  var dimensions = this.allPanelData[this.selectedEditId].rw_canvas != null ? this.allPanelData[this.selectedEditId].rw_canvas._calcDimensions() : ''
  console.log(dimensions)
  for (let i = 0; i < this.allPanelData[this.selectedEditId].roi_canvas.points.length; i++) {
    console.log(this.allPanelData[this.selectedEditId].roi_canvas.points)
    var points = this.allPanelData[this.selectedEditId].roi_canvas.points
    let tempX = (Math.round(points[i].x))

    let tempY = (Math.round(points[i].y))
    roi_points.push(`${tempX};${tempY};`)
  }
  var comma = /,/g
  var roiPointsString = roi_points.toString().replace(comma, '')
  console.log(roiPointsString)
  console.log(this.allPanelData[this.selectedEditId].roi_data)
  this.allPanelData[this.selectedEditId].roi_data.bbox = roiPointsString
  this.PanelData.panel_data[this.selectedEditId].roi_data.bbox = roiPointsString
  var data: any[] = []
  var cameraData: any = {
    id: this.ID,
    imagename: this.imageName,
    // flasher_status:null,
    // isolation_status:null,

    panel_no: this.allPanelData[this.selectedEditId].roi_data.panel_id,
    panel_key_id: this.allPanelData[this.selectedEditId].roi_data.roi_data.panel_key_id,
    // roi_data: this.allPanelData[this.selectedEditId].roi_data.roi_data
  }
  data.push(cameraData)
  //

  console.log(data)
  var body = {
    data: cameraData
  }

  this.server.DeleteJobPanel(cameraData).subscribe(
    (response: any) => {
      window.location.reload();

      console.log(response)
      if (response.success) {
        this.server.notification(response.message)
      }
      else {
        window.location.reload();

        this.server.notification(response.message)

      }
    },
   ( Err:any) => {
      this.server.notification('Something Went Wrong', 'Retry')
    }
  )
  console.log(body)
}
UnallocatedJobConfig(event: any, i: number) {
  this.selectedEditId = i;
  if (event.target.checked) {
    this.allPanelData[i].roi_data.roi_data.unallocated_job_status = true
  }
  else {
    this.allPanelData[i].roi_data.roi_data.unallocated_job_status = false

  }
  this.SaveEditedPanel()

}
SaveAddedPanel() {
  //this.AlterPanelName(this.selectedEditId)

  var roiData: any[] = []
  //  this.allCameraData.forEach((element:any,id:number) => {
  // roiData.push({...element.roi_data,roi_id:id+1})


  //  })
  var roi_points: any[] = []
  // this.allPanelData[this.selectedEditId].rw_canvas.calcCoords()
  // roiData.push(this.allCameraData[this.selectedEditId].roi_data)
  this.allPanelData[this.allPanelData.length - 1].rw_canvas != null ? fabric.util.resetObjectTransform(this.allPanelData[this.allPanelData.length - 1].rw_canvas) : ''
  var dimensions = this.allPanelData[this.allPanelData.length - 1].rw_canvas != null ? this.allPanelData[this.allPanelData.length - 1].rw_canvas._calcDimensions() : ''
  console.log(dimensions)
  for (let i = 0; i < this.allPanelData[this.allPanelData.length - 1].roi_canvas.points.length; i++) {
    console.log(this.allPanelData[this.allPanelData.length - 1].roi_canvas.points)
    var points = this.allPanelData[this.allPanelData.length - 1].roi_canvas.points
    let tempX = (Math.round(points[i].x))

    let tempY = (Math.round(points[i].y))
    roi_points.push(`${tempX};${tempY};`)
  }
  var comma = /,/g
  var roiPointsString = roi_points.toString().replace(comma, '')
  console.log(roiPointsString)
  console.log(this.allPanelData[this.allPanelData.length - 1].roi_data)
  this.allPanelData[this.allPanelData.length - 1].roi_data.bbox = roiPointsString
  this.PanelData.panel_data[this.allPanelData.length - 1].roi_data.bbox = roiPointsString

  var rw_points: any[] = []
  if (this.allPanelData[this.allPanelData.length - 1].rw_canvas != null) {
    for (let i = 0; i < this.allPanelData[this.allPanelData.length - 1].rw_canvas.points.length; i++) {
      console.log(this.allPanelData[this.allPanelData.length - 1].rw_canvas.points)
      var points = this.allPanelData[this.allPanelData.length - 1].rw_canvas.points
      let tempX = (Math.round(points[i].x))

      let tempY = (Math.round(points[i].y))
      rw_points.push(`${tempX};${tempY};`)
    }
    //to remove the ,
    var comma = /,/g
    var rwPointsString = rw_points.toString().replace(comma, '')
    console.log(rwPointsString)
    console.log(this.allPanelData[this.allPanelData.length - 1].roi_data)
    this.allPanelData[this.allPanelData.length - 1].roi_data.RW = rwPointsString
    this.PanelData.panel_data[this.allPanelData.length - 1].roi_data.RW = rwPointsString

    console.log(this.allPanelData[this.allPanelData.length - 1].roi_data)
  }
  roiData.push(this.allPanelData[this.allPanelData.length - 1].roi_data)


  //  var cameraData={
  //   id:this.ID,
  //   imagename:this.imageName,
  //   panel_id:
  //   roi_data:roiData
  //  }
  console.log(this.selectedEditId)
  console.log(this.allPanelData[this.allPanelData.length - 1].roi_data.roi_data.panel_key_id)
  var data: any[] = []
  var cameraData: any = {
    id: this.ID,
    image_name: this.imageName,
    panel_id: this.allPanelData[this.allPanelData.length - 1].roi_data.panel_id,
    panel_key_id: this.allPanelData[this.allPanelData.length - 1].roi_data.roi_data.panel_key_id,
    isolation_status: null,
    flasher_status: null,
    roi_data: this.allPanelData[this.allPanelData.length - 1].roi_data.roi_data
  }
  data.push(cameraData)
  //

  console.log(data)
  var body = {
    data: data
  }
  this.server.AddPanelRoi(body).subscribe((response: any) => {
    console.log(response)
    if (response.success) {

      this.modalService.dismissAll()
      this.modalService.open(this.RWAlert, { centered: true })
      // setTimeout(() => {
      //   this.modalService.dismissAll()
      // }, 3000);
      window.location.reload()
    }
    else {
      this.canvas.remove(this.allPanelData[this.allPanelData.length - 1].roi_canvas)
      this.canvas.remove(this.allPanelData[this.allPanelData.length - 1].roi_name_canvas)

    }

    this.server.notification(response.message)
  })




}


canvasSetup() {
  var cContainer = document.getElementById('canvas-container')
  console.log(cContainer.clientWidth)
  this.canvas = new fabric.Canvas('canvasROI', { fireRightClick: true })
  console.log(this.canvas)
  this.canvas.selection = false
  this.canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
  this.canvas.setWidth(cContainer.clientWidth)
  // console.log(this.canvasContainer.clientx)
  // this.canvas.setWidth(img.width)
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

//funciton to get the panel points
GetPanelPoints() {
  this.PanelData.panel_data.forEach((points: any, id: number) => {
    console.log(points)
    
    
       this.panel_key_id = Number( points.roi_data.panel_key_id)    

   
    //accessing roi points
    var roi_points = points.roi_data.bbox.split(';')
    var rw_points = typeof (points.roi_data.RW) == 'string' ? points.roi_data.RW.split(';') : []
    rw_points.length == 0 ? this.rwCount++ : ''
    console.log(rw_points)
    var polyGon: any[] = []
    this.tempRectPoints = []
    for (let i = 0; i < roi_points.length - 1; i = i + 2) {
      var tempPoint = {
        x: Number(roi_points[i]),
        y: Number(roi_points[i + 1])
      }
      polyGon.push(tempPoint)

    }
    for (let i = 0; i < rw_points.length - 1; i = i + 2) {
      var temp = {
        x: Number(rw_points[i]),
        y: Number(rw_points[i + 1])
      }
      this.tempRectPoints.push(temp)
    }

   
    console.log(this.tempRectPoints)
    var tempObj = {
      rw: this.tempRectPoints,
      panel: polyGon,
      panel_id: points.panel_id
    }
    this.PanelsRoiPoints.push(tempObj)
    console.log(this.PanelsRoiPoints)
  });
  this.DrawExistPanels()
}

//function to  draw the already existed panels
DrawExistPanels() {
  this.PanelsRoiPoints.forEach((element: any, id: number) => {
    console.log(element)
    this.polygonOptions.stroke = 'rgb(127, 255, 0)'

    var Polygon: any = new fabric.Polygon(element.panel, { ...this.polygonOptions, id: id })
    if (element.rw.length > 0) {
      var rw_roi = new fabric.Polygon(element.rw, { ...this.polygonOptions2, id: id })
      rw_roi.set("aCoords", { tl: new fabric.Point(element.rw[0].x, element.rw[0].y), tr: new fabric.Point(element.rw[1].x, element.rw[1].y), br: new fabric.Point(element.rw[2].x, element.rw[2].y), bl: new fabric.Point(element.rw[3].x, element.rw[3].y) });
    }

    // Polygon.id = uuid()
    console.log(Polygon)
    var text = new fabric.Text(element.panel_id === 'NA' ? (id + 1) + '.' + element.panel_id : element.panel_id, {
      fontSize: 20,
      // bottom:5
      backgroundColor: 'black',
      left: Polygon.left,
      top: Polygon.top,
      stroke: 'rgb(127, 255, 0)',
      fill: 'rgb(127, 255, 0)',
    });
    console.log(Polygon)

    var tempObj = {
      rw_canvas: element.rw.length ? rw_roi : null,
      panel_name_canvas: text,
      roi_canvas: Polygon,
      rw: element.rw,
      panel_id: this.PanelData.panel_data[id].panel_id === 'NA' ? this.PanelData.panel_data[id].panel_id + (id + 1) : this.PanelData.panel_data[id].panel_id,
      roi_data: this.PanelData.panel_data[id]

    }

    console.log(this.panel_key_id)
    this.allPanelData.push(tempObj)
    console.log('alllpanelData', this.allPanelData)
    console.log('panelData[0', this.PanelData)
    console.log(rw_roi)
    if (element.rw.length > 0) {
      console.log(element.rw)
      this.canvas.add(Polygon, text, rw_roi);
    }
    else {
      this.canvas.add(Polygon, text)
    }
    // console.log(this.canvas.get)
    this.canvas.renderAll()

    // this.canvas.add(Polygon)
    // this.canvas.requestRenderAll()


  }
  );
    if (this.rwCount > 0) {
      this.modalService.open(this.RWAlert, { centered: true })
      // setTimeout(() => {
      //   this.modalService.dismissAll()
      // }, 3000);
    }
  
  console.log(this.allPanelData)


}

CalculateRectPoints(x1: any, y1: any, x2: any, y2: any) {
  var xc = (x1 + x2) / 2;
  var yc = (y1 + y2) / 2;    // Center point
  var xd = (x1 - x2) / 2;
  var yd = (y1 - y2) / 2;    // Half-diagonal

  var x3 = xc - yd;
  var y3 = yc + xd;    // Third corner
  var x4 = xc + yd;
  var y4 = yc - xd;
  var temp = { x: this.tempRectPoints[1].x, y: this.tempRectPoints[1].x }
  this.tempRectPoints[1] = { x: x3, y: y3 }
  this.tempRectPoints[2] = temp

  this.tempRectPoints[4] = { x: x4, y: y4 }
}

getClickCoords(event: any) {
    this.newPt = {
      x: event.layerX,
      y: event.layerY
    }
    this.newPanelPoints.push(this.newPt);
    console.log(this.newPt)

    console.log(this.newPanel)
    this.canvas.add(this.newPanel);

    // console.log(this.points)
    // if (this.points.length > 3) {
    //   this.isPolygonDrawn = true;
    // }
  
}



makeNewPanel() {
  this.newPanel = new fabric.Polygon(this.newPanelPoints, this.polygonOptions)

}
makeNewRW() {

  this.newRw = new fabric.Polygon(this.newRWPoints, this.polygonOptions2)
}
isDelete(id: number) {
  this.selectedEditId = id
  this.selectedId = id
  this.modalService.open(this.deleteModal)
}

DeletePanel() {
  console.log(this.jobType, 'jobtype')
  if (this.jobType == 'HT') {
    this.isDeleteRW = false

    var tempRoiCanvas = this.allPanelData[this.selectedEditId].roi_canvas
    var tempRWCanvas = this.allPanelData[this.selectedEditId].rw_canvas
    var tempTextCanvas = this.allPanelData[this.selectedEditId].panel_name_canvas
    this.canvas.remove(tempRoiCanvas)
    this.canvas.remove(tempTextCanvas)
    this.canvas.remove(tempRWCanvas)
    // this.allPanelData.splice(id, 1)
    console.log()
    this.allPanelData[this.selectedEditId].roi_canvas.points = []
    this.allPanelData[this.selectedEditId].roi_data.bbox = []

    // this.PanelData.panel_data.splice(id, 1)
    this.canvas.renderAll()
    this.OnDeletePanel()
  }

  
}


DeletePanelRW(id: number) {
  this.selectedEditId = id
  this.isDeleteRW = true
  var confirmDelete = confirm('Do you want to delete this Rack window?')
  if (confirmDelete) {

    var tempRWCanvas = this.allPanelData[id].rw_canvas
    this.allPanelData[id].rw_canvas.points = []
    this.canvas.remove(tempRWCanvas)
    this.allPanelData[this.selectedEditId].RW = []

    console.log(this.PanelData.panel_data)
    console.log(this.allPanelData)
    this.canvas.renderAll()
    this.SaveEditedChanges()
  }

}


Back() {
  //this.router.navigate(['app/jobsheetMoniter'])
  window.close()
}



}
