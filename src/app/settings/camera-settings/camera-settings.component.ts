import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { ServerService } from "src/app/Services/server.service";
import { NgbdSortableHeader } from "src/app/common/sortable.directive";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";
import { Lightbox, LightboxConfig } from "ngx-lightbox";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { saveAs } from "file-saver";
import { formatCurrency } from "@angular/common";
import crypto from "crypto-js";
interface Response {
  message: any;
  success: boolean;
}

@Component({
  selector: "app-camera-settings",
  templateUrl: "./camera-settings.component.html",
  styleUrls: ["./camera-settings.component.css"],
})
export class CameraSettingsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  RACameraList: Observable<any[]> = of([]);
  responseMessage: string = "";
  IP: string = "";
  userType: any;
  licenseDetails: {
    added_cameras_count: number;
    remaining_license: number;
    total_license: number;
  } = null;
  alarmVersions: any[] = [
    { data: "old", label: "Old", key: 0 },
    { data: "new", label: "New", key: 1 },
  ];
  analyticsEnabledCamCount: number = 0;
  showUploadOption: boolean = true;
  isFail: boolean = false;
  isSuccess: boolean = false;
  isLoading: boolean = false;
  isDownloading: boolean = false;
  jobFileStatus: boolean = false;
  Object: any = Object;
  cameraData: any[] = [];
  roiPoints: any[] = [];
  hoooterShutdownTime: FormControl = new FormControl();
  selectedColumn: any;
  showAiSolutions: boolean = true;
  isFormValid: boolean = false;
  CameraList: any[] = [];
  isHooter: boolean = false;
  isRelay: boolean = false;
  total: Observable<number> = of(0);
  page: number = 1;
  pageSize: number = 10;
  formdata: FormData = new FormData();
  tempData: any[] = [];
  isVoiceAlert: boolean = false;
  isLoading2: boolean = false;
  isActive: boolean = false;
  isActive2: boolean = false;
  isSpillageActive: boolean = false;
  AppConfig: number = 0;
  isDownload: boolean = false;
  alarmEnabledViolations: any[] = [];
  isSensgiz: boolean = false;
  sensgiz: any = new FormArray([]);
  SensGizInfo: any[] = [];
  sensgizModal: any;
  isActive3: Boolean = false;
  selectedCamera: any;
  rtspLive: any;
  isImgLoading: boolean = false;
  activeTabIndex: number = 0;
  hideColumns: any[] = [];
  aiSolutions: any = {
    RA: "Danger Zone",
    PPE: "Personal Protective Equipment",
    TC: "Traffic Count",
    CR: "Crowd Count",
    fire: "Fire",
    smoke: "Smoke",
    dust: "Dust",
    spillage: "Spillage",
  };
  dataFetchStatus: string = "";
  fireSmokeConfig: FormGroup = new FormGroup({
    mediaType: new FormControl("image", Validators.required),
    dataInterval: new FormControl(10, [
      Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
      Validators.min(1),
    ]),
  });
  spillageConfig: any = new FormGroup({
    mediaType: new FormControl("image", Validators.required),
    dataInterval: new FormControl<number>(10, [
      Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
      Validators.min(1),
    ]),
  });
  licenseMessage: string =
    "You have reached the limit of cameras that you can add to this application";
  startAppConfig: FormGroup = new FormGroup({
    rtspConfig: new FormControl(0, Validators.required),
    VideoAnalyticsConfig: new FormControl("0", [
      Validators.required,
      Validators.requiredTrue,
    ]),
    ROIConfig: new FormControl("0", Validators.required),
    fireRtspConfig: new FormControl(0, Validators.required),
    spillageRTSPConfig: new FormControl(0, Validators.required),
  });
  voiceLanguages: Observable<any[]> = of([
    { text: "English", id: 0 },
    { text: "Hindi", id: 1 },
    { text: "Kannada", id: 2 },
    { text: "Telugu", id: 3 },
  ]);

  @ViewChild("singleSelect") singleSelect: any;

  dropdownSettings: IDropdownSettings;
  dropdownSettings2: Observable<IDropdownSettings> = of({
    singleSelection: true,
    idField: "id",
    textField: "text",
    disabledField: "isDisabled",

    // enableCheckAll: true,
    // selectAllText: "Select All",
    // unSelectAllText: "UnSelect All",
    // allowSearchFilter: false,
    // limitSelection: 1,
    closeDropDownOnSelection: true,

    clearSearchFilter: true,
    // maxHeight: 197,
    // itemsShowLimit: 999999999999,
    searchPlaceholderText: "Search",
    noDataAvailablePlaceholderText: "No data available",
    noFilteredDataAvailablePlaceholderText: "No filtered data available",
    showSelectedItemsAtTop: false,
    defaultOpen: false,
    allowRemoteDataSearch: false,
  });
  mechJobsheet: File;
  cameraBrandList: Observable<any[]> = of([{ id: 1, text: "cp_plus" }]);
  selectedBrand: FormControl = new FormControl();
  cameraImages: any[] = [];
  checkApplicationStatusInterval: any;
  cameraAddMethod: FormControl = new FormControl("excel");
  headers: any[] = [
    { item_text: "SI No", item_id: 0 },
    { item_text: "Camera Name", item_id: 1 },
    { item_text: "Camera Image", item_id: 2 },
    { item_text: "Camera IP", item_id: 9 },
    { item_text: "Department", item_id: 3 },
    { item_text: "Area", item_id: 4 },
    { item_text: "Camera brand", item_id: 5 },
    { item_text: "Alarms", item_id: 6 },
    { item_text: "Alarm Ip Address", item_id: 7 },
    { item_text: "AI Solutions", item_id: 10 },
    { item_text: "Analytics Status", item_id: 11 },
    { item_text: "Settings", item_id: 8 },
  ];

  @ViewChildren(NgbdSortableHeader)
  sortableHeaders: QueryList<NgbdSortableHeader>;

  @ViewChild("errorMessage", { static: false }) ErrorModal: TemplateRef<any>;
  AddCameraForm: FormGroup = new FormGroup({
    cameraname: new FormControl("", Validators.required),
    camera_brand: new FormControl("", Validators.required),
    cameraip: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    password: new FormControl(
      "",
      Validators.pattern(RegExp(/^[a-zA-Z0-9_\s]*$/))
    ),
    plant: new FormControl("", Validators.required),
    department: new FormControl("", Validators.required),
    area: new FormControl("", Validators.required),
    port: new FormControl("", Validators.required),
    rtsp_url: new FormControl(""),
    onlyHooter: new FormControl({ value: false, disabled: false }),
    onlyHooterIP: new FormControl(),
    onlyHooterVersion: new FormControl(""),
    onlyRelay: new FormControl(
      { value: false, disabled: false },
      Validators.requiredTrue
    ),
    onlyRelayIP: new FormControl(""),
    onlyRelayVersion: new FormControl(""),
    hooterRelayIP: new FormControl(""),
    isHooter: new FormControl({ value: false, disabled: false }),
    isRelay: new FormControl(
      { value: false, disabled: false },
      Validators.requiredTrue
    ),
    isSensgiz: new FormControl(
      { value: false, disabled: false },
      Validators.requiredTrue
    ),
    hooterIp: new FormControl(""),
    hooterConfig: new FormControl(""),
    alarmVersion: new FormControl(""),
    relayIp: new FormControl(""),
    voiceLang: new FormControl(""), //altered voice language settings
  });
  EditCameraForm: FormGroup = new FormGroup({
    cameraname: new FormControl("", Validators.required),
    cameraip: new FormControl("", Validators.required),
    plant: new FormControl("", Validators.required),
    department: new FormControl("", Validators.required),
    area: new FormControl("", Validators.required),
    //port: new FormControl('', Validators.required),
    rtsp_url: new FormControl(""),
    isHooter: new FormControl(""),
    isRelay: new FormControl(""),
    onlyHooter: new FormControl(""),
    onlyHooterIP: new FormControl(""),
    onlyHooterVersion: new FormControl(""),
    onlyRelay: new FormControl(""),
    onlyRelayIP: new FormControl(""),
    onlyRelayVersion: new FormControl(""),
    hooterRelayIP: new FormControl(""),
    isSensgiz: new FormControl(""),
    hooterIp: new FormControl(""),
    hooterConfig: new FormControl(""),
    relayIp: new FormControl(""),
    alarmVersion: new FormControl(),
    voiceLang: new FormControl(""), //altered voice language settings
  });

  constructor(
    public server: ServerService,
    public modalService: NgbModal,
    public _lightBox: Lightbox,
    private toasterService: ToastrService,
    public _lightBoxConfig: LightboxConfig,
    public router: Router
  ) {
    this.IP = server.IP;
    this.dropdownSettings = {
      singleSelection: false,
      enableCheckAll: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: "No data",
      maxHeight: 197,
    };
    var userData: any = sessionStorage.getItem("session");
    var decodedString = crypto.AES.decrypt(userData, this.server.secretKey);
    userData = JSON.parse(decodedString.toString(crypto.enc.Utf8));
    this.userType = userData.userType;
    this.GetLicenseDetails();
    this.sensgiz.push(
      new FormGroup({
        coinId: new FormControl("", Validators.required),
        coinLocation: new FormControl("", Validators.required),
        presetId: new FormControl("", Validators.required),
      })
    );
    this.checkApplicationStatusInterval = setInterval(() => {
      this.server.CheckApplicationStatus().subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          //this.isActive=true
          localStorage.setItem("appStatus", response.message[0].process_status);
          var process = response.message.find((el: any) => {
            return el.process_name == "docketrun-app" ? el : "";
          });
          this.isActive = process.process_status;

          var process2 = response.message.find((el: any) => {
            return el.process_name == "smrec" ? el : "";
          });
          var process3 = response.message.find((el: any) => {
            return el.process_name == "fire_smoke_app" ? el : "";
          });
          this.isActive3 = process3.process_status;

          var process4 = response.message.find((el: any) => {
            return el.process_name == "spillage_app" ? el : "";
          });
          this.isSpillageActive = process4 ? process4.process_status : "";
        }
      });
    }, this.server.checkApplicationStatusInterval);

    this.server.GetMockDrillStatus().subscribe(
      (response: any) => {
        this.isActive2 = response.success;
      },
      (Err) => {}
    );
    this.AddCameraForm.valueChanges.subscribe((value) => {
      console.log(value);
      if (
        this.AddCameraForm.get("cameraname").value &&
        this.AddCameraForm.get("cameraip").value &&
        this.AddCameraForm.get("department").value &&
        this.AddCameraForm.get("port").value &&
        this.AddCameraForm.get("camera_brand").value &&
        this.AddCameraForm.get("username").value &&
        this.AddCameraForm.get("password").value &&
        this.AddCameraForm.get("plant").value &&
        this.AddCameraForm.get("area").value &&
        this.AddCameraForm.get("cameraip").value
      ) {
        console.log("adding manually");
        this.isFormValid = true;
      } else if (
        this.AddCameraForm.get("cameraname").value &&
        this.AddCameraForm.get("camera_brand").value &&
        this.AddCameraForm.get("department").value &&
        this.AddCameraForm.get("rtsp_url").value &&
        this.AddCameraForm.get("area").value &&
        this.AddCameraForm.get("plant").value
      ) {
        this.isFormValid = true;
      } else {
        this.isFormValid = false;
      }
    });
    this._lightBoxConfig.showDownloadButton = true;
    this._lightBoxConfig.showZoom = true;
    this._lightBoxConfig.showImageNumberLabel = true;
    this._lightBoxConfig.fitImageInViewPort = true;
    this._lightBoxConfig.disableScrolling = false;
    this._lightBoxConfig.centerVertically = false;
    this.GetCameraBrands();
    console.log(this.AddCameraForm.value);
    this.AddCameraForm.valueChanges.subscribe(() => {
      this.isSuccess = false;
      this.isFail = false;
    });
    this.GetCameraList();
    this.GetLicenseDetails();
  }

  ngOnInit(): void {
    this.CheckApplicationStatus();
    this.startAppConfig.get("rtspConfig").setValue("0");
    this.server.CameraSettingsChanges.subscribe((value: boolean) => {
      if (value) {
        console.log("changes in camera settings");
        this.GetCameraList();
      }
    });
    this.startAppConfig.valueChanges.subscribe((value) => {
      console.log("changing value", value);
      console.log(this.startAppConfig.value);
    });

    this.toasterService.clear();
  }

  ngAfterViewInit(): void {
    this.AddCameraForm.get("rtsp_url").valueChanges.subscribe((value: any) => {
      if (value) {
        console.log(value);

        this.AddCameraForm.get("username").removeValidators(
          Validators.required
        );
        this.AddCameraForm.get("password").removeValidators(
          Validators.required
        );
        this.AddCameraForm.get("cameraip").removeValidators(
          Validators.required
        );
        this.AddCameraForm.get("port").removeValidators(Validators.required);
      } else {
        console.log(value);
        this.AddCameraForm.get("username").addValidators(Validators.required);
        this.AddCameraForm.get("password").addValidators(Validators.required);
        this.AddCameraForm.get("cameraip").addValidators(Validators.required);
        this.AddCameraForm.get("port").addValidators(Validators.required);
      }
    });
  }
  OnTabChange(event: any) {
    this.activeTabIndex = event.index;
    console.log(event.index);
    if (this.activeTabIndex == 0) {
    } else {
      this.router.navigate(["app", "CameraSettings", "steam-suit-cameras"]);
    }
  }
  openCameraAddModal(modal: any) {
    var container = document.getElementById("page");
    container.classList.add("loading");
    this.sensgiz = new FormArray([]);
    this.sensgiz.push(
      new FormGroup({
        coinId: new FormControl("", Validators.required),
        coinLocation: new FormControl("", Validators.required),
        presetId: new FormControl("", Validators.required),
      })
    );
    this.SensGizInfo = [];
    this.server.CheckLicense().subscribe(
      (response: any) => {
        if (response.success) {
          container.classList.remove("loading");

          this.modalService
            .open(modal, { size: "lg", centered: true })
            .result.then(
              (result) => {
                this.isHooter = false;
                this.isRelay = false;
                this.isVoiceAlert = false;
                console.log("cancel");
                this.AddCameraForm.reset();
                this.isFail = false;
                this.isSuccess = false;
                this.isLoading = false;
                this.sensgiz.reset();
              },
              (reason) => {
                this.isHooter = false;
                this.isRelay = false;
                this.isVoiceAlert = false;
                this.sensgiz.reset();

                this.sensgiz = new FormArray([]);
                this.sensgiz.push(
                  new FormGroup({
                    coinId: new FormControl("", Validators.required),
                    coinLocation: new FormControl("", Validators.required),
                    presetId: new FormControl("", Validators.required),
                  })
                );
                console.log("submit");
                this.isLoading = false;
                /// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                // this.download = '',
                //   this.isalert = false
                this.AddCameraForm.reset();
                this.isFail = false;
                this.isSuccess = false;
                this.sensgiz.reset();
                this.SensGizInfo.splice(0, this.SensGizInfo.length);
              }
            );
        } else {
          this.licenseMessage = response.message;
          container.classList.remove("loading");
          this.modalService.open(this.ErrorModal, {
            centered: true,
            backdrop: "static",
          });
        }
      },
      (Err) => {
        container.classList.remove("loading");
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }
  EnableAnalytics(camera: any, event: any) {
    console.log(event.target.checked, "event");
    var value = event.target.checked.toString();
    this.server.notification("Camera Analytics Updated");
    this.server.UpdateCameraAnalytics(camera._id.$oid, value).subscribe(
      (response: any) => {
        this.GetCameraList();
        if (response.success) {
          this.server.notification(response.message);
        } else {
          this.server.notification(response.message);
        }
      },
      (Err) => {
        this.server.notification("Error during this process", "Retry");
      }
    );
  }
  // Function to enable/disable the individual  solution of particular camera
  SetAISolution(camera: any, event: any, solution: any) {
    console.log(event.target.checked, "event");
    var {
      camera_ip,
      camera_brand,
      ppe_data,
      roi_data,
      cr_data,
      tc_data,
      coin_details,
      id,
      alarm_ip_address,
      alarm_type,
      SNo,
      imagename,
      rtsp_url,
      analytics_status,
      _id,
      firesmoke_data,
      spillage_roi_data,
      image_height,
      image_width,
      username,
      password,
      rtsp_port,
      camera_status,
      cameraid,
      timestamp,
      ...cameraDetails
    } = camera;
    cameraDetails.id = camera._id.$oid;
    var value = event.target.checked.toString();
    cameraDetails.ai_solution[solution] = event.target.checked;
    console.log(camera, "enable and disable ai  solution");
    this.server.EditCamera(cameraDetails).subscribe(
      (response: any) => {
        if (response.success) {
          this.GetCameraList();
          this.server.notification(response.message);
        } else {
          this.GetCameraList();

          this.server.notification(response.message);
        }
      },
      (Err) => {
        this.GetCameraList();

        this.server.notification("Error during the process", "Retry");
      }
    );
  }
  isDelete(modal: any, camera: any) {
    this.selectedCamera = camera;
    this.modalService.open(modal, { centered: true, backdrop: "static" });
  }
  StopAppModal(modal: any) {
    this.modalService.open(modal, { centered: true, backdrop: "static" });
  }
  StartAppModal(modal: any) {
    this.startAppConfig.get("rtspConfig").setValue(0);
    this.modalService.open(modal, { centered: true, backdrop: "static" });
  }

  ModalOpen(modal: any, rtsp?: any) {
    this.rtspLive = rtsp;
    this.isImgLoading = true;
    this.modalService.open(modal, { centered: true, size: "xl" });
  }
  DeleteCamera() {
    console.log(this.selectedCamera);
    console.log(typeof this.selectedCamera._id);
    this.server
      .DeleteCameraDetails(
        typeof this.selectedCamera._id == "string"
          ? this.selectedCamera._id
          : this.selectedCamera._id.$oid
      )
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.server.notification(response.message);
            this.modalService.dismissAll();
            this.GetCameraList();
          } else {
            this.server.notification(response.message);
          }
        },
        (Err) => {
          this.server.notification("Something went wrong", "Retry");
        }
      );
  }

  hooterOrRelayConfig(event: any, modal?: any) {
    console.log(event.target.checked);
    if (event.target.value == "hooter") {
      this.isHooter = true;
      this.isRelay = false;
      this.isSensgiz = false;
      this.isVoiceAlert = false;
    }
    if (event.target.value == "relay") {
      this.isHooter = false;
      this.isRelay = true;
      this.isSensgiz = false;
      this.isVoiceAlert = false;
    }

    if (event.target.value == "voiceAlert") {
      this.isVoiceAlert = true;
      this.isHooter = false;
      this.isRelay = false;
      this.isSensgiz = false;
    }
    if (event.target.value == "sensegiz") {
      this.isVoiceAlert = false;
      this.isSensgiz = true;
      this.isHooter = false;
      this.isRelay = false;
      this.SensgizModal(modal);
    }
  }

  editSensgiz(modal: any) {
    this.sensgiz = new FormArray([]);
    //this.SensGizInfo=this.SensGizInfo.coin_details
    this.isHooter = false;
    this.isRelay = false;
    this.isSensgiz = true;
    if (this.SensGizInfo != null) {
      this.SensGizInfo.forEach((value: any, index: number) => {
        this.sensgiz.push(
          new FormGroup({
            coinId: new FormControl("", Validators.required),
            coinLocation: new FormControl("", Validators.required),
            presetId: new FormControl("", Validators.required),
          })
        );

        this.sensgiz.controls[index].get("coinId").setValue(value.coin_id);
        this.sensgiz.controls[index]
          .get("coinLocation")
          .setValue(value.coin_location);
        this.sensgiz.controls[index].get("presetId").setValue(value.preset_id);
      });
      this.sensgizModal = this.modalService.open(modal, {
        size: "lg",
        centered: true,
      });
    }
  }
  HooterSettings(event: any) {
    console.log(event);
    if (event.target.checked) {
      this.alarmEnabledViolations.push(event.target.value);
    } else {
      var index = this.alarmEnabledViolations.indexOf(event.target.value);
      this.alarmEnabledViolations.splice(index, 1);
    }
    console.log(this.alarmEnabledViolations);
  }

  OnAddCameraDetails() {
    this.AddCameraForm.updateValueAndValidity();
    if (this.isFormValid) {
      this.isLoading = true;
      var formData = new FormData();
      this.isFail = false;
      this.isSuccess = false;
      console.log(this.AddCameraForm.value);
      for (let k in this.AddCameraForm.value) {
        console.log(k, this.AddCameraForm.value[k]);
        if (k === "camera_brand") {
          formData.append(k, this.AddCameraForm.value[k].text);
        } else {
          formData.append(k, this.AddCameraForm.value[k]);
        }
      }

      if (this.AddCameraForm.get("rtsp_url").value) {
        var ai_solution = Array;
        console.log(ai_solution);
        if (
          this.AddCameraForm.get("onlyHooter").value ||
          this.AddCameraForm.get("onlyRelay").value
        ) {
          var data1: any = {
            cameraname: this.AddCameraForm.value["cameraname"],
            camera_brand: this.AddCameraForm.value["camera_brand"][0].text,
            plant: this.AddCameraForm.value["plant"],
            area: this.AddCameraForm.value["area"],
            department: this.AddCameraForm.value["department"],
            rtsp_url: this.AddCameraForm.value["rtsp_url"],
            ai_solution: { RA: false, PPE: false, CR: false, TC: false },
            coin_details: null,

            alarm_type: {
              hooter: this.AddCameraForm.get("onlyHooter").value,
              relay: this.AddCameraForm.get("onlyRelay").value,
            },
            // alarm_enable:{hooter:this.AddCameraForm.get('isHooter').value,relay:this.AddCameraForm.get('isRelay').value},
            alarm_enable: true,
            alarm_ip_address: {
              hooter_ip: this.AddCameraForm.get("onlyHooterIP").value
                ? this.AddCameraForm.get("onlyHooterIP").value
                : null,
              relay_ip: this.AddCameraForm.get("onlyRelayIP").value
                ? this.AddCameraForm.get("onlyRelayIP").value
                : null,
            },
            alarm_version: { hooter: null, relay: null },
          };
          console.log(data1);
        }

        //altered
        else if (this.isVoiceAlert) {
          var data1: any = {
            cameraname: this.AddCameraForm.value["cameraname"],
            camera_brand: this.AddCameraForm.value["camera_brand"][0].text,
            plant: this.AddCameraForm.value["plant"],
            area: this.AddCameraForm.value["area"],
            rtsp_url: this.AddCameraForm.value["rtsp_url"],
            alarm_type: "voiceAlert",
            coin_details: null,
            department: this.AddCameraForm.value["department"],
            alarm_enable: true,
            alarm_ip_address: this.AddCameraForm.value["voiceLanguage"],
            ai_solution: { RA: false, PPE: false, CR: false, TC: false },
          };
        } else if (this.isSensgiz) {
          var data1: any = {
            cameraname: this.AddCameraForm.value["cameraname"],
            camera_brand: this.AddCameraForm.value["camera_brand"][0].text,
            plant: this.AddCameraForm.value["plant"],
            area: this.AddCameraForm.value["area"],
            rtsp_url: this.AddCameraForm.value["rtsp_url"],
            department: this.AddCameraForm.value["department"],
            alarm_enable: true,
            alarm_type: "sensegiz",
            // alarm_type: null,
            alarm_ip_address: "",
            coin_details: this.SensGizInfo,
            // alarm_ip_address: this.AddCameraForm.value['voiceLanguage'],
            ai_solution: { RA: false, PPE: false, CR: false, TC: false },
          };
        } else {
          var data1: any = {
            cameraname: this.AddCameraForm.value["cameraname"],
            camera_brand: this.AddCameraForm.value["camera_brand"][0].text,
            plant: this.AddCameraForm.value["plant"],
            area: this.AddCameraForm.value["area"],
            rtsp_url: this.AddCameraForm.value["rtsp_url"],
            ai_solution: { RA: false, PPE: false, CR: false, TC: false },
            coin_details: null,
            department: this.AddCameraForm.value["department"],
            alarm_type: {
              hooter: null,
              relay: null,
            },
            alarm_enable: true,
            //alarm_enable:{hooter:this.AddCameraForm.get('isHooter').value,relay:this.AddCameraForm.get('isRelay').value},
            alarm_ip_address: {
              hooter: null,
              relay: null,
            },
            alarm_version: { hooter: null, relay: null },
          };
        }

        this.AddCameraForm.get("onlyHooter").value
          ? (data1["alarm_version"].hooter = this.AddCameraForm.get(
              "onlyHooterVersion"
            ).value
              ? this.AddCameraForm.get("onlyHooterVersion").value["data"]
              : "")
          : "";
        this.AddCameraForm.get("onlyRelay").value
          ? (data1["alarm_version"].relay = this.AddCameraForm.get(
              "onlyRelayVersion"
            ).value
              ? this.AddCameraForm.get("onlyRelayVersion").value["data"]
              : "")
          : "";
        this.server.AddRACamerabyRtsp(data1).subscribe(
          (response: any) => {
            console.log(response);

            if (response.success) {
              this.isLoading = false;
              this.isSuccess = true;

              this.responseMessage = response.message;

              this.isHooter = false;
              this.isRelay = false;
              setTimeout(() => {
                this.modalService.dismissAll();
              }, 1000);
              this.GetCameraList();
              this.GetLicenseDetails();
            } else {
              this.isLoading = false;
              this.responseMessage = response.message;
              this.isFail = true;
              //this.AddCameraForm.reset()
            }
          },
          (Err) => {
            this.isFail = true;
            this.responseMessage = "Error while adding camera,retry";
            this.isLoading = false;
            // this.AddCameraForm.reset()
          }
        );
      } else {
        //var ai_solution = Array
        if (
          this.AddCameraForm.get("onlyHooter").value ||
          this.AddCameraForm.get("onlyRelay").value
        ) {
          var data: any = {
            cameraname: this.AddCameraForm.value["cameraname"],
            camera_brand: this.AddCameraForm.value["camera_brand"][0].text,
            plant: this.AddCameraForm.value["plant"],
            area: this.AddCameraForm.value["area"],
            username: this.AddCameraForm.value["username"],
            password: this.AddCameraForm.value["password"],
            cameraip: this.AddCameraForm.value["cameraip"],
            port: this.AddCameraForm.value["port"],
            coin_details: null,
            department: this.AddCameraForm.value["department"],
            alarm_type: {
              hooter: this.AddCameraForm.get("onlyHooter").value,
              relay: this.AddCameraForm.get("onlyRelay").value,
            },
            // alarm_enable:{hooter:this.AddCameraForm.get('isHooter').value,relay:this.AddCameraForm.get('isRelay').value},
            alarm_enable: true,
            alarm_ip_address: {
              hooter_ip: this.AddCameraForm.get("onlyHooterIP").value
                ? this.AddCameraForm.get("onlyHooterIP").value
                : null,
              relay_ip: this.AddCameraForm.get("onlyRelayIP").value
                ? this.AddCameraForm.get("onlyRelayIP").value
                : null,
            },
            alarm_version: { hooter: null, relay: null },

            ai_solution: { RA: false, PPE: false, CR: false, TC: false },
          };
        } else if (this.isSensgiz) {
          var data: any = {
            cameraname: this.AddCameraForm.value["cameraname"],
            camera_brand: this.AddCameraForm.value["camera_brand"][0].text,
            plant: this.AddCameraForm.value["plant"],
            area: this.AddCameraForm.value["area"],
            username: this.AddCameraForm.value["username"],
            password: this.AddCameraForm.value["password"],
            cameraip: this.AddCameraForm.value["cameraip"],
            port: this.AddCameraForm.value["port"],
            alarm_type: "sensegiz",
            alarm_ip_address: "",
            alarm_enable: true,
            department: this.AddCameraForm.value["department"],

            coin_details: this.SensGizInfo,

            // alarm_ip_address: this.AddCameraForm.value['relayIp'],
            ai_solution: { RA: false, PPE: false, CR: false, TC: false },
          };
        } else {
          var data: any = {
            cameraname: this.AddCameraForm.value["cameraname"],
            camera_brand: this.AddCameraForm.value["camera_brand"][0].text,
            plant: this.AddCameraForm.value["plant"],
            area: this.AddCameraForm.value["area"],
            username: this.AddCameraForm.value["username"],
            password: this.AddCameraForm.value["password"],
            cameraip: this.AddCameraForm.value["cameraip"],
            port: this.AddCameraForm.value["port"],
            ai_solution: { RA: false, PPE: false, CR: false, TC: false },
            coin_details: null,
            department: this.AddCameraForm.value["department"],
            alarm_type: {
              hooter: null,
              relay: null,
            },
            alarm_version: { hooter: null, relay: null },
            alarm_enable: true,
            alarm_ip_address: {
              hooter_ip: null,
              relay_ip: null,
            },
          };
        }

        this.AddCameraForm.get("onlyHooter").value
          ? (data["alarm_version"].hooter = this.AddCameraForm.get(
              "onlyHooterVersion"
            ).value
              ? this.AddCameraForm.get("onlyHooterVersion").value["data"]
              : "")
          : "";
        this.AddCameraForm.get("onlyRelay").value
          ? (data["alarm_version"].relay = this.AddCameraForm.get(
              "onlyRelayVersion"
            ).value
              ? this.AddCameraForm.get("onlyRelayVersion").value["data"]
              : "")
          : "";
        this.server.AddCameraDetails(data).subscribe(
          (response: any) => {
            console.log(response);
            //  this.AddCameraForm.addControl('rtsp_url', new FormControl('', Validators.required))

            if (response.success) {
              this.responseMessage = response.message;
              this.isSuccess = true;
              this.isLoading = false;
              this.isHooter = false;
              this.isRelay = false;

              setTimeout(() => {
                this.modalService.dismissAll();
              }, 1000);
              this.GetCameraList();
            } else {
              this.isLoading = false;
              this.responseMessage = response.message;
              this.isFail = true;
            }
          },
          (error: any) => {
            //this.AddCameraForm.addControl('rtsp_url', new FormControl('', Validators.required))
            this.isFail = true;
            this.responseMessage = "Error while adding camera,retry";
            this.isLoading = false;
            // this.AddCameraForm.reset()
          }
        );
      }
    } else {
      this.isFail = true;
      this.responseMessage = "Above Fields are required";
    }
  }
  StartApplication() {
    this.server
      .ConfigRtsp(this.startAppConfig.get("rtspConfig").value)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.server.StartApplication().subscribe(
              (response: any) => {
                if (response.success) {
                  this.isActive = true;
                  this.server.mechAppStatus.next(true);
                  this.server.notification(response.message);
                  this.modalService.dismissAll();
                } else {
                  this.server.notification(response.message);
                }
              },
              (Err) => {
                this.server.notification("Something went wrong", "Retry");
              }
            );
          } else {
            this.server.notification(res.message, "Retry");
          }
        },
        (err) => {
          this.server.notification("Error while the process", "Retry");
        }
      );
  }

  removeValidators() {
    this.AddCameraForm.get("username").removeValidators(Validators.required);
    this.AddCameraForm.get("password").removeValidators(Validators.required);
    this.AddCameraForm.get("cameraip").removeValidators(Validators.required);
    this.AddCameraForm.get("port").removeValidators(Validators.required);
    return true;
  }
  GetCameraList() {
    this.analyticsEnabledCamCount = 0;
    this.AddCameraForm.reset();
    this.CameraList = [];
    this.dataFetchStatus = "init";
    var container = document.getElementById("dataTable");
    container ? container.classList.add("loading") : "";
    this.server.getCameras().subscribe(
      (response: any) => {
        container ? container.classList.remove("loading") : "";
        this.dataFetchStatus = "success";

        if (response.success) {
          this.dataFetchStatus = "success";
          this.cameraImages = [];
          this.CameraList = response.message;
          response.message.forEach((camera: any) => {
            camera.analytics_status ? ++this.analyticsEnabledCamCount : "";
          });
          console.log("analytics camera count", this.analyticsEnabledCamCount);
          this.total = of(response.message.length);
          this.tempData = response.message;
          this.slice();
          response.message.forEach((element: any, index: number) => {
            this.cameraImages[index] = {
              src: this.IP + "/get_roi_image/" + element.imagename,

              thumb: this.IP + "/get_roi_image/" + element.imagename,
              caption: element.imagename,
            };
          });
        } else {
          this.responseMessage = response.message;
          this.cameraImages = [];
          this.CameraList = [];
          this.total = of(0);
          this.tempData = [];
          this.RACameraList = of([]);
          //  this.server.notification(response.message);
        }
      },
      (Err) => {
        this.dataFetchStatus = "error";
        container ? container.classList.remove("loading") : "";
        this.server.notification("Error ");
      }
    );
  }
  goToRoiEdit(id: string, image: string) {
    var link = this.router.serializeUrl(
      this.router.createUrlTree(["app/ROISettings"], {
        queryParams: { id: id, image: image },
      })
    );
    window.open(link, "_blank");
    //this.router.navigate(['app/ROISettings'], { queryParams: { id: id, image: image } })
  }

  onHideColumn(event: any) {
    console.log(event);
    this.hideColumns.push(event.item_id);
    this.selectedColumn.push(event.item_text);
  }
  onShowColumn(event: any) {
    let index = this.hideColumns.findIndex(
      (item: any) => item == event.item_id
    );
    this.hideColumns.splice(index, 1);
  }

  GetCameraBrands() {
    this.server.GetCameraBrandDetails().subscribe((response: any) => {
      console.log(response);
      var temp: any[] = [];
      if (response.success) {
        response.message.forEach((element: any, id: number) => {
          temp.push({ text: element, id: id });
        });
      }
      console.log(temp);

      this.cameraBrandList = of(temp);
    });
  }

  open(index: number): void {
    // open lightbox
    var imgindex = index - 1;
    console.log(imgindex);
    console.log(this.cameraImages);
    this._lightBox.open(this.cameraImages, imgindex);
  }

  OnSelectCameraBrand(event: any) {
    // console.log(this.AddCameraForm.get('camera_brand').patchValue(event.text))
    console.log(this.AddCameraForm.get("camera_brand").value);
  }

  slice() {
    this.total = of(
      this.tempData.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      ).length
    );
    this.total = of(this.tempData.length);
    this.RACameraList = of(
      this.tempData
        .map((div: any, SINo: number) => ({ SNo: SINo + 1, ...div }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        )
    );
  }

  StopApplication() {
    this.server.stopApp().subscribe(
      (response: any) => {
        console.log(response);
        if (response.success) {
          this.StopMockdrill();
          this.isActive = false;
          this.server.mechAppStatus.next(false);
          this.server.notification(response.message);
          this.modalService.dismissAll();
        } else {
          this.server.notification(response.message);
        }
      },
      (err) => {
        this.server.notification("Error while the process", "Retry");
      }
    );
  }
  StopFireApplication() {
    this.server.StopFireSmoke().subscribe(
      (response: any) => {
        console.log(response);
        if (response.success) {
          this.isActive3 = false;
          this.server.notification(response.message);
          this.modalService.dismissAll();
        } else {
          this.server.notification(response.message);
        }
      },
      (err) => {
        this.server.notification("Error while the process", "Retry");
      }
    );
  }

  StartAppConfig(event: any) {
    console.log(typeof event.target.value);
    this.AppConfig = Number(event.target.value);
  }

  DownloadCameraExcel() {
    this.isDownloading = true;
    this.server.DownloadCameraSheet().subscribe(
      (response: any) => {
        var contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        var fileName;

        console.log(response);
        const blob = new Blob([response], { type: ".xlsx" });
        // var fileName =  response.headers.get('Content-Disposition').split(';')[1];
        fileName =
          "camera_status_excel_sheet" +
          "_" +
          this.server.dateTransformbyPattern(
            new Date(),
            "yyyy_MM_dd_HH_mm_ss"
          ) +
          ".xlsx";
        const file = new File([blob], fileName, { type: ".xlsx" });
        this.isLoading = false;
        saveAs(file, fileName);
        this.isDownloading = false;
      },
      (err) => {
        this.isDownloading = false;
        console.log(err);
      }
    );
  }

  OnFileSelect($event: any) {
    var container = document.getElementById("ExcelContainer");
    container.classList.add("loading");
    this.isDownload = false;
    var file = $event.target.files[0];
    var formData = new FormData();
    formData.append("excel_file", file);
    console.log(formData);
    this.server.UploadCameraIPsFile(formData).subscribe(
      (response: any) => {
        this.server.notification(response.message);

        if (response.success) {
          this.server.TestCameraIps().subscribe(
            (response: any) => {
              if (response.success) {
                this.isDownload = true;
                container.classList.remove("loading");
              } else {
                this.isDownload = false;
              }
            },
            (Err) => {
              this.isDownload = false;
              container.classList.remove("loading");

              this.server.notification("Error during the process", "Retry");
            }
          );
        } else {
          this.isDownload = false;
          container.classList.remove("loading");

          this.server.notification(response.message);
        }
      },
      (Err) => {
        this.isDownload = false;
        container.classList.remove("loading");

        this.server.notification("Error while uploading the file");
      }
    );
  }
  AddSensgizData() {
    this.sensgiz.push(
      new FormGroup({
        coinId: new FormControl("", Validators.required),
        coinLocation: new FormControl("", Validators.required),
        presetId: new FormControl("", Validators.required),
      })
    );
  }

  DeleteSensgizData(i: number) {
    this.sensgiz.controls.splice(i, 1);
  }

  SensgizModal(modal: any) {
    this.sensgizModal = this.modalService.open(modal, {
      size: "lg",
      centered: true,
    });
  }

  SaveSensgizInfo() {
    this.SensGizInfo = [];
    this.sensgiz.controls.forEach((element: any, index: number) => {
      this.SensGizInfo.push({
        coin_id: element.value["coinId"],
        coin_location: element.value["coinLocation"],
        coin_key_id: index,
        preset_id: element.value["presetId"],
      });
    });
    this.sensgizModal.close();

    console.log(this.SensGizInfo);
  }

  EditCameraModal(modal: any, data: any) {
    this.SensGizInfo = [];
    this.sensgiz.reset();
    this.sensgiz = new FormArray([]);
    this.sensgiz.push(
      new FormGroup({
        coinId: new FormControl("", Validators.required),
        coinLocation: new FormControl("", Validators.required),
        presetId: new FormControl("", Validators.required),
      })
    );
    this.selectedCamera = data;
    this.EditCameraForm.get("cameraname").setValue(data.cameraname);
    // this.EditCameraForm.get('camera_brand').setValue(data.camera_brand)
    this.EditCameraForm.get("plant").setValue(data.plant);
    this.EditCameraForm.get("area").setValue(data.area);
    this.EditCameraForm.get("cameraip").setValue(data.camera_ip);
    this.EditCameraForm.get("department").setValue(data.department);
    if (data.alarm_type.hooter) {
      //
      this.isSensgiz = false;
      this.EditCameraForm.get("onlyHooter").setValue(true);
      this.EditCameraForm.get("onlyHooterIP").setValue(
        data.alarm_ip_address.hooter_ip
      );
    }

    if (data.alarm_type.relay) {
      this.isSensgiz = false;
      this.EditCameraForm.get("onlyRelay").setValue(true);
      this.EditCameraForm.get("onlyRelayIP").setValue(
        data.alarm_ip_address.relay_ip
      );
    }

    if (data.alarm_type.sensegiz == "sensegiz") {
      this.sensgiz = new FormArray([]);
      this.SensGizInfo = data.coin_details;
      this.isHooter = false;
      this.isRelay = false;
      this.isSensgiz = true;
      if (data.coin_details != null) {
        data.coin_details.forEach((value: any, index: number) => {
          this.sensgiz.push(
            new FormGroup({
              coinId: new FormControl("", Validators.required),
              coinLocation: new FormControl("", Validators.required),
              presetId: new FormControl("", Validators.required),
            })
          );

          this.sensgiz.controls[index].get("coinId").setValue(value.coin_id);
          this.sensgiz.controls[index]
            .get("coinLocation")
            .setValue(value.location);
          this.sensgiz.controls[index].get("presetId").setValue(value.location);
        });
      }
      this.EditCameraForm.get("isHooter").setValue("sensegiz");
    }
    if (data.alarm_type.hooter) {
      let index = this.alarmVersions.findIndex(
        (item: any) => item.data == data.alarm_version.hooter
      );
      index != -1
        ? this.EditCameraForm.get("onlyHooterVersion").setValue(
            this.alarmVersions[index]
          )
        : "";
    }
    if (data.alarm_type.relay) {
      let index = this.alarmVersions.findIndex(
        (item: any) => item.data == data.alarm_version.relay
      );
      index != -1
        ? this.EditCameraForm.get("onlyRelayVersion").setValue(
            this.alarmVersions[index]
          )
        : "";
    }

    this.modalService
      .open(modal, { size: "lg", centered: true, backdrop: "static" })
      .result.then(
        (result) => {
          this.isHooter = false;
          this.isRelay = false;
          this.isVoiceAlert = false;
          console.log("cancel");
          this.sensgiz.reset();
          this.sensgiz = new FormArray([]);
          this.AddCameraForm.reset();
          this.EditCameraForm.reset();
          this.isFail = false;
          this.isSuccess = false;
          this.isLoading = false;
        },
        (reason) => {
          this.isHooter = false;
          this.isRelay = false;
          this.isVoiceAlert = false;
          console.log("submit");
          this.isLoading = false;
          this.EditCameraForm.reset();
          this.AddCameraForm.reset();
          this.isFail = false;
          this.sensgiz.reset();
          this.sensgiz = new FormArray([]);
          this.sensgiz.push(
            new FormGroup({
              coinId: new FormControl("", Validators.required),
              coinLocation: new FormControl("", Validators.required),
              presetId: new FormControl("", Validators.required),
            })
          );

          this.isSuccess = false;
        }
      );
  }

  OnEditCameraDetails() {
    // this.AddCameraForm.get('rtsp_url').value?this.removeValidators():''
    this.EditCameraForm.updateValueAndValidity();
    if (true) {
      this.isLoading = true;
      var formData = new FormData();
      this.isFail = false;
      this.isSuccess = false;
      console.log(this.EditCameraForm.value);

      // if (this.AddCameraForm.get('rtsp_url').value) {
      console.log("rtsp adding");
      var ai_solution = Array;
      console.log(ai_solution);
      if (
        this.EditCameraForm.get("onlyHooter").value ||
        this.EditCameraForm.get("onlyRelay").value ||
        this.EditCameraForm.get("isHooter").value ||
        this.EditCameraForm.get("isRelay").value
      ) {
        var data1: any = {
          id: this.selectedCamera._id.$oid,
          cameraname: this.EditCameraForm.value["cameraname"],
          plant: this.EditCameraForm.value["plant"],
          area: this.EditCameraForm.value["area"],
          department: this.EditCameraForm.value["department"],
          alarm_type: {
            hooter: this.EditCameraForm.get("onlyHooter").value,
            relay: this.EditCameraForm.get("onlyRelay").value,
          },
          // alarm_enable:{hooter:this.AddCameraForm.get('isHooter').value,relay:this.AddCameraForm.get('isRelay').value},
          alarm_enable: true,
          alarm_ip_address: {
            hooter_ip: this.EditCameraForm.get("onlyHooterIP").value
              ? this.EditCameraForm.get("onlyHooterIP").value
              : null,
            relay_ip: this.EditCameraForm.get("onlyRelayIP").value
              ? this.EditCameraForm.get("onlyRelayIP").value
              : null,
          },
          alarm_version: { hooter: null, relay: null },
        };
        console.log(data1);
      }

      //altered
      else if (this.isVoiceAlert) {
        var data1: any = {
          id: this.selectedCamera._id.$oid,
          cameraname: this.EditCameraForm.value["cameraname"],
          plant: this.EditCameraForm.value["plant"],
          area: this.EditCameraForm.value["area"],
          alarm_type: "voiceAlert",
          department: this.EditCameraForm.value["department"],
          alarm_ip_address: this.EditCameraForm.value["voiceLanguage"],
          //  ai_solution: []
        };
      } else if (this.isSensgiz) {
        var data1: any = {
          id: this.selectedCamera._id.$oid,
          cameraname: this.EditCameraForm.value["cameraname"],
          plant: this.EditCameraForm.value["plant"],
          area: this.EditCameraForm.value["area"],
          department: this.EditCameraForm.value["department"],
          alarm_type: "sensegiz",
          coin_details: this.SensGizInfo,
        };
      } else {
        var data1: any = {
          id: this.selectedCamera._id.$oid,
          cameraname: this.EditCameraForm.value["cameraname"],
          plant: this.EditCameraForm.value["plant"],
          area: this.EditCameraForm.value["area"],
          coin_details: null,
          department: this.EditCameraForm.value["department"],
          alarm_type: {
            hooter: null,
            relay: null,
          },
          alarm_enable: true,
          //alarm_enable:{hooter:this.AddCameraForm.get('isHooter').value,relay:this.AddCameraForm.get('isRelay').value},
          alarm_ip_address: {
            hooter: null,
            relay: null,
          },
          alarm_version: { hooter: null, relay: null },
        };
      }
      this.EditCameraForm.get("onlyHooter").value
        ? (data1["alarm_version"].hooter = this.EditCameraForm.get(
            "onlyHooterVersion"
          ).value
            ? this.EditCameraForm.get("onlyHooterVersion").value["data"]
            : "")
        : "";
      this.EditCameraForm.get("onlyRelay").value
        ? (data1["alarm_version"].relay = this.EditCameraForm.get(
            "onlyRelayVersion"
          ).value
            ? this.EditCameraForm.get("onlyRelayVersion").value["data"]
            : "")
        : "";
      this.server.EditCamera(data1).subscribe(
        (response: any) => {
          if (response.success) {
            this.isLoading = false;
            this.isSuccess = true;

            this.responseMessage = response.message;

            this.isHooter = false;
            this.isRelay = false;
            this.server.notification(response.message);
            setTimeout(() => {
              this.modalService.dismissAll();
            }, 1000);
            this.GetCameraList();
          } else {
            this.isLoading = false;
            this.responseMessage = response.message;
            this.isFail = true;
          }
        },
        (Err) => {
          this.isFail = true;
          this.responseMessage = "Error while adding camera,retry";
          this.isLoading = false;
        }
      );

      // }
    }
  }

  StartFireSmokeApp() {
    var Config = {
      media_type: this.fireSmokeConfig.get("mediaType").value,
      data_interval: this.fireSmokeConfig.get("dataInterval").value,
    };
    console.log(Config);
    this.server
      .ConfigRtsp(this.startAppConfig.get("fireRtspConfig").value)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.server.StartFireSmoke(Config).subscribe(
              (response: any) => {
                if (response.success) {
                  this.isActive3 = true;
                  this.server.notification(response.message);
                  this.modalService.dismissAll();
                } else {
                  this.server.notification(response.message);
                }
              },
              (Err) => {
                this.server.notification("Something went wrong", "Retry");
              }
            );
          } else {
            this.server.notification(res.message, "Retry");
          }
        },
        (err) => {
          this.server.notification("Error while the process", "Retry");
        }
      );
  }

  SetMockdrill() {
    this.server.SetMockDrill(1).subscribe(
      (response: any) => {
        this.server.notification(response.message);
        if (response.success) {
          this.isActive2 = true;
          this.modalService.dismissAll();
        }
      },
      (Err) => {
        this.server.notification("Something Went Wrong", "Retry");
      }
    );
  }

  StopMockdrill() {
    this.server.SetMockDrill(0).subscribe(
      (response: any) => {
        this.server.notification(response.message);
        if (response.success) {
          this.isActive2 = false;
          this.modalService.dismissAll();
        }
      },
      (Err) => {
        this.server.notification("Something Went Wrong", "Retry");
      }
    );
  }

  StartSpillageApp() {
    var configData: any = {
      media_type: this.spillageConfig.get("mediaType").value,
      data_interval: this.spillageConfig.get("dataInterval").value,
    };

    this.server
      .ConfigRtsp(this.startAppConfig.get("spillageRTSPConfig").value)
      .subscribe((response: Response) => {
        if (response.success) {
          this.server
            .StartSpillageApp(configData)
            .subscribe((response: Response) => {
              if (response.success) {
                this.isSpillageActive = true;
                this.server.notification(response.message);
                this.modalService.dismissAll();
              } else {
                this.server.notification(response.message, "Retry");
              }
            });
        } else {
          this.server.notification(response.message);
        }
      });
  }
  StopSpillageAppication() {
    this.server.StopSpillageApp().subscribe((response: Response) => {
      if (response.success) {
        this.isSpillageActive = false;
        this.server.notification(response.message);
        this.modalService.dismissAll();
      } else {
        this.server.notification(response.message, "Retry");
      }
    });
  }

  GetCameraSampleSheet() {
    this.server.getCameraExcelSample().subscribe(
      (response: any) => {
        // var blob=new Blob([response.body],{type:'.xlsx'})
        // var fileName="Camera_Ref_Excel_Sheet.xlsx"
        // var file= new File([blob],fileName,{type:'xlsx'})
        const contentDispositionHeader = response.headers.get(
          "content-disposition"
        );
        console.log(response.headers);
        const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = fileNameRegex.exec(contentDispositionHeader);
        const fileName =
          matches && matches.length > 1 ? matches[1] : "Add_camera_excel.xlsx";

        saveAs(response.body, fileName);
      },
      (Err) => {
        console.log(Err);
        this.server.notification("Error while Downloading the Sheet", "Retry");
      }
    );
  }

  onImageLoad() {
    this.isImgLoading = false;
  }
  ToggleShowUpload() {
    this.showUploadOption = !this.showUploadOption;
  }
  GetLicenseDetails() {
    this.server.GetLicenseDetails().subscribe(
      (response: any) => {
        if (response.success) {
          this.licenseDetails = response.message;
        } else {
        }
      },
      (Err) => {}
    );
  }

  CheckApplicationStatus() {
    this.server.CheckApplicationStatus().subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        //this.isActive=true
        localStorage.setItem("appStatus", response.message[0].process_status);
        var process = response.message.find((el: any) => {
          return el.process_name == "docketrun-app" ? el : "";
        });
        this.isActive = process.process_status;

        var process2 = response.message.find((el: any) => {
          return el.process_name == "smrec" ? el : "";
        });
        var process3 = response.message.find((el: any) => {
          return el.process_name == "fire_smoke_app" ? el : "";
        });
        this.isActive3 = process3.process_status;

        var process4 = response.message.find((el: any) => {
          return el.process_name == "spillage_app" ? el : "";
        });
        this.isSpillageActive = process4 ? process4.process_status : "";
      }
    });
  }
  OnJobsheetUploaded(file: File) {
    this.formdata.append("file", file);
    this.isSuccess = false;
    this.isFail = false;
    this.responseMessage = "";
    this.jobFileStatus = true;
    console.log(this.formdata.get("file"), "in component");
  }
  OnAddMechJobsBySheet() {
    this.isLoading2 = true;
    var formdata = { file: this.formdata.get("file") };
    this.server.AddMechJobByExcel(this.formdata).subscribe(
      (response: any) => {
        if (response.success) {
          this.isLoading2 = false;
          this.GetCameraList();
          this.isSuccess = false;
          this.isFail = false;
          this.responseMessage = "";
          this.mechJobsheet = null;
          this.formdata.delete("file");
          setTimeout(() => {
            this.modalService.dismissAll();
          }, 1000);
        } else {
          this.isFail = true;
          this.responseMessage = response.message;
          this.isLoading2 = false;
        }
      },
      (Err) => {
        this.isLoading2 = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
    clearInterval(this.checkApplicationStatusInterval);
  }
}
