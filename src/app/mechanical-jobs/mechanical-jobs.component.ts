import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Observable, of, Subscription } from "rxjs";
import { ServerService } from "src/app/Services/server.service";
import { saveAs } from "file-saver";

import {
  NgbCarouselConfig,
  NgbModal,
  NgbOffcanvas,
  NgbOffcanvasConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Lightbox, LightboxConfig } from "ngx-lightbox";
import crypto from "crypto-js";
import { HttpClient } from "@angular/common/http";
import { Title } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-mechanical-jobs",
  templateUrl: "./mechanical-jobs.component.html",
  styleUrls: ["./mechanical-jobs.component.css"],
})
export class MechanicalJobsComponent {
  dropdownSettings: IDropdownSettings;
  prevsheetStatus: boolean = true;
  currentSheetStatus: boolean = true;
  highlightedRow: number = null;
  jobAddMethod: FormControl = new FormControl("", Validators.required);
  dropdownSettings2: IDropdownSettings;
  panelNumbers: Observable<any[]>;
  ips: Observable<any[]>;
  table: HTMLElement;
  httprequests: any[] = [];
  filterrequest: any;
  loading3: boolean = false;
  dataFetchStatus: string = "";
  isFilter: boolean = false;
  JobNoList: Observable<any[]> = of([]);
  Array = Array;
  jobFileStatus: boolean = false;
  selectedPanel?: any;
  panelSelected: any;
  isHidePanel: boolean = true;
  ipSelected: any = "";
  departments: Observable<any[]> = of([]);
  depSelected: any = null;
  shutdownInfo: any;
  selectedDep: any = "";
  total: Observable<number> = of(0);
  page: number = 1;
  pageSize: number = 10;
  tempData: any[] = [];
  isLoading: boolean = false;
  isLoading2: boolean = false;
  isLoading3: boolean = false;
  editField: string;
  intervalTime: number;
  selectedRiro: any;
  Images: any[] = [];
  intervalforData: any;
  deleteJob: any;
  prevLiveCount: number;
  conveyorImage: Observable<string> = of("");
  selectedField: string = "";
  violationCount: Observable<any> = of(0);
  violCountTemp: number = 0;
  jobTypeList: Observable<any[]> = of([]);
  jobTypes: Observable<any[]> = of([
    { text: "HT", id: 0 },
    { text: "Conveyor", id: 1 },
    { text: "Hydraulic", id: 2 },
    { text: "Pneumatic", id: 3 },
    { text: "LT", id: 4 },
    { text: "Uceil", id: 5 },
    // { item_text: 'Isolating Area', item_id: 6 },
  ]);
  selectedJobType: any;
  jobTypeSelected: any;
  rtspLiveIp: Observable<any>;
  riHeaderCount: number = 2;
  roHeaderCount: number = 2;
  queryParams: any;
  tagnames: any[] = [];
  startAppConfig: FormControl = new FormControl("", Validators.required);
  AppConfig: number = 0;
  IP: any;
  shutdownName: FormControl = new FormControl("jobsheet", Validators.required);
  currentShutdown: string = "Mechanical Jobs";
  jobsheetID: string;
  isNewJob: boolean = false;
  tempField: FormControl = new FormControl("", Validators.required);
  cameraBrandList: Observable<any[]> = of([{ id: 1, text: "cp_plus" }]);
  jobsheetData: Observable<any[]> = of([]);
  columns: any[] = [];
  selectedColumn: any[] = [];
  selectedJobsheet: any;
  selectedPanels: any[] = [];
  selectedIp?: any;
  selectedJobNo: any;
  excelLoad: boolean = false;
  Interval: any;
  isActive: boolean = false;
  isActive2: boolean = false;
  isEditMode: boolean = false;
  editedRackProc: any;
  selectedEditIndex: any;
  appStatus: boolean = false;
  isLive: boolean = true;
  loader2: boolean = true;
  isSuccess: boolean = false;
  isFail: boolean = false;
  responseMessage: string = "";
  licenseMessage: any = "";
  selectedJob: any;
  isDesc: boolean = false;
  interval2: any;
  userType!: string;
  isImgLoading: boolean = false;
  Jobsheet: File;
  @ViewChild("errorMessage", { static: false }) licenseErrorModal: any;

  fiveMeter: FormControl = new FormControl("", Validators.required);
  jobsStatus: any = { not_processed: 0, processed_count: 0, total_jobs: 0 };
  remarkControl: FormControl = new FormControl("", Validators.required);
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
    area: new FormControl("", Validators.required),
    port: new FormControl("", Validators.required),
    job_description: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required),
    department: new FormControl("", Validators.required),
    board: new FormControl("", Validators.required),
    tagname: new FormControl("", Validators.required),
    rtsp_url: new FormControl(""),
    isHooter: new FormControl(""),
    isRelay: new FormControl(""),
    jobInfo: new FormControl(""),
    hooterIp: new FormControl(""),
    hooterConfig: new FormControl(""),
    no_of_isolating_points: new FormControl("", Validators.required),
    isolating_locations: new FormControl("", Validators.required),
    relayIp: new FormControl(""),
  });

  isHistory: Boolean = false;
  isFormValid: boolean = false;
  dataHeaders: any[] = [
    { item_text: "Job No", item_id: 0 },
    { item_text: "Job Type", item_id: 25 },
    { item_text: "Department", item_id: 26 },
    { item_text: "Camera ID", item_id: 29 },
    { item_text: "Sub Area", item_id: 2 },
    { item_text: "Job Description", item_id: 3 },
    { item_text: "Feeder Number", item_id: 4 },
    { item_text: "Tag Name", item_id: 28 },
    { item_text: "Job Status", item_id: 8 },
    { item_text: "RO Time", item_id: 9 },
    { item_text: "RO Method", item_id: 10 },
    { item_text: "Not Recognized", item_id: 24 },
    { item_text: "5 Meter violation", item_id: 20 },
    { item_text: "PPE Violation", item_id: 14 },
    { item_text: "Remark", item_id: 15 },
    { item_text: "Lock History", item_id: 30 },
    { item_text: "Edit", item_id: 16 },
    { item_text: "Delete Panel", item_id: 31 },
    { item_text: "Delete Job", item_id: 32 },
  ];
  @ViewChild("unAllocatedJobAlert") Violation: ElementRef<any>;
  addedJob: any;
  tempAddedJob: any;
  unallocatedJobData: any;
  unallocatedJob: boolean = false;
  previouslivecount: any;
  interval: any;
  dashboardInterval: any;

  // @ViewChildren(NgbdSortableHeader) sortableHeaders: QueryList<NgbdSortableHeader>

  dataJobsheets: Observable<any[]> = of([]);

  constructor(
    public server: ServerService,
    public http: HttpClient,
    public router: Router,
    public currentRoute: ActivatedRoute,
    public offService: NgbOffcanvas,
    public offcanvasConfig: NgbOffcanvasConfig,
    public modalService: NgbModal,
    public _lightbox: Lightbox,
    public toasterService: ToastrService,
    public _lightBoxConfig: LightboxConfig,
    public ngbCarousal: NgbCarouselConfig
  ) {
    this.currentRoute.queryParams.subscribe((data: any) => {
      this.isHistory = data.isHistory;
      if (this.isHistory) {
        this.jobsheetID = data.jobsheetId;
      } else {
        this.GetTittle();
      }
      this.queryParams = data;
      let userData: any = sessionStorage.getItem("session");
      var decodedString = crypto.AES.decrypt(userData, this.server.secretKey);
      userData = JSON.parse(decodedString.toString(crypto.enc.Utf8));
      this.userType = userData.userType;
    });
    offcanvasConfig.scroll = true;
    this.offcanvasConfig.position = "end";
    this.ngbCarousal.wrap = false;
    this.ngbCarousal.interval = 10000;
    this.ngbCarousal.wrap = false;
    this.ngbCarousal.keyboard = false;
    this.ngbCarousal.pauseOnHover = false;
    this._lightBoxConfig.showDownloadButton = true;

    this.IP = this.server.IP;
    this.intervalTime = this.server.jobsheetInterval;
    // this.interval = this.server.jobsheetDataInterval
    this.intervalforData = this.server.jobsheetDataInterval;
    this.dashboardInterval = this.server.dashboardInterval;
    this.GetJobsheetStatus();
    this.GetjobTypeList();
    this.GetJobNoList();

    this.interval = setInterval(() => {
      this.server.CheckApplicationStatus().subscribe((response: any) => {
        if (response.success) {
          var process = response.message.find((el: any) => {
            return el.process_name == "esi-monitor" ? el : "";
          });

          this.isActive = process.process_status;
          // this.isActive = false
          if (response.success) {
            var process = response.message.find((el: any) => {
              return el.process_name == "hydra-app" ? el : "";
            });

            this.isActive2 = process?.process_status;
            // this.isActive2 = false
          }
          // this.isActive=true
        }
      });
    }, this.dashboardInterval);

    this.GetCameraBrands();

    this.GetIPList();
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

    this.dropdownSettings2 = {
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
    };
    //this.getJobsheetData()
    this.server.GetUnAllocatedCount().subscribe((response: any) => {
      if (response.success) {
        this.prevLiveCount = response.now_live_count;
      }
    });
  }

  ngOnInit(): void {
    this.startAppConfig.setValue(0);
    var table = document.getElementById("dataTable");
    // table.classList.add("loading");
    this.dataFetchStatus = "init";
    this.GetPanelList();
    this.isHistory
      ? this.OnJobsheetSelect(this.queryParams.jobsheetId)
      : this.server.GetJobSheet().subscribe(
          (response: any) => {
            // table.classList.remove("loading");

            if (response.job_sheet_status) {
              if (response.success) {
                if (!this.isFilter) {
                  this.total = of(response.message.length);

                  //  this.table!=null? this.table.classList.remove('loading'):''
                  this.tempData = response.message;
                  this.tempData = this.ModifyData(this.tempData);
                  this.tempData = this.SortLivewise(this.tempData);
                  this.sliceData();
                  this.CheckViolation(response.message);
                }
              } else {
                this.table != null
                  ? this.table.classList.remove("loading")
                  : "";
                this.server.notification(response.message, "Retry");
                this.total = of(0);
                //this.jobsheetData = of(response.message)
                this.tempData = [];
                this.sliceData();
              }
            } else {
              //this.router.navigate(["app/jobsheetUpload"]);
            }
          },
          (err) => {
            this.server.notification("Error while fetching the data", "Retry");
            table.classList.remove("loading");
          }
        );
  }

  ngAfterViewInit(): void {
    this.table = document.getElementById("dataTable");

    this.GetDepList();
    this.queryParams.isHistory ? "" : this.getJobsheetData();
    this.queryParams.isHistory ? "" : this.GetJobsheetStatus();
    this.queryParams.isHistory
      ? ""
      : (this.Interval = setInterval(
          () => {
            {
              //this.jobSheetHttpRequest?  this.jobSheetHttpRequest.unsubscribe():''
              this.ShowData();
            }
          },
          this.isActive
            ? this.intervalforData
            : this.server.jobsheetDataInterval2
        ));
    this.queryParams.isHistory
      ? ""
      : (this.interval2 = setInterval(
          () => {
            {
              //this.jobSheetHttpRequest?  this.jobSheetHttpRequest.unsubscribe():''
              this.GetJobsheetStatus();
            }
          },
          this.isActive ? this.intervalTime : this.server.jobsheetDataInterval2
        ));
    this.AddCameraForm.valueChanges.subscribe((value) => {
      if (
        this.AddCameraForm.get("no_of_isolating_points").value &&
        this.AddCameraForm.get("isolating_locations").value &&
        this.AddCameraForm.get("cameraip").value &&
        this.AddCameraForm.get("port").value &&
        this.AddCameraForm.get("camera_brand").value &&
        this.AddCameraForm.get("username").value &&
        this.AddCameraForm.get("password").value &&
        this.AddCameraForm.get("area").value &&
        this.AddCameraForm.get("department").value
      ) {
        if (this.AddCameraForm.get("type").value[0].text == "HT") {
          if (true) {
            this.isFormValid = true;
            // this.AddCameraForm.get('rtsp_url').setValue('')
            // this.AddCameraForm.get('password').dirty
          } else {
            this.isFormValid = false;
          }
        } else {
          this.isFormValid = true;
        }
      } else if (
        this.AddCameraForm.get("no_of_isolating_points").value &&
        this.AddCameraForm.get("isolating_locations").value &&
        this.AddCameraForm.get("camera_brand").value &&
        this.AddCameraForm.get("rtsp_url").value &&
        this.AddCameraForm.get("area").value &&
        this.AddCameraForm.get("department").value
      ) {
        if (this.AddCameraForm.get("type").value[0].text == "HT") {
          if (true) {
            this.isFormValid = true;
          } else {
            this.isFormValid = false;
          }
        } else {
          this.isFormValid = true;
        }
      } else {
        this.isFormValid = false;
      }
    });
    this.jobAddMethod.valueChanges.subscribe((data: any) => {
      this.isFail = false;
      this.isSuccess = false;
      this.responseMessage = "";
      this.isLoading = false;
      this.isLoading2 = false;
      this.isLoading3 = false;
      this.addedJob = null;
      this.tempAddedJob = null;
    });
  }

  JobsheetDownload() {
    this.excelLoad = true;
    var jobsheetName: string = "";
    this.server
      .CreateJobsheetExcel(this.isHistory ? this.jobsheetID : null)
      .subscribe(
        (Response: any) => {
          if (Response.success) {
            jobsheetName = Response?.filename
              ? Response.filename
              : "Jobsheet" +
                this.server.dateTransformbyPattern(
                  new Date(),
                  "YYYY_MM_dd_HH_mm_ss"
                ) +
                ".xlsx";

            this.server.DownloadJobsheet().subscribe(
              (response: any) => {
                this.excelLoad = false;
                this.excelLoad = false;
                const blob = new Blob([response], { type: ".xlsx" });
                // var fileName =  response.headers.get('Content-Disposition').split(';')[1];
                const file = new File([blob], jobsheetName, { type: "xlsx" });
                saveAs(file, jobsheetName);
              },
              (err) => {
                this.excelLoad = false;
                this.server.notification(err.text);
              }
            );
          } else {
            this.server.notification(Response.message, "Retry");
            this.excelLoad = false;
            // this.isExcel = false
            // this.alertmessage = Response.message
            // this.isalert = true
          }
        },
        (err) => {
          this.excelLoad = false;

          // this.isExcel = false
          this.server.notification("Unable to connect to server", "Retry");
        }
      );
  }

  GetIPList(data?: {
    type: string | null;
    job_no: string | null;
    department: string | null;
  }) {
    var ips: any[] = [];
    var ipsList: any[] = [{ key: 0, label: "All IPs", data: "all_ip" }];
    this.jobsheetData = of([]);
    this.server
      .GetJobCamerasIpList(data ? data : null)
      .subscribe((data: any) => {
        if (data.success === true) {
          data.message.forEach((el: any, i: number) => {
            ips.push({ d: i + 1, data: el });
          });
          ips = ips.filter((el, i, a) => i === a.indexOf(el));
          ips.forEach((element: any, i: number) => {
            // cameralist[i + 1] = { item_id: element.cameraid, item_text: element.cameraname }
            var obj;
            obj = {
              key: (i + 1).toString(),
              label: element.data,
              data: element.data,
            };

            ipsList.push(obj);
          });

          this.ips = of(ipsList);
        }
      });
  }
  GetjobTypeList() {
    var jobs: any[] = [];
    var jobList: any[] = [{ key: 0, label: "All jobs", data: "all_jobs" }];
    this.jobsheetData = of([]);
    this.server.GetJobTypeList().subscribe((data: any) => {
      if (data.success === true) {
        data.message.forEach((el: any, i: number) => {
          jobs.push({ d: i + 1, data: el });
        });
        jobs = jobs.filter((el, i, a) => i === a.indexOf(el));
        jobs.forEach((element: any, i: number) => {
          // cameralist[i + 1] = { item_id: element.cameraid, item_text: element.cameraname }
          var obj;
          obj = {
            key: (i + 1).toString(),
            label: element.data,
            data: element.data,
          };

          jobList.push(obj);
        });

        this.jobTypeList = of(jobList);
      }
    });
  }
  OndepSelect($event: any) {
    this.dataFetchStatus = "init";
    this.isFilter = true;
    this.Interval ? clearInterval(this.Interval) : this.Interval;
    this.table = document.getElementById("dataTable");
    //this.table.classList.add("loading");
    this.selectedDep = this.depSelected.key == 0 ? "" : this.depSelected.data;
    if (
      this.jobTypeSelected?.toLowerCase() == "hydraulic" ||
      this.jobTypeSelected?.toLowerCase() == "pneumatic"
    ) {
      this.isHidePanel = true;
    } else {
      this.isHidePanel = false;
    }
    this.GetIPList({
      type:
        this.selectedJobType == null || this.selectedJobType.key == 0
          ? null
          : this.selectedJobType.data,
      job_no:
        this.selectedJobNo == null || this.selectedJobNo.key == 0
          ? null
          : this.selectedJobNo.data,
      department:
        this.depSelected == null || this.depSelected.key == 0
          ? null
          : this.depSelected.data,
    });
    // this.depSelected.key == 0 ? (this.depSelected = null) : 'a'
    // this.jobSheetHttpRequest.unsubscribe()
    this.GetPanelList();
    if (!this.isHistory) {
      this.httprequests.length > 0
        ? this.httprequests.forEach((request: Subscription, i: number) => {
            request.unsubscribe();
            this.httprequests.splice(i, 1);
          })
        : "";
      this.filterrequest = this.server
        .GetJobSheetDataByfilter(
          this.depSelected == null || this.depSelected.key == 0
            ? null
            : this.depSelected.data,
          this.selectedIp == null || this.selectedIp.key == 0
            ? null
            : this.selectedIp.data,
          this.selectedPanel == null || this.selectedPanel.key == 0
            ? null
            : this.selectedPanel.data,
          this.selectedJobType == null || this.selectedJobType.key == 0
            ? null
            : this.selectedJobType.data,
          this.selectedJobNo == null || this.selectedJobNo.key == 0
            ? null
            : this.selectedJobNo.data
        )
        .subscribe(
          (response: any) => {
            //table.classList.remove('loader')
            if (response.success) {
              this.total = of(response.message.length);
              this.CheckViolation(response.message);
              this.table != null ? this.table.classList.remove("loading") : "";
              //this.jobsheetData = of(response.message)
              this.tempData = response.message;
              this.tempData = this.ModifyData(this.tempData);
              this.tempData = this.SortLivewise(this.tempData);
              this.sliceData();
            } else {
              this.table != null ? this.table.classList.remove("loading") : "";
              this.dataFetchStatus = "fail";
              this.responseMessage = response.message;
              this.server.notification("Data not found for the given filters");
              this.total = of(0);
              //this.jobsheetData = of(response.message)
              this.tempData = [];
              this.sliceData();
            }
          },
          (Err: any) => {}
        );
    }
  }

  //..............multiselectdropdown selecting functions...................

  OnIpSelect(event: any) {
    this.dataFetchStatus = "init";
    this.jobsheetData = of([]);
    this.ipSelected = this.selectedIp.key == 0 ? "" : this.selectedIp.data;
    this.isFilter = true;
    // this.table = document.getElementById("dataTable");
    // this.table.classList.add("loading");
    if (
      this.jobTypeSelected?.toLowerCase() == "hydraulic" ||
      this.jobTypeSelected?.toLowerCase() == "pneumatic"
    ) {
      this.isHidePanel = true;
    } else {
      this.isHidePanel = false;
    }
    if (!this.isHistory) {
      this.Interval ? clearInterval(this.Interval) : this.Interval;
      this.httprequests.length > 0
        ? this.httprequests.forEach((request: Subscription, i: number) => {
            request.unsubscribe();
            this.httprequests.splice(i, 1);
          })
        : "";

      this.filterrequest = this.server
        .GetJobSheetDataByfilter(
          this.depSelected == null || this.depSelected.key == 0
            ? null
            : this.depSelected.data,
          this.selectedIp == null || this.selectedIp.key == 0
            ? null
            : this.selectedIp.data,
          this.selectedPanel == null || this.selectedPanel.key == 0
            ? null
            : this.selectedPanel.data,
          this.selectedJobType == null || this.selectedJobType.key == 0
            ? null
            : this.selectedJobType.data,
          this.selectedJobNo == null || this.selectedJobNo.key == 0
            ? null
            : this.selectedJobNo.data
        )
        .subscribe(
          (response: any) => {
            //table.classList.remove('loader')
            if (response.success) {
              this.total = of(response.message.length);
              this.CheckViolation(response.message);
              this.table != null ? this.table.classList.remove("loading") : "";
              //this.jobsheetData = of(response.message)
              this.tempData = response.message;
              this.tempData = this.ModifyData(this.tempData);
              this.tempData = this.SortLivewise(this.tempData);
              this.sliceData();
            } else {
              this.dataFetchStatus = "fail";
              this.responseMessage = response.message;
              this.table != null ? this.table.classList.remove("loading") : "";
              this.server.notification("Data not found for the given filters");
              this.total = of(0);
              //this.jobsheetData = of(response.message)
              this.tempData = [];

              this.sliceData();
            }
          },
          (Err: any) => {}
        );
    }
    // this.selectedIp=event.node.data

    // this.GetDepList()
    this.GetPanelList();
    // this.server.GetAreasByPlant()
  }

  OnJobTypeSelect(event: any) {
    this.table = document.getElementById("dataTable");
    this.table.classList.add("loading");
    this.isFilter = true;
  }
  OnJobNoSelect(event: any) {
    this.dataFetchStatus = "init";
    this.isHidePanel =
      this.selectedJobNo == null || this.selectedJobNo.key == 0 ? true : false;
    this.isFilter = true;
    this.table = document.getElementById("dataTable");
    this.table.classList.add("loading");
    this.GetDepList({
      type:
        this.selectedJobType == null || this.selectedJobType.key == 0
          ? null
          : this.selectedJobType.data,
      job_no:
        this.selectedJobNo == null || this.selectedJobNo.key == 0
          ? null
          : this.selectedJobNo.data,
    });
    this.GetIPList({
      type:
        this.selectedJobType == null || this.selectedJobType.key == 0
          ? null
          : this.selectedJobType.data,
      job_no:
        this.selectedJobNo == null || this.selectedJobNo.key == 0
          ? null
          : this.selectedJobNo.data,
      department:
        this.depSelected == null || this.depSelected.key == 0
          ? null
          : this.depSelected.data,
    });
    this.GetPanelList();
    if (!this.isHistory) {
      this.Interval ? clearInterval(this.Interval) : this.Interval;
      this.httprequests.length > 0
        ? this.httprequests.forEach((request: Subscription, i: number) => {
            request.unsubscribe();
            this.httprequests.splice(i, 1);
          })
        : "";
      this.filterrequest = this.server
        .GetJobSheetDataByfilter(
          this.depSelected == null || this.depSelected.key == 0
            ? null
            : this.depSelected.data,
          this.selectedIp == null || this.selectedIp.key == 0
            ? null
            : this.selectedIp.data,
          this.selectedPanel == null || this.selectedPanel.key == 0
            ? null
            : this.selectedPanel.data,
          this.selectedJobType == null || this.selectedJobType.key == 0
            ? null
            : this.selectedJobType.data,
          this.selectedJobNo == null || this.selectedJobNo.key == 0
            ? null
            : this.selectedJobNo.data
        )
        .subscribe(
          (response: any) => {
            //table.classList.remove('loader')
            if (response.success) {
              this.total = of(response.message.length);
              this.CheckViolation(response.message);
              this.table != null ? this.table.classList.remove("loading") : "";
              //this.jobsheetData = of(response.message)
              this.tempData = response.message;
              this.tempData = this.ModifyData(this.tempData);
              this.tempData = this.SortLivewise(this.tempData);
              this.sliceData();
            } else {
              this.dataFetchStatus = "fail";
              this.responseMessage = response.message;
              this.table != null ? this.table.classList.remove("loading") : "";
              this.server.notification("Data not found for the given filters");
              this.total = of(0);
              //this.jobsheetData = of(response.message)
              this.tempData = [];
              this.sliceData();
            }
          },
          (Err: any) => {}
        );
    }
  }

  OnPanelSelect(event: any) {
    this.table = document.getElementById("dataTable");
    this.table.classList.add("loading");
    this.dataFetchStatus = "init";
    this.isFilter = true;
    this.panelSelected = this.selectedPanel.data;
    if (!this.isHistory) {
      this.Interval ? clearInterval(this.Interval) : this.Interval;
      this.httprequests.length > 0
        ? this.httprequests.forEach((request: Subscription, i: number) => {
            request.unsubscribe();
            this.httprequests.splice(i, 1);
          })
        : "";
      this.filterrequest = this.server
        .GetJobSheetDataByfilter(
          this.depSelected == null || this.depSelected.key == 0
            ? null
            : this.depSelected.data,
          this.selectedIp == null || this.selectedIp.key == 0
            ? null
            : this.selectedIp.data,
          this.selectedPanel == null || this.selectedPanel.key == 0
            ? null
            : this.selectedPanel.data,
          this.selectedJobType == null || this.selectedJobType.key == 0
            ? null
            : this.selectedJobType.data,
          this.selectedJobNo == null || this.selectedJobNo.key == 0
            ? null
            : this.selectedJobNo.data
        )
        .subscribe(
          (response: any) => {
            //table.classList.remove('loader')
            if (response.success) {
              this.total = of(response.message.length);
              this.CheckViolation(response.message);
              this.table != null ? this.table.classList.remove("loading") : "";
              //this.jobsheetData = of(response.message)
              this.tempData = response.message;
              this.tempData = this.ModifyData(this.tempData);
              this.tempData = this.SortLivewise(this.tempData);
              this.sliceData();
            } else {
              this.dataFetchStatus = "fail";
              this.table != null ? this.table.classList.remove("loading") : "";
              this.server.notification("Data not found for the given filters");
              this.total = of(0);
              //this.jobsheetData = of(response.message)
              this.tempData = [];
              this.responseMessage = response.message;
              this.sliceData();
            }
          },
          (Err: any) => {}
        );
    }
  }
  OnTypeSelect(event: any) {
    this.dataFetchStatus = "init";
    this.table = document.getElementById("dataTable");
    this.table.classList.add("loading");
    this.isFilter = true;
    this.jobTypeSelected = this.selectedJobType.data;
    if (
      this.jobTypeSelected.toLowerCase() == "hydraulic" ||
      this.jobTypeSelected.toLowerCase() == "pneumatic"
    ) {
      this.isHidePanel = true;
    } else {
      this.isHidePanel = false;
    }
    this.GetJobNoList({
      type:
        this.selectedJobType == null || this.selectedJobType.key == 0
          ? null
          : this.selectedJobType.data,
    });
    this.GetDepList({
      type:
        this.selectedJobType == null || this.selectedJobType.key == 0
          ? null
          : this.selectedJobType.data,
      job_no:
        this.selectedJobNo == null || this.selectedJobNo.key == 0
          ? null
          : this.selectedJobNo.data,
    });
    this.GetIPList({
      type:
        this.selectedJobType == null || this.selectedJobType.key == 0
          ? null
          : this.selectedJobType.data,
      job_no:
        this.selectedJobNo == null || this.selectedJobNo.key == 0
          ? null
          : this.selectedJobNo.data,
      department:
        this.depSelected == null || this.depSelected.key == 0
          ? null
          : this.depSelected.data,
    });

    this.selectedJobType.data.toLowerCase() == "hydraulic" ||
    this.selectedJobType.data.toLowerCase() == "pneumatic"
      ? (this.isHidePanel = true)
      : "";
    if (!this.isHistory) {
      this.Interval ? clearInterval(this.Interval) : this.Interval;
      this.httprequests.length > 0
        ? this.httprequests.forEach((request: Subscription, i: number) => {
            request.unsubscribe();
            this.httprequests.splice(i, 1);
          })
        : "";
      this.filterrequest = this.server
        .GetJobSheetDataByfilter(
          this.depSelected == null || this.depSelected.key == 0
            ? null
            : this.depSelected.data,
          this.selectedIp == null || this.selectedIp.key == 0
            ? null
            : this.selectedIp.data,
          this.selectedPanel == null || this.selectedPanel.key == 0
            ? null
            : this.selectedPanel.data,
          this.selectedJobType == null || this.selectedJobType.key == 0
            ? null
            : this.selectedJobType.data,
          this.selectedJobNo == null || this.selectedJobNo.key == 0
            ? null
            : this.selectedJobNo.data
        )
        .subscribe(
          (response: any) => {
            //table.classList.remove('loader')
            if (response.success) {
              this.total = of(response.message.length);
              this.CheckViolation(response.message);
              this.table != null ? this.table.classList.remove("loading") : "";
              //this.jobsheetData = of(response.message)
              this.tempData = response.message;
              this.tempData = this.ModifyData(this.tempData);
              this.tempData = this.SortLivewise(this.tempData);
              this.sliceData();
            } else {
              this.table != null ? this.table.classList.remove("loading") : "";
              this.server.notification("Data not found for given Filters");
              this.total = of(0);
              //this.jobsheetData = of(response.message)
              this.tempData = [];
              this.responseMessage = response.message;
              this.dataFetchStatus = "fail";
              this.sliceData();
            }
          },
          (Err: any) => {}
        );
    }

    // this.GetPanelList()
  }

  GetDepList(data?: { job_no: string | null; type: string | null }) {
    var deps: any[] = [];
    var depList: any[] = [
      { key: 0, label: "All Departments", data: "all_departments" },
    ];
    this.jobsheetData = of([]);
    this.server.GetDepList(data ? data : null).subscribe((data: any) => {
      if (data.success === true) {
        data.message.forEach((el: any, i: number) => {
          deps.push({ d: i + 1, data: el });
        });
        deps = deps.filter((el, i, a) => i === a.indexOf(el));
        deps.forEach((element: any, i: number) => {
          // cameralist[i + 1] = { item_id: element.cameraid, item_text: element.cameraname }
          var obj;
          obj = { key: i + 1, label: element.data, data: element.data };

          depList.push(obj);
        });
        this.departments = of(depList);
      }
    });
  }

  GetPanelList() {
    // this.server.GetPanelsByArea()
    var panels: any[] = [];
    var panelList: any[] = [
      { key: 0, label: "All Panels", data: "all_panels" },
    ];
    this.server
      .GetJobPanelList(
        this.depSelected == null || this.depSelected.key == 0
          ? null
          : this.depSelected.data,
        this.selectedIp == null || this.selectedIp.key == 0
          ? null
          : this.selectedIp.data,
        this.selectedJobNo == null || this.selectedJobNo.key == 0
          ? null
          : this.selectedJobNo.data
      )
      .subscribe((data: any) => {
        if (data.success === true) {
          data.message.forEach((el: any, i: number) => {
            panels.push({ d: i, data: el });
          });
          panels = panels.filter((el, i, a) => i === a.indexOf(el));
          panels.forEach((element: any, i: number) => {
            // cameralist[i + 1] = { item_id: element.cameraid, item_text: element.cameraname }
            var obj;
            obj = { key: i + 1, label: element.data, data: element.data };

            panelList.push(obj);
          });

          this.panelNumbers = of(panelList);
        }
      });
  }

  onHideColumn(event: any) {
    var id = event.item_id;
    this.selectedColumn.push(id);

    if (id == 10 || id == 12 || id == 13 || id == 20 || id == 9) {
      this.roHeaderCount--;
    }
    if (id == 19 || id == 21 || id == 22 || id == 23 || id == 20) {
      this.riHeaderCount--;
    }
  }

  onImageLoad() {
    this.isImgLoading = false;
  }
  onShowColumn(event: any) {
    var index = event.item_id;
    var index2 = this.selectedColumn.findIndex(
      (data: any, index: number) => data == event.item_id
    );

    this.selectedColumn.splice(index2, 1);
    if (
      index == 10 ||
      index == 20 ||
      index == 12 ||
      index == 13 ||
      index == 9
    ) {
      this.roHeaderCount++;
    }
    if (
      index == 19 ||
      index == 21 ||
      index == 22 ||
      index == 23 ||
      index == 20
    ) {
      this.riHeaderCount++;
    }
  }
  getJobsheetData() {
    var table = document.getElementById("dataTable");
    table.classList.add("loading");
    if (!this.isHistory) {
      this.server.GetJobSheet().subscribe(
        (response: any) => {
          table.classList.remove("loading");
          if (response.job_sheet_status) {
            if (response.success) {
              this.dataFetchStatus = "success";
              this.total = of(response.message.length);
              this.jobsheetData = of(response.message);
              this.tempData = response.message;
              this.tempData = this.ModifyData(this.tempData);
              this.tempData = this.SortLivewise(this.tempData);
              this.sliceData();
            } else {
              this.dataFetchStatus = "fail";
              this.server.notification("Data not found");
            }
          } else {
            // this.router.navigate(["app/jobsheetUpload"]);
          }
        },
        (err) => {
          this.dataFetchStatus = "error";
          this.server.notification("Unable to connect to server", "Retry");
          table.classList.remove("loading");
        }
      );
    } else {
      this.OnJobsheetSelect(this.jobsheetID);
    }
  }

  GetJobsheetStatus() {
    if (!this.isHistory) {
      this.server.GetJobsheetStatus().subscribe((response: any) => {
        if (response.success && !this.isHistory) {
          this.jobsStatus = response.message;
        }
      });
    }
  }
  ResetJobsheetModal(modal: any) {
    this.modalService.open(modal, {
      backdrop: "static",
      centered: true,
      scrollable: true,
    });
  }
  ResetJobSheet() {
    this.jobFileStatus = false;

    this.server.ResetJobsheet().subscribe(
      (response: any) => {
        if (response.success) {
          this.jobFileStatus = false;

          this.router.navigate(["app/jobsheetUpload"]);
        } else {
          this.server.notification(response.message);
          this.jobFileStatus = false;
          //  this.router.navigate(["app/jobsheetUpload"]);
        }
      },
      (err) => {
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }

  StartApplication() {
    var Container = document.getElementById("startApp");
    Container.classList.add("loading");
    this.server.ConfigRtsp(this.AppConfig).subscribe(
      (res: any) => {
        if (res.success) {
          this.server.StartESIApp().subscribe((response: any) => {
            this.server.notification(response.message);
            Container.classList.remove("loading");

            if (response.success) {
              this.isActive = true;
              this.modalService.dismissAll();
            }
          });
        } else {
          this.server.notification(res.message, "Retry");
        }
      },
      (Err) => {
        Container.classList.remove("loading");

        this.server.notification("Unable to connect to server");
      }
    );
  }

  StartHydroApplication() {
    var Container = document.getElementById("startApp");
    Container.classList.add("loading");
    this.server.ConfigRtsp(this.AppConfig).subscribe(
      (res: any) => {
        if (res.success) {
          Container.classList.remove("loading");

          this.server.StartHydroApp().subscribe((response: any) => {
            this.server.notification(response.message);
            if (response.success) {
              this.isActive2 = true;
              this.modalService.dismissAll();
            }
          });
        } else {
          this.server.notification(res.message, "Retry");
        }
      },
      (Err) => {
        Container.classList.remove("loading");

        this.server.notification("Error while the process");
      }
    );
  }
  sliceData() {
    this.total = of(this.tempData.length);
    this.jobsheetData = of(
      this.tempData
        .map((div: any, SINo: number) => ({ SNo: SINo + 1, ...div }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        )
    );
  }

  ToPPE(data: any) {
    var link = this.router.serializeUrl(
      this.router.createUrlTree(["app/panelViolation"], {
        queryParams: {
          id: typeof data._id == "string" ? data._id : data._id.$oid,
          panel: data.data.panel_data.panel_id,
          area: data.sub_area,
          department: data.department,
          plant: data.plant,
          image_name: data.data.image_name,
          jobNo: data.job_no,
          ip_address: data.ip_address,
          camera_id: data.camera_id ? data.camera_id : null,
        },
      })
    );
    window.open(link, "_blank");
  }

  ShowData() {
    var request: any;
    // this.table.classList.add('loading')
    request = this.server
      .GetJobSheetDataByfilter(
        this.depSelected == null || this.depSelected.key == 0
          ? null
          : this.depSelected.data,
        this.selectedIp == null || this.selectedIp.key == 0
          ? null
          : this.selectedIp.data,
        this.selectedPanel == null || this.selectedPanel.key == 0
          ? null
          : this.selectedPanel.data,
        this.selectedJobType == null || this.selectedJobType.key == 0
          ? null
          : this.selectedJobType.data,
        this.selectedJobNo == null || this.selectedJobNo.key == 0
          ? null
          : this.selectedJobNo.data
      )
      .subscribe(
        (response: any) => {
          this.table.classList.remove("loading");
          if (response.job_sheet_status) {
            if (!this.isFilter && !this.isHistory) {
              if (response.success) {
                if (!this.isFilter && !this.isHistory) {
                  this.total = of(response.message.length);
                  this.CheckViolation(response.message);
                  //  this.table!=null? this.table.classList.remove('loading'):''
                  this.dataFetchStatus = "success";
                  this.tempData = response.message;
                  this.tempData = this.ModifyData(this.tempData);
                  this.tempData = this.SortLivewise(this.tempData);
                  this.sliceData();
                }
              } else {
                this.dataFetchStatus = "fail";
                this.table != null
                  ? this.table.classList.remove("loading")
                  : "";

                this.total = of(0);
                //this.jobsheetData = of(response.message)
                this.tempData = [];
                this.sliceData();
              }
            }
          } else {
            //  this.router.navigate(["app/jobsheetUpload"]);
          }
        },
        (Err: any) => {
          this.dataFetchStatus = "error";
        }
      );

    this.httprequests.length > 4 ? this.httprequests.push(request) : "";
  }

  isDeleteJob(modal: any, d: any) {
    this.deleteJob = d;
    this.modalService.open(modal, { centered: true });
  }
  DeleteJob() {
    var deleteModal = document.getElementById("deletemodal");
    deleteModal.classList.add("loading");

    if (this.deleteJob.type == "HT") {
      if (!Array.isArray(this.deleteJob.data.panel_data)) {
        var index = this.tempData.findIndex((data: any) => {
          return (
            (typeof data._id == "string" ? data._id : data._id.$oid) ===
            this.selectedEditIndex
          );
        });
        var tempData = this.tempData[index];
        var data = {
          panel_no: this.deleteJob.data.panel_data.panel_id,
          imagename: this.deleteJob.data.image_name,
          id:
            typeof this.deleteJob._id == "string"
              ? this.deleteJob._id
              : this.deleteJob._id.$oid,
          panel_key_id: this.deleteJob.data.panel_data.roi_data.panel_key_id,
        };
        //need to integra---te delete job api if the response true need to splice that from the data
        this.server.DeleteJobPanel(data).subscribe(
          (response: any) => {
            this.server.notification(response.message);
            if (response.success) {
              this.tempData.splice(index, 1);
              this.getJobsheetData();
              this.GetJobsheetStatus();
              this.sliceData();
              deleteModal.classList.remove("loading");
            }
            deleteModal.classList.remove("loading");

            this.modalService.dismissAll();
          },
          (Err) => {
            deleteModal.classList.remove("loading");

            this.server.notification("Error while deleting job", "Retry");
          }
        );
      } else if (Array.isArray(this.deleteJob.data.panel_data)) {
        if (this.deleteJob.data.panel_data.length == 0) {
          this.server
            .DeleteEntireJob(this.deleteJob._id.$oid)
            .subscribe((response: any) => {
              if (response.success) {
                this.server.notification(response.message);
                this.RefreshData();
              } else {
                this.server.notification(response.message, "Retry");
              }
            });
        }
      }
    } else {
      this.server
        .DeleteMechJobs(
          typeof this.deleteJob._id == "string"
            ? this.deleteJob._id
            : this.deleteJob._id.$oid
        )
        .subscribe(
          (response: any) => {
            deleteModal.classList.remove("loading");

            if (response.success) {
              this.server.notification(response.message);
              this.modalService.dismissAll();
              this.getJobsheetData();
              this.GetJobsheetStatus();
              this.sliceData();
            } else {
              this.server.notification(response.message);
            }
          },
          (Err) => {
            deleteModal.classList.remove("loading");

            this.server.notification("Error while deleting Job", "Retry");
          }
        );
    }
  }

  DeleteEntireJob() {
    var deleteModal = document.getElementById("deletemodal");
    deleteModal.classList.add("loading");

    if (this.deleteJob.type == "HT") {
      this.server.DeleteEntireJob(this.deleteJob._id.$oid).subscribe(
        (response: any) => {
          this.modalService.dismissAll();
          if (response.success) {
            this.server.notification(response.message);
            this.RefreshData();
          } else {
            this.server.notification(response.message, "Retry");
          }
        },
        (Err) => {
          this.modalService.dismissAll();
        }
      );
    } else {
      this.server
        .DeleteMechJobs(
          typeof this.deleteJob._id == "string"
            ? this.deleteJob._id
            : this.deleteJob._id.$oid
        )
        .subscribe(
          (response: any) => {
            deleteModal.classList.remove("loading");

            if (response.success) {
              this.server.notification(response.message);
              this.modalService.dismissAll();
              this.getJobsheetData();
              this.GetJobsheetStatus();
              this.sliceData();
            } else {
              this.server.notification(response.message);
            }
          },
          (Err) => {
            deleteModal.classList.remove("loading");
            this.modalService.dismissAll();

            this.server.notification("Error while deleting Job", "Retry");
          }
        );
    }
  }

  //modal to  addd the remark
  RemarkModal(modal: any, data: any, field: any) {
    this.editField = field;
    this.selectedRiro = data;
    this.selectedEditIndex = data.riro_key_id;
    data.remark
      ? this.remarkControl.setValue(data.remark)
      : this.remarkControl.reset();
    this.modalService.open(modal, { backdrop: "static", centered: true });
  }

  EditRemark(modal: any, data: any, field: any) {
    this.editField = field;
    this.selectedEditIndex = data.riro_key_id;
    this.remarkControl.setValue(data.remark);
    this.modalService.open(modal, { backdrop: "static", centered: true });
  }
  RackEditModal(modal: any, data: any, field: any) {
    this.selectedRiro = data;
    this.editField = field;
    this.selectedEditIndex = data.riro_key_id;
    this.editedRackProc =
      data.rack_process != null ? data.rack_process : "noProcess";

    this.modalService.open(modal, {
      backdrop: "static",
      size: "xl",
      centered: true,
      scrollable: true,
    });
  }

  StopAppModal(modal: any) {
    if (this.userType == "admin") {
      this.modalService.open(modal, { centered: true, backdrop: "static" });
    } else {
      this.server.notification("You don't have access to  stop the appliction");
    }
  }

  StartAppModal(modal: any) {
    if (this.userType == "admin") {
      this.startAppConfig.setValue(0);
      this.modalService.open(modal, { centered: true, backdrop: "static" });
    } else {
      this.server.notification(
        "you don't have access to start the application"
      );
    }
  }

  CameraAddModal(modal: any) {
    this.jobAddMethod.setValue("cameraIp");
    var page = document.getElementById("page");
    page.classList.add("loading");
    this.server.CheckJobAddLicense().subscribe(
      (response: any) => {
        page.classList.remove("loading");

        if (response.success) {
          this.modalService
            .open(modal, { size: "lg", backdrop: "static", centered: true })
            .result.then(
              (result) => {
                this.AddCameraForm.reset();
                this.isFail = false;
                this.Jobsheet = null;
                this.isSuccess = false;
                this.jobFileStatus = false;
                this.isLoading = false;
              },
              (reason: any) => {
                this.isLoading = false;
                this.AddCameraForm.reset();
                this.isFail = false;
                this.jobFileStatus = false;
                this.Jobsheet = null;
                this.isSuccess = false;
              }
            );
        } else {
          this.licenseMessage = response.message;
          this.modalService.open(this.licenseErrorModal, {
            backdrop: "static",
            centered: true,
          });
        }
      },
      (err) => {
        page.classList.remove("loading");
        this.server.notification("Something went wrong", "Retry");
      }
    );
  }

  modalOpen(modal: any, rtsp?: any, job?: any) {
    this.selectedJob = job;
    rtsp ? (this.rtspLiveIp = rtsp) : "";
    this.isImgLoading = true;
    this.modalService
      .open(modal, { size: "xl", fullscreen: false })
      .result.then(
        (result) => {
          this.AddCameraForm.reset();
          this.tempAddedJob = null;
          this.addedJob = null;
          this.isFail = false;
          this.isSuccess = false;
          this.isLoading = false;
        },
        (reason: any) => {
          this.isLoading = false;
          this.addedJob = null;
          this.tempAddedJob = null;
          this.AddCameraForm.reset();
          this.isFail = false;
          this.isSuccess = false;
        }
      );
  }

  OpenTitleEditModal(modal: any) {
    this.shutdownName.setValue(this.currentShutdown);
    this.modalService.open(modal, { size: "md", centered: true });
  }

  SaveRemark() {
    var data1: any = {
      id:
        typeof this.selectedRiro._id == "string"
          ? this.selectedRiro._id
          : this.selectedRiro._id.$oid,
    };
    data1[this.editField] = this.remarkControl.value
      ? this.remarkControl.value
      : "";
    this.server.SaveRemark(data1).subscribe(
      (response: any) => {
        if (response.success) {
          this.server.notification(response.message);
          this.getJobsheetData();
          this.GetJobsheetStatus();
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
  DeleteJobRemark() {
    var data1: any = {
      id:
        typeof this.selectedRiro._id == "string"
          ? this.selectedRiro._id
          : this.selectedRiro._id.$oid,
    };
    // data1[this.editField] = this.remarkControl.value?this.remarkControl.value:''
    this.server.DeleteJobRemark(data1).subscribe(
      (response: any) => {
        if (response.success) {
          this.server.notification(response.message);
          this.getJobsheetData();
          this.GetJobsheetStatus();
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

  DeleteTagname() {
    var data1: any = {
      id:
        typeof this.selectedRiro._id == "string"
          ? this.selectedRiro._id
          : this.selectedRiro._id.$oid,
    };
    // data1[this.editField] = this.remarkControl.value?this.remarkControl.value:''
    this.server.DeleteTagname(data1).subscribe(
      (response: any) => {
        if (response.success) {
          this.server.notification(response.message);
          this.getJobsheetData();
          this.GetJobsheetStatus();
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

  DeleteSelectedfield() {
    var editFieldContainer = document.getElementById("editField");
    editFieldContainer.classList.add("loading");
    var data1: any = {
      id:
        typeof this.selectedRiro._id == "string"
          ? this.selectedRiro._id
          : this.selectedRiro._id.$oid,
    };
    if (this.editField == "board") {
      this.server.DeleteBoardname(data1).subscribe(
        (response: any) => {
          editFieldContainer.classList.remove("loading");

          if (response.success) {
            this.server.notification(response.message);
            this.getJobsheetData();
            this.GetJobsheetStatus();
            this.modalService.dismissAll();
          } else {
            this.server.notification(response.message, "Retry");
          }
        },
        (Err) => {
          editFieldContainer.classList.remove("loading");

          this.server.notification("Error while updating", "Retry");
        }
      );
    } else if (this.editField == "job_description") {
      this.server.DeleteJobDesc(data1).subscribe(
        (response: any) => {
          editFieldContainer.classList.remove("loading");

          if (response.success) {
            this.server.notification(response.message);
            this.getJobsheetData();
            this.GetJobsheetStatus();
            this.modalService.dismissAll();
          } else {
            this.server.notification(response.message, "Retry");
          }
        },
        (Err) => {
          editFieldContainer.classList.remove("loading");

          this.server.notification("Error while updating", "Retry");
        }
      );
    } else if (this.editField == "department") {
      this.server.DeleteDepartmentName(data1).subscribe(
        (response: any) => {
          editFieldContainer.classList.remove("loading");

          if (response.success) {
            this.server.notification(response.message);
            this.getJobsheetData();
            this.GetJobsheetStatus();
            this.modalService.dismissAll();
          } else {
            this.server.notification(response.message, "Retry");
          }
        },
        (Err) => {
          editFieldContainer.classList.remove("loading");

          this.server.notification("Error while updating", "Retry");
        }
      );
    } else if (this.editField == "sub_area") {
      this.server.DeleteSubArea(data1).subscribe(
        (response: any) => {
          editFieldContainer.classList.remove("loading");

          if (response.success) {
            this.server.notification(response.message);
            this.getJobsheetData();
            this.GetJobsheetStatus();
            this.modalService.dismissAll();
          } else {
            this.server.notification(response.message, "Retry");
          }
        },
        (Err) => {
          editFieldContainer.classList.remove("loading");

          this.server.notification("Error while updating", "Retry");
        }
      );
    } else {
    }
  }
  selectRiroEditField(modal: any, data: any, field: string) {
    if (true) {
      this.editField = field;
      this.selectedRiro = data;
      this.selectedEditIndex = data.riro_key_id;

      if (this.editField == "five_meter") {
        data[this.editField];

        this.tempField.setValue(
          data[this.editField].violation
            ? data[this.editField].violation
              ? "Yes"
              : "No"
            : "No"
        );
      } else {
        this.tempField.setValue(data[this.editField]);
      }

      this.modalService.open(modal, {
        backdrop: "static",
        centered: true,
        size: field == "five_meter" ? "xl" : "lg",
      });
    }
  }

  selectEditField(modal: any, data: any, field: string) {
    if (true) {
      this.editField = field;
      this.selectedRiro = data;
      this.tempField.setValue(data[this.editField]);

      this.modalService.open(modal, {
        backdrop: "static",
        centered: true,
        size: "lg",
      });
    }
  }

  ToRackEdit(data: any) {
    var link = this.router.serializeUrl(
      this.router.createUrlTree(["/app/rackEdit"], {
        queryParams: {
          id: typeof data._id == "string" ? data._id : data._id.$oid,
          panel: data.data.panel_data.panel_id,
          area: data.sub_area,
          department: data.department,
          plant: data.plant,
          image_name: data.data.image_name,
          jobNo: data.job_no,
          ip_address: data.ip_address,
          camera_id: data.camera_id ? data.camera_id : null,
        },
      })
    );
    window.open(link, "_blank");
  }
  ToLockHistory(data: any) {
    var link = this.router.serializeUrl(
      this.router.createUrlTree(["/app/lockHistory"], {
        queryParams: {
          id: typeof data._id == "string" ? data._id : data._id.$oid,
          camera_name: data.data.camera_name,
          department: data.department,
          area: data.sub_area,
          plant: data.plant,
          image_name: data.data.image_name,
          type: data.type,
          camera_id: data.camera_id ? data.camera_id : null,
          ip_address: data.ip_address,
          common_no: data?.common_no,
          jobNo: data?.job_no,
        },
      })
    );
    window.open(link, "_blank");
  }

  StopApplication() {
    var stopModalBody = document.getElementById("deleteModalBody");
    stopModalBody.classList.add("loading");
    this.server.StopESIApp().subscribe(
      (response: any) => {
        if (response.success) {
          stopModalBody.classList.remove("loading");

          this.isActive = false;
          this.modalService.dismissAll();
          this.server.notification(response.message);
        } else {
          stopModalBody.classList.remove("loading");

          this.server.notification(response.message);
        }
      },
      (err) => {
        stopModalBody.classList.remove("loading");

        this.server.notification("Error while the process", "Retry");
      }
    );
  }
  StopHydroApplication() {
    this.server.StopHydroApp().subscribe(
      (response: any) => {
        if (response.success) {
          this.isActive2 = false;
          this.modalService.dismissAll();
          this.server.notification(response.message);
        } else {
          this.server.notification(response.message);
        }
      },
      (err) => {
        this.server.notification("Error while the process", "Retry");
      }
    );
  }

  EditRack(event: any) {
    this.editedRackProc = event.target.value;
  }
  StartAppConfig(event: any) {
    this.AppConfig = Number(event.target.value);
  }
  SaveFieldChanges() {
    var editContainer = document.getElementById("editField");
    editContainer.classList.add("loading");
    if (this.editField != "tagname") {
      var index = this.tempData.findIndex((data: any) => {
        return data.riro_key_id == this.selectedEditIndex;
      });
    }

    var temp = this.tempData[index];
    if (this.editField === "five_meter") {
      this.tempField.setValue(this.tempField.value === "Yes" ? true : false);
    }
    var field = this.editField;
    var data2: any = {
      id:
        typeof this.selectedRiro._id == "string"
          ? this.selectedRiro._id
          : this.selectedRiro._id.$oid,
    };

    data2[this.editField] = this.tempField.value;
    this.server.EditFieldjobsheet(data2, this.editField).subscribe(
      (response: any) => {
        editContainer.classList.remove("loading");

        if (response.success) {
          this.server.notification(response.message);
          this.getJobsheetData();
          this.GetJobsheetStatus();
          this.modalService.dismissAll();
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        editContainer.classList.remove("loading");

        this.server.notification("Error while updating", "Retry");
      }
    );
  }
  SaveRiroFieldChanges() {
    var editContainer = document.getElementById("editField");
    editContainer.classList.add("loading");
    // if (this.editField != 'tagname') {
    //   var index = this.tempData.findIndex((data: any) => {
    //     return data.riro_key_id == this.selectedEditIndex
    //   })
    // }

    // var temp = this.tempData[index]
    if (this.editField === "five_meter") {
      this.tempField.setValue(this.tempField.value === "Yes" ? true : false);
    }
    var field = this.editField;
    var data2: any = {
      riro_key_id: this.selectedRiro.riro_key_id,
    };

    data2[this.editField] = this.tempField.value;
    this.server.EditRiroJob(data2).subscribe(
      (response: any) => {
        editContainer.classList.remove("loading");

        if (response.success) {
          this.server.notification(response.message);
          this.getJobsheetData();
          this.GetJobsheetStatus();
          this.modalService.dismissAll();
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        editContainer.classList.remove("loading");

        this.server.notification("Error while updating", "Retry");
      }
    );
  }

  SaveRackChanges() {
    var fieldContainer = document.getElementById("rackEdit");
    fieldContainer.classList.add("loading");

    var index = this.tempData.findIndex((data: any) => {
      return data.riro_key_id == this.selectedEditIndex;
    });
    var field = this.editField;
    var data1: any = {
      riro_key_id: this.selectedEditIndex,
    };
    data1[this.editField] = this.editedRackProc;
    this.server.EditRiroJob(data1).subscribe(
      (response: any) => {
        fieldContainer.classList.remove("loading");

        if (response.success) {
          // this.sliceData()
          this.getJobsheetData();
          this.GetJobsheetStatus();
          this.modalService.dismissAll();
        } else {
          this.server.notification(response.message, "Retry");
        }
      },
      (Err) => {
        fieldContainer.classList.remove("loading");

        this.server.notification("Error while updating", "Retry");
      }
    );
  }
  RefreshData() {
    this.selectedPanel = "";
    this.selectedPanels = [];
    this.total = of(0);
    this.jobsheetData = of([]);
    // this.table.classList.add("loading");
    this.dataFetchStatus = "init";
    this.ShowData();
    this.GetJobsheetStatus();
  }

  ResetFilters() {
    this.depSelected = null;
    this.panelSelected = null;
    this.ipSelected = "";
    this.jobTypeSelected = null;
    this.selectedJobNo = null;
    this.selectedJobType = null;
    this.selectedPanel = null;
    this.selectedDep = "";
    this.selectedIp = null;
    this.isFilter = false;
    this.isHidePanel = true;
    this.GetJobNoList();
    this.GetDepList();
    this.GetIPList();

    this.filterrequest ? this.filterrequest.unsubscribe() : "";
    this.ShowData();
    this.dataFetchStatus = "init";
    this.isHistory
      ? ""
      : (this.Interval = setInterval(
          () => {
            {
              this.ShowData();
              this.GetJobsheetStatus();
            }
          },
          this.isActive ? this.intervalTime : this.server.jobsheetDataInterval2
        ));
    this.getJobsheetData();
  }

  GetCameraBrands() {
    this.server.GetCameraBrandDetails().subscribe((response: any) => {
      var temp: any[] = [];
      if (response.success) {
        response.message.forEach((element: any, id: number) => {
          temp.push({ text: element, id: id });
        });
      }

      this.cameraBrandList = of(temp);
    });
  }
  keytab(event: any) {
    let element = event.target.parentElement.nextElementSibling.children[0]; // get the sibling element
    if (element == null)
      // check if its null
      return;
    else element.focus(); // focus if not null
  }

  ViolImages5meter(data: any) {
    this.Images = [];
    data.five_meter.images
      ? data.five_meter.images.forEach((obj: any, index: number) => {
          this.Images[index] = {
            src: this.IP + "/fivemeter_image/" + obj.img_name,

            thumb: this.IP + "/fivemeter_image/" + obj.img_name,
            caption: obj.img_name,
          };
        })
      : "";

    this.Images.length > 0 ? this.open(0) : "";
  }
  open(index: number): void {
    this._lightbox.open(this.Images, index);
  }

  ModifyData(data: any) {
    data.forEach((panel: any) => {
      let temp: any = {};
      let temp2: any = {};

      if (panel?.riro_data || panel.riro_data.length > 0) {
        if (panel?.riro_data.length == 1) {
          if (panel?.riro_data[0]?.rack_process == "rack_in") {
            temp = panel.riro_data[0];
            panel.riro_data[0] = null;
            panel.riro_data[1] = temp;
          } else if (panel?.riro_data[0]?.rack_process == "not_recognised") {
            temp = panel.riro_data[0];
            panel.riro_data[0] = null;
            panel.riro_data[1] = null;
            panel.riro_data[2] = temp;
          } else {
            panel.riro_data[1] = null;
            panel.riro_data[2] = null;
          }
        } else {
          if (
            panel?.riro_data[0]?.rack_process == "rack_in" &&
            panel?.riro_data[1]?.rack_process == "rack_out"
          ) {
            temp = panel.riro_data[0];
            panel.riro_data[0] = panel.riro_data[1];
            panel.riro_data[1] = temp;
            panel.riro_data[2] = null;
          } else if (
            panel?.riro_data[0]?.rack_process == "rack_in" &&
            panel?.riro_data[1]?.rack_process == "not_recognised"
          ) {
            temp = panel.riro_data[0];
            temp2 = panel.riro_data[1];
            panel.riro_data[0] = {};
            panel.riro_data[1] = temp;
            panel.riro_data[2] = temp2;
          } else if (
            panel?.riro_data[1]?.rack_process == "rack_in" &&
            panel?.riro_data[0]?.rack_process == "not_recognised"
          ) {
            temp = panel.riro_data[0];
            temp2 = panel.riro_data[1];
            panel.riro_data[0] = null;
            panel.riro_data[1] = temp2;
            panel.riro_data[2] = temp;
          } else if (
            panel?.riro_data[0]?.rack_process == "not_recognised" &&
            panel?.riro_data[1]?.rack_process == "rack_out"
          ) {
            temp = panel.riro_data[0];
            temp2 = panel.riro_data[1];
            panel.riro_data[0] = temp2;
            panel.riro_data[1] = null;
            panel.riro_data[2] = temp;
          } else if (
            panel?.riro_data[1]?.rack_process == "not_recognised" &&
            panel?.riro_data[0]?.rack_process == "rack_out"
          ) {
            temp2 = panel.riro_data[1];
            panel.riro_data[1] = null;
            panel.riro_data[2] = temp2;
          } else {
            panel.riro_data[2] = null;
          }
        }
      }
    });

    return data;
  }

  SortLivewise(data: any) {
    for (let index1 = 0; index1 < data.length; index1++) {
      data[index1].isbreak = false;
      console.log(
        "live status",
        index1,
        data[index1].live_status,
        "exception status",
        index1,
        data[index1].exception_status,
        data[index1].sticker_status_isolation,
        "sticker status isolation"
      );

      for (let index2 = index1 + 1; index2 < data.length; index2++) {
        if (
          !data[index1].data?.panel_data?.panel_status &&
          data[index2].data?.panel_data?.panel_status
        ) {
          var temp = data[index1];
          data[index1] = data[index2];
          data[index2] = temp;
        }
      }
      for (let index2 = index1 + 1; index2 < data.length; index2++) {
        if (
          (data[index1].riro_data[0] != null
            ? data[index1]?.riro_data[0]?.rack_process == null
            : false) &&
          (data[index1]?.riro_data[0] != null
            ? data[index1]?.riro_data[0].rack_process == "rack_out"
            : false)
        ) {
          var temp = data[index1];
          data[index1] = data[index2];
          data[index2] = temp;
        }
      }
      for (let index2 = index1 + 1; index2 < data.length; index2++) {
        if (!data[index1]?.exception_status && data[index2]?.exception_status) {
          var temp = data[index1];
          data[index1] = data[index2];
          data[index2] = temp;
        }
      }
      for (let index2 = index1 + 1; index2 < data.length; index2++) {
        if (
          !data[index1]?.sticker_status_isolation &&
          data[index2]?.sticker_status_isolation
        ) {
          var temp = data[index1];
          data[index1] = data[index2];
          data[index2] = temp;
        }
      }
      for (let index2 = index1 + 1; index2 < data.length; index2++) {
        if (!data[index1]?.live_status && data[index2]?.live_status) {
          var temp = data[index1];
          data[index1] = data[index2];
          data[index2] = temp;
        }
      }
    }

    var index1 = 0;
    var subcount = 0;
    while (index1 < data.length) {
      const currentActiveJob = data[index1].job_no;
      var tempi = index1;
      subcount = 1;
      data[index1].subCount = 1;
      for (let j = index1 + 1; j < data.length; j++) {
        const subjob = data[j];
        if (subjob.job_no === currentActiveJob) {
          tempi++;
          subcount++;
          data[j].subCount = subcount;

          var tempsub = data[tempi];
          data[tempi] = subjob;
          data[j] = tempsub;
          data[tempi].subCount = subcount.toString();
        }
      }
      data[tempi].isbreak = true;

      index1 = tempi + 1;
      for (let index1 = tempi + 1; index1 < data.length; index1++) {
        for (let index2 = index1 + 1; index2 < data.length; index2++) {
          if (
            (data[index1]?.riro_data[0] != null
              ? (data[index1]?.riro_data[0]).rack_process == null
              : false) &&
            (data[index1].riro_data[0] != null
              ? data[index1].riro_data[0].rack_process == "rack_out"
              : false)
          ) {
            var temp = data[index1];
            data[index1] = data[index2];
            data[index2] = temp;
          }

          if (!data[index1].exception_status && data[index2].exception_status) {
            var temp = data[index1];
            data[index1] = data[index2];
            data[index2] = temp;
          }

          if (!data[index1]?.live_status && data[index2]?.live_status) {
            var temp = data[index1];
            data[index1] = data[index2];
            data[index2] = temp;
            // }
          }
        }
      }
      index1 = tempi + 1;
    }

    return data;
  }

  OnJobsheetSelect(jobsheetId: any) {
    this.isLive = false;
    this.dataFetchStatus = "init";
    var table = document.getElementById("dataTable");
    // table.classList.add("loading");
    this.server.getPrevJobsheetData(jobsheetId).subscribe(
      (response: any) => {
        if (response.success) {
          this.dataFetchStatus = "success";
          this.total = of(response.message.length);
          this.tempData = this.ModifyData(response.message);
          this.tempData = this.SortLivewise(response.message);
          table.classList.remove("loading");
          this.sliceData();
        } else {
          table.classList.remove("loading");
          this.total = of(0);
          this.server.notification(response.message);
          this.tempData = [];
          this.dataFetchStatus = "fail";
          this.responseMessage = response.message;

          this.sliceData();
        }
      },
      (Err) => {
        this.dataFetchStatus = "error";
        table.classList.remove("loading");

        this.server.notification("Error while fetching the data", "Retry");
      }
    );
    this.server.GetPrevJobsheetStatus(jobsheetId).subscribe((response: any) => {
      if (response.success) {
        this.jobsStatus = response.message;
      }
    });
  }

  OnDeselectJobsheet(event: any) {
    this.RefreshData();
  }

  ConveyorImage(modal: any, data: any, field: any) {
    if (data.type.toLowerCase() === "conveyor") {
      this.selectedRiro = data;

      this.selectedField = field;
      this.conveyorImage = of("");
      var obj = {
        id: typeof data._id == "string" ? data._id : data._id.$oid,
        rtsp_url: data.data.rtsp_url,
      };

      this.modalService.open(modal, { size: "xl", centered: true });
      this._lightBoxConfig.containerElementResolver = (doc: Document) =>
        doc.getElementById("conveyorImg");

      var img = document.getElementById("jobImg");
      img.classList.add("loading");
      this.server.GetConveyorImg(obj).subscribe(
        (response: any) => {
          if (response.success) {
            img.classList.remove("loading");

            this.conveyorImage = of(response.message.image_name);
          } else {
            img.classList.remove("loading");
            this.modalService.dismissAll();
            this.server.notification(response.message);
          }
        },
        (Err) => {
          this.server.notification("Something went wrong", "Retry");
        }
      );
    } else if (
      data.type.toLowerCase() === "hydraulic" ||
      data.type.toLowerCase() === "pneumatic"
    ) {
      this.selectedRiro = data;

      this.selectedField = field;
      this.conveyorImage = of("");
      var obj = {
        id: typeof data._id == "string" ? data._id : data._id.$oid,
        rtsp_url: data.data.rtsp_url,
      };

      this.modalService.open(modal, {
        size: "xl",
        backdrop: "static",
        centered: true,
      });
      this._lightBoxConfig.containerElementResolver = (doc: Document) =>
        doc.getElementById("conveyorImg");

      // var img = document.getElementById('jobImg')
      // img.classList.add('loading')
      field == "Lock"
        ? (this.conveyorImage = of(
            data.data.hydraulic_data[0]?.lock_on_details.Image
          ))
        : (this.conveyorImage = of(
            data.data.hydraulic_data[0]?.lock_off_details.Image
          ));
    } else {
    }
  }

  // to get the l1 data
  //api integration

  getConveyorImg() {
    var img = document.getElementById("jobImg");
    img.classList.add("loading");
    var obj = {
      id:
        typeof this.selectedRiro._id == "string"
          ? this.selectedRiro._id
          : this.selectedRiro._id.$oid,
      rtsp_url: this.selectedRiro.data.rtsp_url,
    };
    this.server.GetConveyorImg(obj).subscribe(
      (response: any) => {
        if (response.success) {
          img.classList.remove("loading");

          this.conveyorImage = of(response.message.image_name);
        } else {
          img.classList.remove("loading");

          this.server.notification(response.message);
        }
      },
      (Err) => {
        this.server.notification("Error while fetching the image");
      }
    );
  }

  showAlertDetails(event: any, alertDetailsModal: any) {
    // if (this.violCountTemp == 0) {
    //   this.server.notification("No Live Violations Occured");
    // } else {
    //   for (let index1 = 0; index1 < this.tempData.length; index1++) {
    //     this.tempData[index1].exception_status &&
    //     (this.tempData[index1].riro_data[0] != null ||
    //       this.tempData[index1].riro_data[1] != null)
    //       ? this.violationDetails.push(this.tempData[index1])
    //       : "";
    //   }
    //   this.modalService.open(alertDetailsModal, {
    //     size: "xl",
    //     backdrop: "static",
    //     centered: true,
    //   });
    // }
  }
  CheckViolation(details: any[]) {
    this.violCountTemp = 0;
    details.forEach((data: any, index: number) => {
      if (data.type == "HT") {
        if (data.exception_status) {
          this.violCountTemp = this.violCountTemp + 1;
        }
      }
    });

    this.violationCount = of(this.violCountTemp);
  }

  ToEditPage(data: any) {
    console.log(data, "edit page data");
    if (data["type"].trim().toLowerCase() == "ht") {
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/HTPanel"], {
          queryParams: {
            id: typeof data._id == "string" ? data._id : data._id.$oid,
            type: data["type"],
            image_name: data.data.image_name,
            isNewJob: false,
            area: data.sub_area,
            jobNo: data.job_no,
            camera_id: data.camera_id ? data.camera_id : null,
            ip_address: data.ip_address,
            department: data.department,
          },
        })
      );
      window.open(link, "_blank");
    } else if (data["type"].trim().toLowerCase() == "hydraulic") {
      console.log("hydraulic job");
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/hydraulic"], {
          queryParams: {
            id: typeof data._id == "string" ? data._id : data._id.$oid,
            type: data["type"],
            image_name: data.data.image_name,
            isNewJob: false,
            area: data.sub_area,
            plant: data.plant,
            jobNo: data.job_no,
            camera_id: data.camera_id ? data.camera_id : null,
            ip_address: data.ip_address,
            department: data.department,
          },
        })
      );
      window.open(link, "_blank");
    } else if (data["type"].trim().toLowerCase() == "pneumatic") {
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/pneumatic"], {
          queryParams: {
            id: typeof data._id == "string" ? data._id : data._id.$oid,
            type: data["type"],
            image_name: data.data.image_name,
            isNewJob: false,
            area: data.sub_area,
            plant: data.plant,
            jobNo: data.job_no,
            camera_id: data.camera_id ? data.camera_id : null,
            ip_address: data.ip_address,
            department: data.department,
          },
        })
      );
      window.open(link, "_blank");
    } else if (data["type"].trim().toLowerCase() == "conveyor") {
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/conveyor"], {
          queryParams: {
            id: typeof data._id == "string" ? data._id : data._id.$oid,
            type: data["type"],
            image_name: data.data.image_name,
            isNewJob: false,
            area: data.sub_area,
            plant: data.plant,
            jobNo: data.job_no,
            camera_id: data.camera_id ? data.camera_id : null,
            ip_address: data.ip_address,
            department: data.department,
          },
        })
      );
      window.open(link, "_blank");
    } else if (data["type"].trim().toLowerCase() == "uceil") {
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/uceil"], {
          queryParams: {
            id: typeof data._id == "string" ? data._id : data._id.$oid,
            type: data["type"],
            image_name: data.data.image_name,
            isNewJob: false,
            area: data.sub_area,
            plant: data.plant,
            jobNo: data.job_no,
            camera_id: data.camera_id ? data.camera_id : null,
            ip_address: data.ip_address,
            department: data.department,
          },
        })
      );
      window.open(link, "_blank");
    } else if (data["type"].toLowerCase() == "lt") {
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/lt"], {
          queryParams: {
            id: typeof data._id == "string" ? data._id : data._id.$oid,
            type: data["type"],
            image_name: data.data.image_name,
            isNewJob: false,
            area: data.sub_area,
            plant: data.plant,
            jobNo: data.job_no,
            camera_id: data.camera_id ? data.camera_id : null,
            ip_address: data.ip_address,
            department: data.department,
          },
        })
      );
      window.open(link, "_blank");
    } else {
    }
  }

  GetTittle() {
    this.server.GetShudownName().subscribe((response: any) => {
      if (response.success) {
        this.currentShutdown = response.message.shutdownname;
        this.jobsheetID = response.message._id.$oid;
        this.shutdownInfo = response.message;
      }
    });
  }

  //-----METHOD FOR ALERT SOUND------------
  alertSound() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/alert.mp3";
    audio.load();
    audio.play();
  }

  ShowUJobAlert() {
    this.toasterService.error(
      <any>this.Violation.nativeElement.innerHTML,
      " ",
      {
        enableHtml: true,
        positionClass: "toast-top-right",
        timeOut: 7200000,
      }
    );
  }
  GetJobNoList(data?: { type: string | null }) {
    this.server.GetJobNumbers(data ? data : null).subscribe((response: any) => {
      if (response.success) {
        var data: any = [{ key: 0, label: "All jobs", data: "all_jobs" }];
        response.message.forEach((element: any, index: number) => {
          data.push({ key: index + 1, label: element, data: element });
        });
        this.JobNoList = of(data);
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.Interval);
    clearInterval(this.interval2);
    this.modalService.dismissAll();
    this.toasterService.clear();
  }

  OnNewTitle() {
    var data = {
      id: this.jobsheetID,

      shutdownname: this.shutdownName.value,
    };
    this.server.UpdateShutdownName(data).subscribe(
      (response: any) => {
        if (response.success) {
          this.currentShutdown = this.shutdownName.value;
          this.server.notification(response.message);
          this.modalService.dismissAll();
        }
      },
      (Err) => {
        this.server.notification("Error during the process", "Retry");
      }
    );
  }

  SetSelectedRow(index: number) {
    this.highlightedRow = index;
  }
  OnJobsheetUploaded(file: File) {
    this.isSuccess = false;
    this.isFail = false;
    console.log("mechanical jobsheet has uploaded");
    this.responseMessage = "";
    document.getElementById("file-upload-container").classList.add("loading");
    setTimeout(() => {
      document
        .getElementById("file-upload-container")
        .classList.remove("loading");
      this.jobFileStatus = true;
    }, 3000);
    console.log("jobfile status", this.jobFileStatus);
    this.Jobsheet = file;
  }
  OnAddJobsBySheet() {
    this.isLoading2 = true;
    var formData = new FormData();
    formData.append("file", this.Jobsheet);

    this.server.AddJobByExcelsheet(formData).subscribe(
      (response: any) => {
        if (response.success) {
          this.isLoading2 = false;
          this.isSuccess = response.success;
          this.responseMessage = response.message;
          setTimeout(() => {
            this.modalService.dismissAll();
          }, 2000);
        } else {
          this.isLoading2 = false;
          this.isFail = true;
          this.responseMessage = response.message;
        }
      },
      (Err) => {
        this.responseMessage = "Error while adding the job";
      }
    );
  }

  AddJobByCameraRtsp() {
    this.isLoading = true;
    this.isFail = false;
    this.isSuccess = false;

    var data1: any = {
      camera_brand: this.AddCameraForm.value["camera_brand"][0].text,
      area: this.AddCameraForm.value["area"],
      rtsp_url: this.AddCameraForm.value["rtsp_url"],
      job_description: this.AddCameraForm.value["job_description"],
      no_of_isolating_points:
        this.AddCameraForm.value["no_of_isolating_points"],
      department: this.AddCameraForm.value["department"],
      type: this.AddCameraForm.value["type"][0].text,
      job_type: "main_job",
      isolating_location: this.AddCameraForm.value["isolating_locations"],
      ai_solution: [],
    };

    if (this.AddCameraForm.value["type"][0].text != "HT") {
      data1["common_no"] = this.AddCameraForm.value["jobInfo"];
    } else {
      data1["board"] = this.AddCameraForm.value["board"];
      data1["tagname"] = this.AddCameraForm.value["tagname"];
      data1["common_no"] = null;
    }

    this.server.AddJobPanelByRtsp(data1).subscribe(
      (response: any) => {
        if (response.success) {
          this.isLoading = false;
          this.isSuccess = true;
          var job = response.message[0];
          this.tempAddedJob = response.message[0];
          this.addedJob = data1;
          this.tempAddedJob = { ...this.tempAddedJob, ...this.addedJob };
          // this.subJobs = []
          // this.subjobValids = []
          // this.responseMessage = response.message[0]
          if (this.tempAddedJob.new_job) {
            // if (true) {

            if (data1["type"].toLowerCase() == "ht") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/HTPanel"], {
                  queryParams: {
                    id: typeof job._id == "string" ? job._id : job._id.$oid,
                    type: data1["type"],
                    image_name: job.image_name,
                    isNewJob: true,
                    area: data1.sub_area,
                    plant: data1.plant,
                  },
                })
              );
              window.open(link, "_blank");
            } else if (data1["type"].toLowerCase() == "hydraulic") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/hydraulic"], {
                  queryParams: {
                    id: typeof job._id == "string" ? job._id : job._id.$oid,
                    type: data1["type"],
                    image_name: job.image_name,
                    isNewJob: true,
                    area: data1.sub_area,
                    plant: data1.plant,
                  },
                })
              );
              window.open(link, "_blank");
            } else if (data1["type"].toLowerCase() == "pneumatic") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/pneumatic"], {
                  queryParams: {
                    id: typeof job._id == "string" ? job._id : job._id.$oid,
                    type: data1["type"],
                    image_name: job.image_name,
                    isNewJob: true,
                    area: data1.sub_area,
                    plant: data1.plant,
                  },
                })
              );
              window.open(link, "_blank");
            } else if (data1["type"].toLowerCase() == "uceil") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/uceil"], {
                  queryParams: {
                    id: typeof job._id == "string" ? job._id : job._id.$oid,
                    type: data1["type"],
                    image_name: job.image_name,
                    isNewJob: true,
                    area: data1.sub_area,
                    plant: data1.plant,
                  },
                })
              );
              window.open(link, "_blank");
            } else if (data1["type"].toLowerCase() == "lt") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/lt"], {
                  queryParams: {
                    id: typeof job._id == "string" ? job._id : job._id.$oid,
                    type: data1["type"],
                    image_name: job.image_name,
                    isNewJob: true,
                    area: data1.sub_area,
                    plant: data1.plant,
                  },
                })
              );
              window.open(link, "_blank");
            } else if (data1["type"].toLowerCase() == "conveyor") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/conveyor"], {
                  queryParams: {
                    id:
                      typeof this.tempAddedJob._id == "string"
                        ? this.tempAddedJob._id
                        : this.tempAddedJob._id.$oid,
                    type: this.tempAddedJob["type"],
                    image_name: this.tempAddedJob.image_name,
                    isNewJob: false,
                    area: this.tempAddedJob.sub_area,
                    plant: this.tempAddedJob.plant,
                    jobNo: this.tempAddedJob.job_no,
                    camera_id: this.tempAddedJob.camera_id
                      ? data1.camera_id
                      : null,
                    ip_address: this.tempAddedJob.ip_address,
                    department: this.tempAddedJob.department,
                  },
                })
              );
              window.open(link, "_blank");
            } else {
            }

            setTimeout(() => {
              this.modalService.dismissAll();
            }, 1000);
            this.RefreshData();
          }

          //this.GetCameraList()
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
  }

  AddJobByCameraIP() {
    this.isLoading = true;
    this.isFail = false;
    this.isSuccess = false;

    var data: any = {
      //cameraname: this.AddCameraForm.value['cameraname'],
      camera_brand: this.AddCameraForm.value["camera_brand"][0].text,
      // plant: this.AddCameraForm.value['plant'],
      area: this.AddCameraForm.value["area"],
      username: this.AddCameraForm.value["username"],
      password: this.AddCameraForm.value["password"],
      cameraip: this.AddCameraForm.value["cameraip"],
      port: this.AddCameraForm.value["port"],
      job_type: "main_job",
      job_description: this.AddCameraForm.value["job_description"],
      no_of_isolating_points:
        this.AddCameraForm.value["no_of_isolating_points"],
      department: this.AddCameraForm.value["department"],
      type: this.AddCameraForm.value["type"][0].text,
      isolating_location: this.AddCameraForm.value["isolating_locations"],
      ai_solution: [],
    };

    if (this.AddCameraForm.value["type"][0].text != "HT") {
      data["common_no"] = this.AddCameraForm.value["jobInfo"];
    } else {
      data["board"] = this.AddCameraForm.value["board"];
      data["tagname"] = this.AddCameraForm.value["tagname"];
      data["common_no"] = null;
    }
    this.addedJob = data;

    this.server.AddJobPanelByIp(data).subscribe(
      (response: any) => {
        //  this.AddCameraForm.addControl('rtsp_url', new FormControl('', Validators.required))
        this.responseMessage = "Job is added successfully.";
        this.isLoading = false;
        if (response.success) {
          this.isSuccess = true;
          this.isLoading = false;
          var job = response.message[0];
          this.tempAddedJob = response.message[0];
          this.tempAddedJob = { ...this.tempAddedJob, ...this.addedJob };
          if (this.tempAddedJob.new_job) {
            // if (true) {

            this.responseMessage = "Camera successfully added";
            if (data["type"].toLowerCase() == "ht") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/HTPanel"], {
                  queryParams: {
                    id: typeof job._id == "string" ? job._id : job._id.$oid,
                    type: data["type"],
                    image_name: job.image_name,
                    isNewJob: true,
                    area: data.sub_area,
                    plant: data.plant,
                  },
                })
              );
              window.open(link, "_blank").postMessage("authenticated");
            } else if (data["type"].toLowerCase() == "hydraulic") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/hydraulic"], {
                  queryParams: {
                    id: typeof job._id == "string" ? job._id : job._id.$oid,
                    type: data["type"],
                    image_name: job.image_name,
                    isNewJob: true,
                    area: data.sub_area,
                    plant: data.plant,
                  },
                })
              );
              window.open(link, "_blank");
            } else if (data["type"].toLowerCase() == "pneumatic") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/pneumatic"], {
                  queryParams: {
                    id: typeof job._id == "string" ? job._id : job._id.$oid,
                    type: data["type"],
                    image_name: job.image_name,
                    isNewJob: true,
                    area: data.sub_area,
                    plant: data.plant,
                  },
                })
              );
              window.open(link, "_blank");
            } else if (data["type"].toLowerCase() == "uceil") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/uceil"], {
                  queryParams: {
                    id: typeof job._id == "string" ? job._id : job._id.$oid,
                    type: data["type"],
                    image_name: job.image_name,
                    isNewJob: true,
                    area: data.sub_area,
                    plant: data.plant,
                  },
                })
              );
              window.open(link, "_blank");
            } else if (data["type"].toLowerCase() == "lt") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/lt"], {
                  queryParams: {
                    id: typeof job._id == "string" ? job._id : job._id.$oid,
                    type: data["type"],
                    image_name: job.image_name,
                    isNewJob: true,
                    area: data.sub_area,
                    plant: data.plant,
                  },
                })
              );
              window.open(link, "_blank");
            } else if (this.addedJob["type"].toLowerCase() == "conveyor") {
              var link = this.router.serializeUrl(
                this.router.createUrlTree(["app/PanelSettings/conveyor"], {
                  queryParams: {
                    id:
                      typeof this.tempAddedJob._id == "string"
                        ? this.tempAddedJob._id
                        : this.tempAddedJob._id.$oid,
                    type: this.tempAddedJob["type"],
                    image_name: this.tempAddedJob.image_name,
                    isNewJob: false,
                    area: this.tempAddedJob.sub_area,
                    plant: this.tempAddedJob.plant,
                    jobNo: this.tempAddedJob.job_no,
                    camera_id: this.tempAddedJob.camera_id
                      ? this.tempAddedJob.camera_id
                      : null,
                    ip_address: this.tempAddedJob.ip_address,
                    department: this.tempAddedJob.department,
                  },
                })
              );
              window.open(link, "_blank");
            }

            setTimeout(() => {
              this.modalService.dismissAll();
            }, 1000);
            this.RefreshData();
            //this.GetCameraList()
          }
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
        this.loading3 = false;
        // this.AddCameraForm.reset()
      }
    );
  }

  OnConfirmAddedIPJob() {
    this.loading3 = true;

    this.server.ConfirmIpJob(this.addedJob).subscribe((response: any) => {
      if (response.success) {
        this.tempAddedJob = response.message[0];
        this.tempAddedJob = { ...this.tempAddedJob, ...this.addedJob };
        this.loading3 = false;
        this.modalService.dismissAll();
        if (this.addedJob["type"].toLowerCase() == "ht") {
          var link = this.router.serializeUrl(
            this.router.createUrlTree(["app/PanelSettings/HTPanel"], {
              queryParams: {
                id:
                  typeof this.tempAddedJob._id == "string"
                    ? this.tempAddedJob._id
                    : this.tempAddedJob._id.$oid,
                type: this.addedJob["type"],
                image_name: this.tempAddedJob.image_name,
                isNewJob: true,
                area: this.addedJob.area,
                plant: this.addedJob.plant,
              },
            })
          );
          window.open(link, "_blank").postMessage("authenticated");
        } else if (this.addedJob["type"].toLowerCase() == "hydraulic") {
          var link = this.router.serializeUrl(
            this.router.createUrlTree(["app/PanelSettings/hydraulic"], {
              queryParams: {
                id:
                  typeof this.tempAddedJob._id == "string"
                    ? this.tempAddedJob._id
                    : this.tempAddedJob._id.$oid,
                type: this.addedJob["type"],
                image_name: this.tempAddedJob.image_name,
                isNewJob: true,
                area: this.addedJob.area,
                plant: this.addedJob.plant,
              },
            })
          );
          window.open(link, "_blank");
        } else if (this.addedJob["type"].toLowerCase() == "pneumatic") {
          var link = this.router.serializeUrl(
            this.router.createUrlTree(["app/PanelSettings/pneumatic"], {
              queryParams: {
                id:
                  typeof this.tempAddedJob._id == "string"
                    ? this.tempAddedJob._id
                    : this.tempAddedJob._id.$oid,
                type: this.addedJob["type"],
                image_name: this.tempAddedJob.image_name,
                isNewJob: true,
                area: this.addedJob.area,
                plant: this.addedJob.plant,
              },
            })
          );
          window.open(link, "_blank");
        } else if (this.addedJob["type"].toLowerCase() == "uceil") {
          var link = this.router.serializeUrl(
            this.router.createUrlTree(["app/PanelSettings/uceil"], {
              queryParams: {
                id:
                  typeof this.tempAddedJob._id == "string"
                    ? this.tempAddedJob._id
                    : this.tempAddedJob._id.$oid,
                type: this.addedJob["type"],
                image_name: this.tempAddedJob.image_name,
                isNewJob: true,
                area: this.addedJob.area,
                plant: this.addedJob.plant,
              },
            })
          );
          window.open(link, "_blank");
        } else if (this.addedJob["type"].toLowerCase() == "lt") {
          var link = this.router.serializeUrl(
            this.router.createUrlTree(["app/PanelSettings/lt"], {
              queryParams: {
                id:
                  typeof this.tempAddedJob._id == "string"
                    ? this.tempAddedJob._id
                    : this.tempAddedJob._id.$oid,
                type: this.tempAddedJob["type"],
                image_name: this.tempAddedJob.image_name,
                isNewJob: true,
                area: this.tempAddedJob.sub_area,
                plant: this.tempAddedJob.plant,
              },
            })
          );
          window.open(link, "_blank");
        } else if (this.addedJob["type"].toLowerCase() == "conveyor") {
          console.log("conveyor job adding");
          var link = this.router.serializeUrl(
            this.router.createUrlTree(["app/PanelSettings/conveyor"], {
              queryParams: {
                id:
                  typeof this.tempAddedJob._id == "string"
                    ? this.tempAddedJob._id
                    : this.tempAddedJob._id.$oid,
                type: this.tempAddedJob["type"],
                image_name: this.tempAddedJob.image_name,
                isNewJob: false,
                area: this.tempAddedJob.sub_area,
                plant: this.tempAddedJob.plant,
                jobNo: this.tempAddedJob.job_no,
                camera_id: this.tempAddedJob.camera_id
                  ? this.tempAddedJob.camera_id
                  : null,
                ip_address: this.tempAddedJob.ip_address,
                department: this.tempAddedJob.department,
              },
            })
          );
          window.open(link, "_blank");
        }
      }
    });
  }

  OnConfirmAddedRTSPJob() {
    this.loading3 = true;
    this.server.ConfirmRTSPJob(this.addedJob).subscribe(
      (response: any) => {
        if (response.success) {
          this.loading3 = false;
          this.tempAddedJob = response.message[0];
          this.tempAddedJob = { ...this.tempAddedJob, ...this.addedJob };
          console.log("tempjodata", this.tempAddedJob);
          this.modalService.dismissAll();
          if (this.addedJob["type"].toLowerCase() == "ht") {
            var link = this.router.serializeUrl(
              this.router.createUrlTree(["app/PanelSettings/HTPanel"], {
                queryParams: {
                  id:
                    typeof this.tempAddedJob._id == "string"
                      ? this.tempAddedJob._id
                      : this.tempAddedJob._id.$oid,
                  type: this.addedJob["type"],
                  image_name: this.tempAddedJob.image_name,
                  isNewJob: true,
                  area: this.addedJob.area,
                  plant: this.addedJob.plant,
                },
              })
            );
          } else if (this.addedJob["type"].toLowerCase() == "hydraulic") {
            var link = this.router.serializeUrl(
              this.router.createUrlTree(["app/PanelSettings/hydraulic"], {
                queryParams: {
                  id:
                    typeof this.tempAddedJob._id == "string"
                      ? this.tempAddedJob._id
                      : this.tempAddedJob._id.$oid,
                  type: this.addedJob["type"],
                  image_name: this.tempAddedJob.image_name,
                  isNewJob: true,
                  area: this.addedJob.area,
                  plant: this.addedJob.plant,
                },
              })
            );
            window.open(link, "_blank");
          } else if (this.addedJob["type"].toLowerCase() == "pneumatic") {
            var link = this.router.serializeUrl(
              this.router.createUrlTree(["app/PanelSettings/pneumatic"], {
                queryParams: {
                  id:
                    typeof this.tempAddedJob._id == "string"
                      ? this.tempAddedJob._id
                      : this.tempAddedJob._id.$oid,
                  type: this.addedJob["type"],
                  image_name: this.tempAddedJob.image_name,
                  isNewJob: true,
                  area: this.addedJob.area,
                  plant: this.addedJob.plant,
                },
              })
            );
            window.open(link, "_blank");
          } else if (this.addedJob["type"].toLowerCase() == "uceil") {
            var link = this.router.serializeUrl(
              this.router.createUrlTree(["app/PanelSettings/uceil"], {
                queryParams: {
                  id:
                    typeof this.tempAddedJob._id == "string"
                      ? this.tempAddedJob._id
                      : this.tempAddedJob._id.$oid,
                  type: this.addedJob["type"],
                  image_name: this.tempAddedJob.image_name,
                  isNewJob: true,
                  area: this.addedJob.area,
                  plant: this.addedJob.plant,
                },
              })
            );
            window.open(link, "_blank");
          } else if (this.addedJob["type"].toLowerCase() == "lt") {
            var link = this.router.serializeUrl(
              this.router.createUrlTree(["app/PanelSettings/lt"], {
                queryParams: {
                  id:
                    typeof this.tempAddedJob._id == "string"
                      ? this.tempAddedJob._id
                      : this.tempAddedJob._id.$oid,
                  type: this.tempAddedJob["type"],
                  image_name: this.tempAddedJob.image_name,
                  isNewJob: true,
                  area: this.tempAddedJob.sub_area,
                  plant: this.tempAddedJob.plant,
                },
              })
            );
            window.open(link, "_blank");
          } else if (this.addedJob["type"].toLowerCase() == "conveyor") {
            console.log("conveyor job adding");
            var link = this.router.serializeUrl(
              this.router.createUrlTree(["app/PanelSettings/conveyor"], {
                queryParams: {
                  id:
                    typeof this.tempAddedJob._id == "string"
                      ? this.tempAddedJob._id
                      : this.tempAddedJob._id.$oid,
                  type: this.tempAddedJob["type"],
                  image_name: this.tempAddedJob.image_name,
                  isNewJob: false,
                  area: this.tempAddedJob.sub_area,
                  plant: this.tempAddedJob.plant,
                  jobNo: this.tempAddedJob.job_no,
                  camera_id: this.tempAddedJob.camera_id
                    ? this.tempAddedJob.camera_id
                    : null,
                  ip_address: this.tempAddedJob.ip_address,
                  department: this.tempAddedJob.department,
                },
              })
            );
            window.open(link, "_blank");
          }
        }
      },
      (Err) => {
        this.isFail = true;
        this.responseMessage = "Error whie adding the job,Retry";
      }
    );
  }
  OnConfirmJobAsSame() {
    this.modalService.dismissAll();
    if (this.addedJob["type"].toLowerCase() == "ht") {
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/HTPanel"], {
          queryParams: {
            id:
              typeof this.tempAddedJob._id == "string"
                ? this.tempAddedJob._id
                : this.tempAddedJob._id.$oid,
            type: this.addedJob["type"],
            image_name: this.tempAddedJob.image_name,
            isNewJob: false,
            area: this.addedJob.sub_area,
            plant: this.addedJob.plant,
          },
        })
      );
      window.open(link, "_blank");
    } else if (this.addedJob["type"].toLowerCase() == "hydraulic") {
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/hydraulic"], {
          queryParams: {
            id:
              typeof this.tempAddedJob._id == "string"
                ? this.tempAddedJob._id
                : this.tempAddedJob._id.$oid,
            type: this.addedJob["type"],
            image_name: this.tempAddedJob.image_name,
            isNewJob: false,
            area: this.addedJob.sub_area,
            plant: this.addedJob.plant,
          },
        })
      );
      window.open(link, "_blank");
    } else if (this.addedJob["type"].toLowerCase() == "pneumatic") {
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/pneumatic"], {
          queryParams: {
            id:
              typeof this.tempAddedJob._id == "string"
                ? this.tempAddedJob._id
                : this.tempAddedJob._id.$oid,
            type: this.addedJob["type"],
            image_name: this.tempAddedJob.image_name,
            isNewJob: false,
            area: this.addedJob.sub_area,
            plant: this.addedJob.plant,
          },
        })
      );
      window.open(link, "_blank");
    } else if (this.addedJob["type"].toLowerCase() == "uceil") {
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/uceil"], {
          queryParams: {
            id:
              typeof this.tempAddedJob._id == "string"
                ? this.tempAddedJob._id
                : this.tempAddedJob._id.$oid,
            type: this.addedJob["type"],
            image_name: this.tempAddedJob.image_name,
            isNewJob: true,
            area: this.addedJob.sub_area,
            plant: this.addedJob.plant,
          },
        })
      );
      window.open(link, "_blank");
    } else if (this.addedJob["type"].toLowerCase() == "lt") {
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/lt"], {
          queryParams: {
            id:
              typeof this.tempAddedJob._id == "string"
                ? this.tempAddedJob._id
                : this.tempAddedJob._id.$oid,
            type: this.tempAddedJob["type"],
            image_name: this.tempAddedJob.image_name,
            isNewJob: true,
            area: this.tempAddedJob.sub_area,
            plant: this.tempAddedJob.plant,
          },
        })
      );
      window.open(link, "_blank");
    } else if (this.tempAddedJob["type"].toLowerCase() == "conveyor") {
      var link = this.router.serializeUrl(
        this.router.createUrlTree(["app/PanelSettings/conveyor"], {
          queryParams: {
            id:
              typeof this.tempAddedJob._id == "string"
                ? this.tempAddedJob._id
                : this.tempAddedJob._id.$oid,
            type: this.tempAddedJob["type"],
            image_name: this.tempAddedJob.image_name,
            isNewJob: false,
            area: this.tempAddedJob.sub_area,
            plant: this.tempAddedJob.plant,
            jobNo: this.tempAddedJob.job_no,
            camera_id: this.tempAddedJob.camera_id
              ? this.tempAddedJob.camera_id
              : null,
            ip_address: this.tempAddedJob.ip_address,
            department: this.tempAddedJob.department,
          },
        })
      );
      window.open(link, "_blank");
    }
  }

  manualDataAddForm: FormGroup = new FormGroup({
    newValues: new FormArray([
      new FormGroup({
        tag: new FormControl("", Validators.required),
        lock: new FormControl("", Validators.required),
        rackMethod: new FormControl("", Validators.required),
        fiveMeter: new FormControl("", Validators.required),
        IRRDInTime: new FormControl(""),
        IRRDOutTime: new FormControl(""),
        ppeViolations: new FormControl("", Validators.required),
      }),
    ]),
    addedValues: new FormArray([
      new FormGroup({
        tag: new FormControl("", Validators.required),
        lock: new FormControl("", Validators.required),
        rackProcess: new FormControl("", Validators.required),
        rackMethod: new FormControl("", Validators.required),
        fiveMeter: new FormControl("", Validators.required),
        ppeViolations: new FormControl("", Validators.required),
        IRRDInTime: new FormControl(""),
        IRRDOutTime: new FormControl(""),
      }),
    ]),
  });

  get getNewValueControls() {
    return this.manualDataAddForm.get("newValues") as FormArray;
  }
  addNewValue() {
    this.getNewValueControls.push(
      new FormGroup({
        tag: new FormControl("", Validators.required),
        lock: new FormControl("", Validators.required),
        rackProcess: new FormControl("", Validators.required),
        rackMethod: new FormControl("", Validators.required),
        fiveMeter: new FormControl("", Validators.required),
        ppeViolations: new FormControl("", Validators.required),
        IRRDInTime: new FormControl(""),
        IRRDOutTime: new FormControl(""),
      })
    );
  }
  deleteNewValue(index: number) {
    this.getNewValueControls.controls.splice(index, 1);
  }
  OnSaveNewManualData() {
    console.log(this.manualDataAddForm.value);
  }
  ondate1valueChange(event: any) {
    console.log(event);
  }
}
