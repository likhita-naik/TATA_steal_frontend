import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  PatternValidator,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Observable, of } from "rxjs";
import { Router } from "@angular/router";
import { Lightbox, LightboxConfig } from "ngx-lightbox";
import { validateVerticalPosition } from "@angular/cdk/overlay";
import { SteamSuitService } from "../steam-suit-detection/steamSuitDetection.service";

@Component({
  selector: "app-steam-suit-settings",
  templateUrl: "./steam-suit-settings.component.html",
  styleUrls: ["./steam-suit-settings.component.css"],
})
export class SteamSuitSettingsComponent implements OnInit {
  AddCameraForm: FormGroup = new FormGroup({
    cameraname: new FormControl("", Validators.required),
    camera_brand: new FormControl("", Validators.required),
    cameraip: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    password: new FormControl(
      "",
      Validators.pattern(RegExp(/^[a-zA-Z0-9\s]*$/))
    ),
    plant: new FormControl("", Validators.required),
    department: new FormControl("", Validators.required),
    area: new FormControl("", Validators.required),
    port: new FormControl("", Validators.required),
    rtsp_url: new FormControl(""),
    isHooter: new FormControl(""),
    isRelay: new FormControl(""),
    isSensgiz: new FormControl(""),
    hooterIp: new FormControl(""),
    hooterConfig: new FormControl(""),
    relayIp: new FormControl(""),
    voiceLang: new FormControl(""), //altered voice language settings
  });
  keys: any = Object.keys;
  appIsOn: boolean = false;
  AppConfig: number;
  l1Data: any[] = [];
  startAppConfig: FormControl = new FormControl();
  cameraRoiData: any;
  isAlerts: boolean = false;
  selectedCamera: any;

  setValueForm: FormGroup = new FormGroup({
    set1: new FormGroup({
      value: new FormControl(0, [
        Validators.required,
        Validators.pattern(new RegExp("^(?!-)[0-1]+$")),
      ]),
    }),
    set2: new FormGroup({
      value: new FormControl(0, [
        Validators.required,
        Validators.pattern(new RegExp("^(?!-)[0-1]+$")),
      ]),
    }),
    set3: new FormGroup({
      value: new FormControl(0, [
        Validators.required,
        Validators.pattern(new RegExp("^(?!-)[0-1]+$")),
      ]),
    }),
    set4: new FormGroup({
      value: new FormControl(0, [
        Validators.required,
        Validators.pattern(new RegExp("^(?!-)[0-1]+$")),
      ]),
    }),
    manualPersonCount: new FormControl(0, [
      Validators.required,
      Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
    ]),
    remotePersonCount: new FormControl(0, [
      Validators.required,
      Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
    ]),
    analyticsTime: new FormControl(0, [
      Validators.required,
      Validators.pattern(new RegExp("^(?!-)[0-9]+$")),
    ]),

    // maxPersonCount:new FormControl(0,Validators.required)
  });
  isHooter: boolean = false;
  isRelay: boolean = false;
  FCaddedMethod: any;
  isSuccess: boolean = false;
  isFail: boolean = false;
  mainCameraId: string = "";
  dataFetchStatus:string=''
  responseMessage: any = "";
  isLoading: boolean = false;
  isFormValid: boolean = false;
  activeStepIndex: number = 0;
  dropdownSettings2: Observable<IDropdownSettings> = of({
    singleSelection: true,
    idField: "id",
    textField: "text",
    disabledField: "isDisabled",
    closeDropDownOnSelection: true,
    clearSearchFilter: true,
    searchPlaceholderText: "Search",
    noDataAvailablePlaceholderText: "No data available",
    noFilteredDataAvailablePlaceholderText: "No filtered data available",
    showSelectedItemsAtTop: false,
    defaultOpen: false,
    allowRemoteDataSearch: false,
  });
  alertForm: FormGroup = new FormGroup({
    alarmType: new FormControl("", Validators.required),
    alarmIp: new FormControl("", Validators.required),
    hooterIp: new FormControl(""),
    relayIp: new FormControl(""),
  });
  items = [
    {
      label: "Add First Camera",
    },
    {
      label: "Add Second Camera",
    },
    {
      label: "Add Alarm type",
    },
  ];

  cameraDetails:Observable< any[]> =of( []);

  cameraBrandList: Observable<any[]> = of([{ id: 1, text: "cp_plus" }]);

  constructor(
    private modalService: NgbModal,
    public Server: SteamSuitService,
    private router: Router,
    public lightbox: Lightbox,
    private lightBoxConfig: LightboxConfig
  ) {}
  ngOnInit(): void {
    this.GetCameraDetails();
    this.GetCameraBrands();

    this.GetL1data();
    this.Server.CheckApplicationStatus().subscribe((response: any) => {
      if (response.success) {
        var process = response.message.find((el: any) => {
          return el.process_name == "tg_steamsuit" ? el : "";
        });

        this.appIsOn = process?.process_status;

        // this.isActive=true
      }
    });
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
        this.AddCameraForm.get("area").value
      ) {
        this.isFormValid = true;
      } else {
        this.isFormValid = false;
      }
    });
  }

  OpenModal(modal: any, size: any, details?: any, type?: any) {
    this.isAlerts = true;

    if (type == "first") {
      this.cameraRoiData = { _id: details._id.$oid, type: type };
    }
    if (type == "second") {
      this.cameraRoiData = { _id: details._id.$oid, type: type };
    }
    this.selectedCamera = details ? details : null;
    this.modalService.open(modal, { size: size ,centered:true}).result.then((result) => {
      this.AddCameraForm.reset();
      this.activeStepIndex = 0;
      this.isSuccess = false;
      this.isFail = false;
      this.responseMessage = "";
      var step2Container = document.getElementById("step2");
      step2Container.classList.remove("active");
      var step2Container = document.getElementById("step3");
      step2Container.classList.remove("active");
      var step2Container = document.getElementById("step1");
      step2Container.classList.add("active");
      this.AddCameraForm.get("cameraip").enable();
      this.AddCameraForm.get("username").enable();
      this.AddCameraForm.get("password").enable();
      this.AddCameraForm.get("port").enable();
      this.AddCameraForm.get("rtsp_url").enable();

    },(reason)=>{
      this.AddCameraForm.reset();
      this.activeStepIndex = 0;
      this.isSuccess = false;
      this.isFail = false;
      this.responseMessage = "";
      var step2Container = document.getElementById("step2");
      step2Container.classList.remove("active");
      var step2Container = document.getElementById("step3");
      step2Container.classList.remove("active");
      var step2Container = document.getElementById("step1");
      step2Container.classList.add("active");
      this.AddCameraForm.get("cameraip").enable();
      this.AddCameraForm.get("username").enable();
      this.AddCameraForm.get("password").enable();
      this.AddCameraForm.get('port').enable()
      this.AddCameraForm.get("rtsp_url").enable();
    });

    // this.test()
  }
  OnAddFirstCamera() {
    this.AddCameraForm.updateValueAndValidity();
    if (this.isFormValid) {
      this.isLoading = true;
      var formData = new FormData();
      this.isFail = false;
      this.isSuccess = false;
      console.log(this.AddCameraForm.value);

      if (this.AddCameraForm.get("rtsp_url").value) {
        console.log("rtsp adding");
        var ai_solution = Array;
        console.log(ai_solution);

        var data1: any = {
          cameraname: this.AddCameraForm.value["cameraname"],
          camera_brand: this.AddCameraForm.value["camera_brand"][0].text,

          area: this.AddCameraForm.value["area"],
          rtsp_url: this.AddCameraForm.value["rtsp_url"],

          department: this.AddCameraForm.value["department"],
        };
        // this.AddCameraForm.removeControl('username')
        // this.AddCameraForm.removeControl('password')
        // this.AddCameraForm.removeControl('cameraip')
        // this.AddCameraForm.removeControl('port')
        this.Server.AddFirstCameraByRtsp(data1).subscribe(
          (response: any) => {
            console.log(response);
            this.GetCameraDetails();
            if (response.success) {
              this.isLoading = false;
              this.isSuccess = true;
              this.FCaddedMethod = "rtsp";
              this.responseMessage = response.message;
              this.mainCameraId = response.data._id.$oid;
              setTimeout(() => {
                // this.modalService.dismissAll()
                this.activeStepIndex++;
                this.AddCameraForm.reset();

                var step2Container = document.getElementById("step1");
                step2Container.classList.remove("active");
                var step2Container = document.getElementById("step2");
                step2Container.classList.add("active");
                this.isSuccess = false;
                this.isFail = false;
                this.responseMessage = "";

                this.AddCameraForm.get("area").setValue(response.data.area);
                this.AddCameraForm.get("department").setValue(
                  response.data.department
                );
                this.AddCameraForm.get("cameraip").disable();
                this.AddCameraForm.get("username").disable();
                this.AddCameraForm.get("password").disable();
                this.AddCameraForm.get("port").disable();
              }, 500);
              // this.GetCameraList()
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
        console.log(this.AddCameraForm.value["camera_brand"].text);

        var data: any = {
          cameraname: this.AddCameraForm.value["cameraname"],
          camera_brand: this.AddCameraForm.value["camera_brand"][0].text,
          area: this.AddCameraForm.value["area"],
          username: this.AddCameraForm.value["username"],
          password: this.AddCameraForm.value["password"],
          cameraip: this.AddCameraForm.value["cameraip"],
          port: this.AddCameraForm.value["port"],

          department: this.AddCameraForm.value["department"],
        };

        //    this.AddCameraForm.removeControl('rtsp_url')

        this.Server.AddFirstCameraByIp(data).subscribe(
          (response: any) => {
            console.log(response);
            //  this.AddCameraForm.addControl('rtsp_url', new FormControl('', Validators.required))
            this.GetCameraDetails();

            if (response.success) {
              this.responseMessage = response.message;
              this.isSuccess = true;
              this.isLoading = false;
              this.mainCameraId = response.data._id.$oid;
              this.FCaddedMethod = "ip";

              setTimeout(() => {
                this.activeStepIndex++;
                this.AddCameraForm.reset();

                var step2Container = document.getElementById("step1");
                step2Container.classList.remove("active");
                var step2Container = document.getElementById("step2");
                step2Container.classList.add("active");
                this.isSuccess = false;
                this.isFail = false;
                this.responseMessage = "";

                this.AddCameraForm.get("area").setValue(response.data.area);
                this.AddCameraForm.get("department").setValue(
                  response.data.department
                );

                this.AddCameraForm.get("rtsp_url").disable();

                this.isFail = false;
                this.responseMessage = "";
              }, 1000);
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
  GetL1data() {
    this.l1Data = [];
    this.Server.GetSetValueConfig().subscribe((response: any) => {
      if (response.success) {
        this.l1Data.push(response.message);
        this.setValueForm
          .get("set1")
          .get("value")
          .setValue(response.message.set1);
        this.setValueForm
          .get("set2")
          .get("value")
          .setValue(response.message.set2);
        this.setValueForm
          .get("set3")
          .get("value")
          .setValue(response.message.set3);
        this.setValueForm
          .get("set4")
          .get("value")
          .setValue(response.message.set4);
        this.setValueForm
          .get("manualPersonCount")
          .setValue(response.message.person_count_manual);
        this.setValueForm
          .get("remotePersonCount")
          .setValue(response.message.person_count_auto);

        this.setValueForm
          .get("analyticsTime")
          .setValue(response.message.analytics_stop_time);
      } else {
      }
    });
  }
  OnAddSecondCamera() {
    this.AddCameraForm.updateValueAndValidity();
    if (this.isFormValid) {
      this.isLoading = true;
      var formData = new FormData();
      this.isFail = false;
      this.isSuccess = false;
      if (this.AddCameraForm.get("rtsp_url").value) {
        var data1: any = {
          cameraname: this.AddCameraForm.value["cameraname"],
          camera_brand: this.AddCameraForm.value["camera_brand"][0].text,

          rtsp_url: this.AddCameraForm.value["rtsp_url"],
          id: this.mainCameraId,
        };

        // this.AddCameraForm.removeControl('username')
        // this.AddCameraForm.removeControl('password')
        // this.AddCameraForm.removeControl('cameraip')
        // this.AddCameraForm.removeControl('port')
        this.Server.AddSecondCameraByRtsp(data1).subscribe(
          (response: any) => {
            console.log(response);
            // this.AddCameraForm.addControl('username', new FormControl('', Validators.required))
            // this.AddCameraForm.addControl('password', new FormControl('', Validators.required))
            // this.AddCameraForm.addControl('cameraip', new FormControl('', Validators.required))
            // this.AddCameraForm.addControl('port', new FormControl('', Validators.required))

            if (response.success) {
              this.isLoading = false;
              this.isSuccess = true;

              this.responseMessage = response.message;
              this.GetCameraDetails();

              setTimeout(() => {
                // this.modalService.dismissAll()
                this.activeStepIndex++;
                this.AddCameraForm.reset();

                var step2Container = document.getElementById("step2");
                step2Container.classList.remove("active");
                var step2Container = document.getElementById("step3");
                step2Container.classList.add("active");
                this.isSuccess = false;
                this.isFail = false;
                this.responseMessage = "";
              }, 500);
              // this.GetCameraList()
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
        console.log(this.AddCameraForm.value["camera_brand"].text);

        var data: any = {
          id: this.mainCameraId,
          cameraname: this.AddCameraForm.value["cameraname"],
          camera_brand: this.AddCameraForm.value["camera_brand"][0].text,

          username: this.AddCameraForm.value["username"],
          password: this.AddCameraForm.value["password"],
          cameraip: this.AddCameraForm.value["cameraip"],
          port: this.AddCameraForm.value["port"],
        };

        //    this.AddCameraForm.removeControl('rtsp_url')

        this.Server.AddSecondCameraByIp(data).subscribe(
          (response: any) => {
            console.log(response);
            //  this.AddCameraForm.addControl('rtsp_url', new FormControl('', Validators.required))

            if (response.success) {
              this.GetCameraDetails();
              this.responseMessage = response.message;
              var step2Container = document.getElementById("step2");
              step2Container.classList.remove("active");
              var step2Container = document.getElementById("step3");
              step2Container.classList.add("active");
              this.isSuccess = false;
              this.isFail = false;
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
  SkipSecondcamera() {
    setTimeout(() => {
      this.activeStepIndex++;
      var step2Container = document.getElementById("step2");
      step2Container.classList.remove("active");
      var step2Container = document.getElementById("step3");
      step2Container.classList.add("active");
      this.isSuccess = false;
      this.isFail = false;
      this.responseMessage = "";
    }, 500);
  }
  GetCameraDetails() {
    this.dataFetchStatus='init'

    this.Server.GetSteamSuitCameraInfo().subscribe((response: any) => {
      if (response.success) {
        this.dataFetchStatus='success'
        this.cameraDetails = of( response.message);
      } else {
        this.dataFetchStatus='fail'
        this.responseMessage=response.message
        this.cameraDetails = of([]);
        this.Server.notification(response.message);
      }
    },Err=>{
      this.dataFetchStatus='error'
      this.responseMessage='Error while fetching the camera details.'

    });
  }

  IsDeleteCamera(modal: any, camera: any) {
    this.selectedCamera = camera;
    this.modalService.open(modal, {
      size: "md",
      centered: true,
      backdrop: "static",
    });
  }

  DeleteFirstCamera() {
    this.Server.DeleteMainSteamCamera(this.selectedCamera._id.$oid).subscribe(
      (response: any) => {
        if (response.success) {
          this.Server.notification(response.message);
          this.modalService.dismissAll();
          this.GetCameraDetails();
        } else {
          this.Server.notification(response.message, "Retry");
          this.modalService.dismissAll();
        }
      },
      (Err) => {
        this.Server.notification("Error while the process", "Retry");
      }
    );
  }

  hooterOrRelayConfig(event: any, modal?: any) {
    console.log(event.target.checked);
    if (event.target.value == "hooter") {
      this.isHooter = true;
      this.isRelay = false;
    }
    if (event.target.value == "relay") {
      this.isHooter = false;
      this.isRelay = true;
    }
  }
  test() {
    var step2Container = document.getElementById("step1");
    step2Container.classList.remove("active");
    var step2Container = document.getElementById("step2");
    step2Container.classList.remove("active");
    var step2Container = document.getElementById("step3");
    step2Container.classList.add("active");
  }

  onAddAlarm() {
    var data = {
      id: this.mainCameraId,
      alarm_type: this.alertForm.get("alarmType").value,
      alarm_ip_address:
        this.alertForm.get("alarmType").value == "relay"
          ? this.alertForm.get("relayIp").value
          : this.alertForm.get("hooterIp").value,
      alarm_enable: true,
    };

    this.Server.AddAlarmToSteamSuit(data).subscribe((response: any) => {
      this.Server.notification(response.message);
      if (response.success) {
        this.modalService.dismissAll();
        this.GetCameraDetails();
      }
    });
  }
  OnCloseModals() {
    this.modalService.dismissAll();
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

  StartApplication() {
    this.Server.StartSteamSuitApp().subscribe((response: any) => {
      if (response.success) {
        this.appIsOn = true;
        this.Server.notification(response.message);
        this.modalService.dismissAll();
      } else {
        this.Server.notification(response.message, "Retry");
      }
    });
  }
  IsStopApplication(modal: any) {
    this.modalService.open(modal, { centered: true, backdrop: "static" });
  }
  StopApplication() {
    this.Server.StopSteamSuitApp().subscribe((response: any) => {
      if (response.success) {
        this.appIsOn = false;

        this.Server.notification(response.message);
        this.modalService.dismissAll();
      } else {
        this.Server.notification(response.message, "Retry");
      }
    });
  }
  onCamRoiModalClose(event: any) {
    this.modalService.dismissAll();
  }

  AddSetValues() {
    var setValue = {
      data: {
        set1: this.setValueForm.get("set1").get("value").value,

        set2: this.setValueForm.get("set2").get("value").value,

        set3: this.setValueForm.get("set3").get("value").value,

        set4: this.setValueForm.get("set4").get("value").value,
        person_count_manual: this.setValueForm.get("manualPersonCount").value,
        person_count_auto: this.setValueForm.get("remotePersonCount").value,
        analytics_stop_time: this.setValueForm.get("analyticsTime").value,
      },
    };

    this.Server.SetValueConfig(setValue).subscribe(
      (response: any) => {
        if (response.success) {
          this.Server.notification(response.message);
          this.modalService.dismissAll();
          this.GetL1data()
        } else {
          this.GetL1data()

          this.Server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        this.modalService.dismissAll();
      }
    );
  }

  onImageClick(details: any, type?: string) {
    var imgArr: any[] = [
      {
        src:
          this.Server.IP +
          "/get_steamroi_image/" +
          (type == "first"
            ? details.main_camera.imagename
            : details.sub_camera.imagename),

        thumb:
          this.Server.IP +
          "/get_steamroi_image/" +
          (type == "first"
            ? details.main_camera.imagename
            : details.sub_camera.imagename),
        caption:
          type == "first"
            ? details.main_camera.cameraname
            : details.sub_camera.cameraname,
      },
    ];
    console.log(imgArr);
    this.lightbox.open(imgArr, 0);
  }
  GetCameraBrands() {
    this.Server.GetCameraBrandDetails().subscribe((response: any) => {
      var temp: any[] = [];
      if (response.success) {
        response.message.forEach((element: any, id: number) => {
          temp.push({ text: element, id: id });
        });
      }

      this.cameraBrandList = of(temp);
    });
  }
  StartAppConfig(event: any) {
    this.AppConfig = Number(event.target.value);
  }
  StartAppModal(modal: any) {
    // this.startAppConfig.setValue(0)
    this.modalService.open(modal, { centered: true, backdrop: "static" });
  }
}
