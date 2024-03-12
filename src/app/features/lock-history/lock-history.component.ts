import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Lightbox, LightboxConfig } from "ngx-lightbox";
import { Observable, Observer, of } from "rxjs";
import { ServerService } from "src/app/Services/server.service";

@Component({
  selector: "app-lock-history",
  templateUrl: "./lock-history.component.html",
  styleUrls: ["./lock-history.component.css"],
})
export class LockHistoryComponent {
  currentData: any = null;
  currentPanel: any;
  panelId: any;
  currentArea: any;
  currentDep: any;
  selectedEditIndex: number;
  tempData: any[];
  page: number = 1;
  pageSize: number = 5;
  editedRackProc: any;
  editField: any = "";
  imageName: string = "";
  selectedId: any;
  IP: string;
  selectedRiro: any;
  Images: any[] = [];
  data: any;
  flasherImages: any[] = [];
  cameraName: any;
  tempField: FormControl = new FormControl("", Validators.required);
  panelData: Observable<any[]> = of([]);
  total: Observable<number> = of(0);
  rackProcess: FormControl = new FormControl("", Validators.required);
  remarkControl: FormControl = new FormControl();
  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private server: ServerService,
    private router: Router,
    private _lightbox: Lightbox,
    public _lightBoxConfig: LightboxConfig
  ) {
    this._lightBoxConfig.showDownloadButton = true;
    this.activatedRoute.queryParams.subscribe((data: any) => {
      console.log(data);
      this.currentPanel = data.panel;
      this.panelId = data.id;
      this.currentData = data;
      this.currentArea = data.area;
      this.imageName = data.image_name;
      this.cameraName = data.camera_name;
      this.currentDep = data.department;
      this.data = {
        id: this.panelId,
        //  panel_no:this.currentPanel,
        imagename: data.image_name,
      };
      this.IP = this.server.IP;
    });
    // var table = document.getElementById('dataTable')
    // table.classList.add('loader')
  }

  ngOnInit(): void {
    this.getRiroHistory();
  }

  EditRack(event: any) {
    console.log(event);
    this.editedRackProc = event.target.value;
  }

  SaveRemark() {
    var index = this.tempData.findIndex((data: any) => {
      return data.riro_key_id == this.selectedEditIndex;
    });
    console.log(index);
    var data1: any = {
      riro_key_id: this.selectedEditIndex,
    };
    data1[this.editField] = this.remarkControl.value;
    this.server.EditRiroJob(data1).subscribe(
      (response: any) => {
        if (response.success) {
          this.server.notification(response.message);
          this.getRiroHistory();
          this.modalService.dismissAll();
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        this.server.notification("Error while updating", "Retry");
      }
    );
  }
  SaveRackChanges() {
    var index = this.tempData.findIndex((data: any) => {
      return data.riro_key_id == this.selectedEditIndex;
    });
    var field = this.editField;
    console.log(index);
    var data1: any = {
      riro_key_id: this.selectedEditIndex,
    };
    data1[this.editField] = this.editedRackProc;
    console.log(data1);
    this.server.EditRiroJob(data1).subscribe(
      (response: any) => {
        if (response.success) {
          console.log(response);
          this.tempData[index].rack_process = this.editedRackProc;

          this.getRiroHistory();
          this.modalService.dismissAll();
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        this.server.notification("Error while updating", "Retry");
      }
    );
  }

  RirDeleteModal(modal: any, data: any) {
    this.selectedEditIndex = data._id.$oid;
    this.selectedRiro = data;
    this.modalService.open(modal);
  }

  RiroDelete() {
    this.server.DeleteHydroJob(this.selectedRiro.modify_key).subscribe(
      (response: any) => {
        console.log(response);

        this.server.notification(response.message);
        if (response.success) {
          this.getRiroHistory();
        }
        this.modalService.dismissAll();
      },
      (Err) => {
        this.server.notification("Error while deleting job", "Retry");
      }
    );
  }

  RemarkModal(modal: any, data: any, field: any) {
    this.editField = field;

    this.selectedRiro = data;
    //  this.selectedEditIndex = data.riro_key_id
    console.log(data.sl_no);
    this.modalService.open(modal, { size: "xl" });

    this.rackProcess.setValue(data.rack_process);
  }

  EditRemark(modal: any, data: any, field: any) {
    this.editField = field;
    this.selectedEditIndex = data.riro_key_id;
    var index = this.tempData.findIndex((data: any) => {
      return data.riro_key_id == this.selectedEditIndex;
    });
    var temp = this.tempData[index];
    this.remarkControl.setValue(temp.remarks);

    console.log(data.sl_no);

    this.modalService.open(modal, { backdrop: "static" });
  }
  sliceData() {
    console.log(this.page, this.pageSize);
    this.total = of(
      this.tempData.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      ).length
    );
    this.total = of(this.tempData.length);
    this.panelData = of(
      this.tempData
        .map((div: any, SINo: number) => ({ SNo: SINo + 1, ...div }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        )
    );
  }
  selectEditField(modal: any, data: any, field: string) {
    console.log(field);
    this.editField = field;
    this.selectedRiro = data;
    this.selectedEditIndex = data.riro_key_id;
    var index = this.tempData.findIndex((data: any) => {
      return data.riro_key_id == this.selectedEditIndex;
    });

    if (this.editField == "ip_address" || this.editField == "panel_id") {
      this.tempField.setValue(this.tempData[index].data[this.editField]);
    } else if (this.editField == "panel_id") {
      this.tempField.setValue(
        this.tempData[index].data.panel_data[this.editField]
      );
    } else if (this.editField == "five_meter") {
      this.tempField.setValue(
        this.tempData[index][this.editField].violation
          ? this.tempData[index].this.editField.violation
            ? "Yes"
            : "No"
          : "No"
      );
    } else {
      this.tempField.setValue(this.tempData[index][this.editField]);
    }
    this.modalService.open(modal, { backdrop: "static" });
  }
  SaveFieldChanges() {
    var index = this.tempData.findIndex((data: any) => {
      return data.riro_key_id == this.selectedEditIndex;
    });

    var data2: any = {
      riro_key_id: this.selectedEditIndex,
    };
    data2[this.editField] = this.tempField.value;

    var temp = this.tempData[index];
    if (this.editField === "five_meter") {
      this.tempField.setValue(this.tempField.value === "Yes" ? true : false);
    }

    this.server.EditRiroJob(data2).subscribe(
      (response: any) => {
        if (response.success) {
          this.server.notification(response.message);
          var temp = this.tempData[index];
          if (this.editField == "ip_address" || this.editField == "panel_id") {
            this.tempData[index].data[this.editField] = this.tempField.value;
          } else if (this.editField == "panel_id") {
            this.tempData[index].data.panel_data[this.editField] =
              this.tempField.value;
          }
          if (this.editField == "five_meter") {
            this.tempData[index][this.editField].violation =
              this.tempField.value;
          } else {
            this.tempData[index][this.editField] = this.tempField.value;
            console.log(
              (this.tempData[index][this.editField] = this.tempField.value)
            );
          }
          this.modalService.dismissAll();
          this.sliceData();
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        this.server.notification("Error while updating", "Retry");
      }
    );
  }
  ViolImages5meter(data: any) {
    //  NgImageSliderServi
    this.Images = [];
    data.five_meter.images.forEach((obj: any, index: number) => {
      console.log(obj);
      this.Images[index] = {
        src: this.IP + "/fivemeter_image/" + obj.img_name,

        thumb: this.IP + "/fivemeter_image/" + obj.img_name,
        caption: obj.img_name,
      };
    });

    this.open(0);
    console.log(this.Images);
  }

  FlasherImage(data: any) {
    //  NgImageSliderServi
    this.flasherImages = [];

    this.flasherImages[0] = {
      src:
        this.IP +
        "/magneticflasher_image/" +
        data.magnetic_flasher.flasher_image,

      thumb: this.IP + "/" + data.magnetic_flasher.img_name,
      caption: data.magnetic_flasher.img_name,
    };

    this.openFIm();
    console.log(this.Images);
  }
  openFIm(): void {
    // open lightbox
    console.log("opening lightbox");
    this._lightbox.open(this.flasherImages, 0);
  }

  open(index: number): void {
    // open lightbox
    console.log("opening lightbox");
    this._lightbox.open(this.Images, index);
  }

  Back() {
    // this.router.navigate(['app/CameraSettings'])
    window.close();
  }

  ToPPE() {
    var link = this.router.serializeUrl(
      this.router.createUrlTree(["app/panelViolation"], {
        queryParams: {
          id: this.panelId,
          panel: this.currentPanel,
          imageName: this.imageName,
          area: this.currentArea,
        },
      })
    );
    window.open(link, "_blank");
    //this.router.navigate(['app/panelViolation'], { queryParams: { panel: id } })
  }

  getRiroHistory() {
    var Table = document.getElementById("dataTable");
    Table.classList.add("loading");
    this.server.GetLockHistory(this.data).subscribe(
      (response: any) => {
        console.log(response);
        Table.classList.remove("loading");
        if (response.success) {
          this.tempData = response.message;
          this.panelData = of(response.message);
          this.sliceData();
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        Table.classList.remove("loading");
        this.server.notification("Error while fetching the data");
      }
    );
  }
  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }
}
