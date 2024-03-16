import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Observable, retry, Subject } from "rxjs";
import { configService } from "./config.service";
import { SocketService } from "./socket-server.service";
@Injectable({
  providedIn: "root",
})
export class ServerService {
  // private secretKey = 'docketrun-944';
  IP: string;
  IP_ESI: string;
  steamDataDelay: number;
  delay: number;
  relayDelay: number;
  notificationSetting:Subject<boolean>=new BehaviorSubject(true)
  alertVoiceSettings:Subject<boolean>=new BehaviorSubject(true)
  dashboardInterval: number=3000;
  jobsheetInterval: number=3000;
  jobsheetDataInterval2: number=3000;
  jobsheetDataInterval: number=3000;
  userName: string = "";
  password: string = "";
  startEsiApi: any;
  logInterval: number = 0;
  liveViolInterval: any;
  ccLiveInterval: any;
  raLiveInterval: any;
  unplannedInterval: any;
  configInfo: any;
  secretKey: string = "docketrun-944";
  ppeLiveInterval: any;
  public userType: string = "admin";
  CameraSettingsChanges: Subject<boolean> = new Subject();
  checkApplicationStatusInterval:number

  isCollapse: Subject<boolean> = new Subject();
  constructor(
    public http: HttpClient,
    public snackbar: MatSnackBar,
    public datePipe: DatePipe,
    private configService:configService,
  ) {
   this.notificationSetting.next(localStorage.getItem('alert')=='true'?true:false)
   this.alertVoiceSettings.next(localStorage.getItem('audioOff')=='true'?true:false)
    var res = this.configService.config
    console.log(res,'response of config')
    this.IP=res.IP
    this.IP_ESI=res.IP_ESI
    
    this.dashboardInterval=res.dashboardInterval
    this.jobsheetDataInterval=res.jobSheetDataInterval
    this.jobsheetInterval=res.jobSheetStatusInterval
    this.jobsheetDataInterval2=res.jobSheetDataInterval2
    this.startEsiApi=res.StartESIAppApi
    this.steamDataDelay=res.steamSuitInterval
    this.logInterval=res.logInterval
    this.unplannedInterval=res.unallocatedInterval
    this.delay=res.hooterDelay
    this.relayDelay=res.relayDelay
    this.checkApplicationStatusInterval = res.checkApplicationStatusInterval
  }

  JobSheetUpload(file: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.IP + "/upload_file", file, {
      withCredentials: true,
    });
  }

  set ConfigValues(value: any) {
    this.configInfo = value;
    console.log(this.configInfo);
  }
  UploadCameraIPsFile(file: any) {
    return this.http.post(this.IP + "/upload_cameras_excel", file, {
      withCredentials: true,
    });
  }
  TestCameraIps() {
    return this.http.get(this.IP + "/get_camera_status_excel", {
      withCredentials: true,
    });
  }
  UpdateNotificationSettings(value:boolean){
    this.notificationSetting.next(value)
  }
  UpdateVoiceAlert(value:boolean){
    this.alertVoiceSettings.next(value)
  }
  GetNotificationSettings(){
    return this.notificationSetting.asObservable()
  }
  GetVoiceAlertSettings(){
    return this.alertVoiceSettings.asObservable()
  }
  DownloadCameraSheet() {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    });
    return this.http.get(this.IP + "/download_camera_status_sheet", {
      headers: headers,
      observe: "body",
      responseType: "arraybuffer",
    });
  }

  DeleteJobPanel(data: any) {
    return this.http.post(this.IP + "/delete_panel", data);
  }

  DeleteEntireJob(id: any) {
    return this.http.get(this.IP + "/delete_ht_job/" + id);
  }
  DeleteRiroJob(data: any) {
    return this.http.get(this.IP + "/delete_riro_data/" + data);
  }

  EditRiroJob(data1: any) {
    return this.http.post(this.IP + "/edit_riro_data", { data: data1 });
  }
  SaveRemark(data1: any) {
    return this.http.post(this.IP + "/AddRemarksForHoleJob", data1);
  }
  DeleteJobRemark(data: any) {
    return this.http.post(this.IP + "/RemoveRemarksForHoleJob", data);
  }
  DeleteRiroRemark(riroID: any) {
    return this.http.get(this.IP + "/deleteRemark/" + riroID);
  }
  DeleteTagname(data: any) {
    return this.http.post(this.IP + "/DeleteTagName", data);
  }
  DeleteDepartmentName(data: any) {
    return this.http.post(this.IP + "/DeleteDepartmentname", data);
  }
  DeleteSubArea(data: any) {
    return this.http.post(this.IP + "/DeleteAreaName", data);
  }
  DeleteJobDesc(data: any) {
    return this.http.post(this.IP + "/DeleteJobDescription", data);
  }
  DeleteBoardname(data: any) {
    return this.http.post(this.IP + "/DeleteSwitchBoardName", data);
  }

  GetRiroHistoryByPanel(data: any) {
    return this.http.post(this.IP + "/riro_all_jobs_data_by_panel_id", data);
  }
  GetLockHistory(data: any) {
    return this.http.post(this.IP + "/hydra_history", data);
  }
  AddJobPanelByRtsp(data: any) {
    return this.http.post(this.IP + "/add_panel_rtsp", data);
  }
  AddJobPanelByIp(data: any) {
    return this.http.post(this.IP + "/add_panel_ip", data);
  }
  AddJobByExcelsheet(formData: any) {
    return this.http.post(this.IP + "/AddJobsViasheet", formData);
  }
  GetNewJobData(id: any, imagename: string) {
    return this.http.get(this.IP + "/get_panel_data3/" + id + "/" + imagename);
  }
  ConfirmIpJob(data: any) {
    return this.http.post(this.IP + "/add_panelNew_ip", data);
  }
  ConfirmRTSPJob(data: any) {
    return this.http.post(this.IP + "/add_panel_New_rtsp", data);
  }

  SampleExcelDownload() {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    });

    return this.http.get(this.IP + "/get_samplefile", {
      headers: headers,
      observe: "response",
      responseType: "arraybuffer",
    });
  }
  // loadConfigFile(filepath:any){
  //   const JSON=this.readConfigFile(filepath,'application/json')
  //   return JSON
  // }
  readConfigFile(filepath: any, mimeType: any) {
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", filepath, false);
    if (mimeType != null) {
      if (xmlRequest.overrideMimeType) {
        xmlRequest.overrideMimeType(mimeType);
      }
      xmlRequest.send();
      if (xmlRequest.status) {
        return xmlRequest.response;
      } else {
        return null;
      }
    }
  }

  GetPreviousJobsheetIds() {
    return this.http.get(this.IP + "/get_list_job_sheets");
  }
  GetPrevJobsheetStatus(id: any) {
    return this.http.get(this.IP + "/get_job_sheet_status/" + id);
  }

  getPrevJobsheetData(id: string) {
    return this.http.get(this.IP_ESI + "/multiisolation/" + id);
  }
  GetUnAllocatedCount() {
    return this.http.get(this.IP + "/GetUnplannedLivecount");
  }
  GetJobSheet() {
    return this.http.get(this.IP_ESI + "/multiisolation");
  }
  GetShudownName() {
    return this.http.get(this.IP + "/GetShutdownname");
  }
  UpdateShutdownName(data: any) {
    return this.http.post(this.IP + "/UpdateShutdownname", data);
  }
  GetL1data() {
    return this.http.get(this.IP + "/GetL1dataofHT");
  }

  GetFlasherDetails(ip: any, panelNumber: any) {
    return this.http.get(
      this.IP + "/fetchdataflasher/" + ip + "/" + panelNumber
    );
  }

  GetJobSheetDataByfilters(ip: any, dep: any, panel: any, jobType: any) {
    return this.http.post(this.IP + "/SORTINGJOBSHEETDATA", {
      ip_address: ip,
      department: dep,
      panel_no: panel,
    });
  }
  GetJobSheetDataByfilter(
    dep: any,
    ip: any,
    panel: any,
    jobType: any,
    jobno: any
  ) {
    // ip==''?ip=null:''
    // dep==''?dep=null:''
    // jobType==''?jobType=null:''
    // panel==''?panel=null:''
    // jobno==''?jobno=null:''
    return ip == null &&
      dep == null &&
      panel == null &&
      jobType == null &&
      jobno == null
      ? this.http.get(this.IP_ESI + "/multiisolation")
      : this.http.post(this.IP + "/SORTINGBYJOBTYPE", {
          department: dep,
          ip_address: ip,
          panel_no: panel,
          type: jobType,
          job_no: jobno,
        });
  }
  GetPreviousESIDataByfilter(
    ip: any,
    dep: any,
    panel: any,
    jobType: any,
    jobno: any,
    jobsheet_id?: string
  ) {
    // ip==''?ip=null:''
    // dep==''?dep=null:''
    // jobType==''?jobType=null:''
    // panel==''?panel=null:''
    // jobno==''?jobno=null:''
    return ip == "" && dep == "" && panel == "" && jobType == "" && jobno == ""
      ? this.http.get(this.IP_ESI + "/multiisolation/" + jobsheet_id)
      : this.http.post(this.IP + "/SORTINGBYJOBTYPE/" + jobsheet_id, {
          department: dep,
          ip_address: ip,
          panel_no: panel,
          type: jobType,
          job_no: jobno,
        });
  }

  GetPanelCameraData(id: string, imageName: string) {
    return this.http.get(this.IP + "/get_panel_data1/" + id + "/" + imageName);
  }
  GetJobsheetStatus() {
    return this.http.get(this.IP_ESI + "/get_job_sheet_status");
  }
  GetRACameraData(id: string) {
    return this.http.get(this.IP + "/get_ra_camera_details/" + id);
  }

  ResetJobsheet() {
    return this.http.get(this.IP + "/reset_jobsheet");
  }
  CreateJobsheetExcel(jobsheetID: string) {
    return jobsheetID
      ? this.http.get(this.IP + "/create_excel/" + jobsheetID)
      : this.http.get(this.IP + "/create_excel");
  }

  CreateViolationExcel(data: any) {
    return this.http.post(this.IP + "/create_violation_excel", data);
  }
  CreateRAViolationExcel(data: any) {
    return this.http.post(this.IP + "/create_violation_excelRA", data);
  }

  CreatePPEViolationExcel(data: any) {
    return this.http.post(this.IP + "/create_violation_excelPPE", data);
  }
  CreateCCViolationExcel(data: any) {
    return this.http.post(this.IP + "/create_violation_excelCRDCNT", data);
  }

  DownloadViolationExcel() {
    return this.http.get(this.IP + "/violation_excel_download", {
      observe: "response",
      responseType: "arraybuffer",
    });
  }

  DownloadJobsheet() {
    const headers = new HttpHeaders({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      Accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return this.http.get(this.IP + "/excel_download", {
      observe: "body",
      responseType: "arraybuffer",
      headers: headers,
    });
  }
  AddCameraDetails(details: any) {
    return this.http.post(this.IP + "/add_camera", details);
  }
  DeleteCameraDetails(id: string) {
    return this.http.get(this.IP + "/delete_ra_camera/" + id);
  }
  AddRACamerabyRtsp(details: any) {
    return this.http.post(this.IP + "/add_camera_rtsp", details);
  }
  EditCamera(details: any) {
    return this.http.post(this.IP + "/edit_camera", details);
  }

  CheckLicense() {
    return this.http.get(this.IP + "/check_license");
  }

  getCameraExcelSample() {
    // const headers = new HttpHeaders({
    //     'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    //   'Accept-Language': 'en-US,en;q=0.5',
    //  ' Accept-Encoding':' gzip, deflate',

    // })
    return this.http.get(this.IP + "/get_samplefileFORCHECKCAMERA", {
      observe: "response",
      responseType: "blob",
    });
  }

  CheckJobAddLicense() {
    return this.http.get(this.IP + "/licenseNewcount");
  }

  AddROI(data: any) {
    return this.http.post(this.IP + "/add_roi", data);
  }
  EditROI(data: any) {
    return this.http.post(this.IP + "/edit_roi", data);
  }
  GetCamereFeedImage(id: any) {
    return this.http.get(this.IP + "/CameraIMAGE/" + id);
  }
  AddFireSmokeToFrame(data: any) {
    return this.http.post(this.IP + "/add_firesmoke", data);
  }
  DeleteFireSmokeFrame(data: any) {
    return this.http.post(this.IP + "/delete_firesmoke", data);
  }

  AddCrowdCount(data: any) {
    //192.168.1.80:5000/add_tc_data

    http: return this.http.post(this.IP + "/add_cr_data", data);
  }

  AddTCData(data: any) {
    return this.http.post(this.IP + "/add_tc_data", data);
  }

  EditCCData(data: any) {
    return this.http.post(this.IP + "/edit_crdata", data);
  }

  deleteCCData(data: any) {
    return this.http.post(this.IP + "/delete_cr_data", data);
  }
  deleteCCFrameData(data: any) {
    return this.http.post(this.IP + "/delete_crfullframe_data", data);
  }

  deleteTCData(data: any) {
    return this.http.post(this.IP + "/delete_tc_data", data);
  }

  EditAlarm(details: any) {
    return this.http.post(this.IP + "/edit_alarmdetails", details);
  }

  AddHydraulicROI(data: any) {
    return this.http.post(this.IP + "/add_hydraulic", data);
  }
  AddPnuematicROI(data: any) {
    return this.http.post(this.IP + "/add_pneumatic", data);
  }

  LatestData(violtype: any, cameraname: string) {
    // return this.http.get(this.IP+'/latest_data')
    return cameraname && !violtype
      ? this.http.get(this.IP + "/latest_data_camera_name/" + cameraname)
      : !cameraname && violtype
      ? this.http.get(this.IP + "/latest_data_violation_type/" + violtype)
      : cameraname && violtype
      ? this.http.get(this.IP + "/latest_data/" + cameraname + "/" + violtype)
      : this.http.get(this.IP + "/latest_data_violation_type");
  }

  DatewiseData(fromDate: any, toDate: any) {
    return this.http.post(this.IP + "/datewise", {
      from_date: fromDate,
      to_date: toDate,
    });
  }

  ppeViolCountCamwise() {
    return this.http.get(this.IP + "/ppe_violations_count_cam_wise");
  }
  RAViolCountCamWise() {
    return this.http.get(this.IP + "/RA_violations_count_cam_wise");
  }

  StartApplication() {
    return this.http.get(this.IP + "/create_phaseone_config");
  }
  SetMockDrill(flag: any) {
    return this.http.get(this.IP + "/set_mockdrill/" + flag);
  }

  StartFireSmoke(data: any) {
    return this.http.post(this.IP + "/start_firesmoke", data);
  }

  StopFireSmoke() {
    return this.http.get(this.IP + "/stop_firesmokeapp");
  }
  GetMockDrillStatus() {
    return this.http.get(this.IP + "/set_mockdrill");
  }

  StartSpillageApp(configData: { media_type: string; data_interval: number }) {
    return this.http.post(this.IP + "/start_spillage", configData);
  }

  StopSpillageApp() {
    return this.http.get(this.IP + "/stop_spillageapp");
  }
  StartESIApp() {
    return this.http.get(this.IP + "/" + this.startEsiApi);
  }

  StartHydroApp() {
    return this.http.get(this.IP + "/create_hydra_config");
  }

  StopHydroApp() {
    return this.http.get(this.IP + "/stop_hydraapp");
  }

  ConfigRtsp(option: any) {
    return this.http.get(this.IP + "/set_rtsp_flag/" + option);
  }

  StopESIApp() {
    return this.http.get(this.IP + "/stop_app_esi");
  }

  dateTransform(date: Date) {
    return this.datePipe.transform(date, "yyyy-MM-dd HH:mm:ss");
  }

  dateTransformbyPattern(date: Date, pattern: string) {
    return this.datePipe.transform(date, pattern);
  }

  getCameras() {
    return this.http.get(this.IP + "/get_ra_camera_details");
  }

  GetCameraDetails() {
    return this.http.get(this.IP + "/camera_details");
  }

  GetRACameraDetails() {
    return this.http.get(this.IP + "/camera_detailsRA");
  }

  GetLicenseDetails() {
    return this.http.get(this.IP + "/licenseNewcount");
  }
  GetPPECameraDetails() {
    return this.http.get(this.IP + "/camera_detailsPPE");
  }
  GetCCCameraDetails() {
    return this.http.get(this.IP + "/camera_detailsCRDCNT");
  }
  GetTCCameraDetails() {
    return this.http.get(this.IP + "/camera_detailsTC");
  }

  DeleteRoi(data: any) {
    return this.http.post(this.IP + "/delete_roi", data);
  }

  DeleteHydroRoi(data: any) {
    return this.http.post(this.IP + "/delete_hydraulic", data);
  }

  DeletePneuRoi(data: any) {
    return this.http.post(this.IP + "/delete_pneumatic", data);
  }

  GetAreasByPlant(plant: any) {
    return this.http.post(this.IP + "/get_area_details", { plant: plant });
  }

  GetPlantList() {
    return this.http.get(this.IP + "/get_plant_details");
  }

  GetPanelsByArea(area: any) {
    return this.http.get(this.IP + "/panel_wise/area/" + area);
  }

  GetCameraBrandDetails() {
    return this.http.get(this.IP + "/get_camera_brand_details");
  }

  LiveViolationData(
    cameraName?: string | null,
    violType?: string | null,
    page?: number,
    size?: number
  ) {
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";

    return page && size && cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1/" +
            cameraName +
            "/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && cameraName && violType
      ? this.http.get(this.IP + "/live_data1/" + cameraName + "/" + violType)
      : page && size && cameraName && !violType
      ? this.http.get(
          this.IP +
            "/live_data1/cameraname/" +
            cameraName +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && !cameraName && violType
      ? this.http.get(this.IP + "/live_data1/violation/" + violType)
      : page && size && !cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1/violation/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : page && size && !cameraName && !violType
      ? this.http.get(this.IP + "/live_data1/pagination/" + page + "/" + size)
      : !page && !size && cameraName && !violType
      ? this.http.get(this.IP + "/live_data1/cameraname/" + cameraName)
      : this.http.get(this.IP + "/live_data1");
  }

  DatewiseViolationData() {
    return this.http.get(this.IP + "/live_data");
  }

  GetCameraNames() {
    return this.http.get(this.IP + "/camera_details");
  }

  GetViolationList() {
    return this.http.get(this.IP + "/violation_type_details");
  }
  LiveRAViolationData(
    cameraName?: string | null,
    violType?: string | null,
    page?: number,
    size?: number
  ) {
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";

    return page && size && cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1RA/" +
            cameraName +
            "/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && cameraName && violType
      ? this.http.get(this.IP + "/live_data1RA/" + cameraName + "/" + violType)
      : page && size && cameraName && !violType
      ? this.http.get(
          this.IP +
            "/live_data1RA/cameraname/" +
            cameraName +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && !cameraName && violType
      ? this.http.get(this.IP + "/live_data1RA/violation/" + violType)
      : page && size && !cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1RA/violation/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : page && size && !cameraName && !violType
      ? this.http.get(this.IP + "/live_data1RA/pagination/" + page + "/" + size)
      : !page && !size && cameraName && !violType
      ? this.http.get(this.IP + "/live_data1RA/cameraname/" + cameraName)
      : this.http.get(this.IP + "/live_data1RA");
  }

  LivePPEViolationData(
    cameraName?: string | null,
    violType?: string | null,
    page?: number,
    size?: number
  ) {
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";

    return page && size && cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1PPE/" +
            cameraName +
            "/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && cameraName && violType
      ? this.http.get(this.IP + "/live_data1PPE/" + cameraName + "/" + violType)
      : page && size && cameraName && !violType
      ? this.http.get(
          this.IP +
            "/live_data1PPE/cameraname/" +
            cameraName +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && !cameraName && violType
      ? this.http.get(this.IP + "/live_data1/violation/" + violType)
      : page && size && !cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1PPE/violation/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : page && size && !cameraName && !violType
      ? this.http.get(
          this.IP + "/live_data1PPE/pagination/" + page + "/" + size
        )
      : !page && !size && cameraName && !violType
      ? this.http.get(this.IP + "/live_data1PPE/cameraname/" + cameraName)
      : this.http.get(this.IP + "/live_data1PPE");
  }
  LiveCCViolationData(
    cameraName?: string | null,
    violType?: string | null,
    page?: number,
    size?: number
  ) {
    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";

    return page && size && cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1CC/" +
            cameraName +
            "/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && cameraName && violType
      ? this.http.get(this.IP + "/live_data1CC/" + cameraName + "/" + violType)
      : page && size && cameraName && !violType
      ? this.http.get(
          this.IP +
            "/live_data1CC/cameraname/" +
            cameraName +
            "/" +
            page +
            "/" +
            size
        )
      : !page && !size && !cameraName && violType
      ? this.http.get(this.IP + "/live_data1CC/violation/" + violType)
      : page && size && !cameraName && violType
      ? this.http.get(
          this.IP +
            "/live_data1CC/violation/" +
            violType +
            "/" +
            page +
            "/" +
            size
        )
      : page && size && !cameraName && !violType
      ? this.http.get(this.IP + "/live_data1CC/pagination/" + page + "/" + size)
      : !page && !size && cameraName && !violType
      ? this.http.get(this.IP + "/live_data1CC/cameraname/" + cameraName)
      : this.http.get(this.IP + "/live_data1CC");
  }
  DeleteViolationData(id: any) {
    return this.http.get(this.IP + "/Deleteviolation/" + id);
  }
  GetLatestRAData(camera_name: any) {
    return camera_name
      ? this.http.get(this.IP + "/latest_dataRA/" + camera_name)
      : this.http.get(this.IP + "/latest_dataRA");
  }
  GetLatestPPEData(camera_name: any) {
    return camera_name
      ? this.http.get(this.IP + "/latest_dataPPE/" + camera_name)
      : this.http.get(this.IP + "/latest_dataPPE");
  }
  GetLatestCCData(camera_name: any) {
    return camera_name
      ? this.http.get(this.IP + "/latest_dataCC/" + camera_name)
      : this.http.get(this.IP + "/latest_dataCC");
  }

  GetPPEFiltersData() {
    return this.http.get(this.IP + "/PPEviolationPercentage");
  }
  ChangePPEFiltersData(data: any) {
    return this.http.post(this.IP + "/PPEviolationPercentage", data);
  }
  DatewiseRAViolations(
    from: any,
    to: any,
    page?: number | null,
    size?: number | null,
    cameraName?: string | null,
    violType?: string | null
  ) {
    var fromD = this.dateTransform(from);
    var toD = this.dateTransform(to);

    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";
    var body;

    violType !== null
      ? (body = { from_date: fromD, to_date: toD, violation_type: violType })
      : (body = { from_date: fromD, to_date: toD });

    return page && size && cameraName && violType
      ? this.http.post(
          this.IP +
            "/datewiseRA_violation/" +
            cameraName +
            "/" +
            page +
            "/" +
            size,
          body
        )
      : !page && !size && cameraName && violType
      ? this.http.post(this.IP + "/datewiseRA_violation/" + cameraName, body)
      : page && size && cameraName
      ? this.http.post(
          this.IP + "/datewiseRA/" + cameraName + "/" + page + "/" + size,
          body
        )
      : !page && !size && !cameraName && violType
      ? this.http.post(this.IP + "/datewise_violationRA", body)
      : page && size && !cameraName && violType
      ? this.http.post(
          this.IP + "/datewise_violationRA/" + page + "/" + size,
          body
        )
      : page && size && !cameraName && !violType
      ? this.http.post(this.IP + "/datewiseRA/" + page + "/" + size, body)
      : !page && !size && cameraName && !violType
      ? this.http.post(this.IP + "/datewiseRA/" + cameraName, body)
      : this.http.post(this.IP + "/datewiseRA", body);
  }
  DatewisePPEViolations(
    from: any,
    to: any,
    page?: number | null,
    size?: number | null,
    cameraName?: string | null,
    violType?: string | null
  ) {
    var fromD = this.dateTransform(from);
    var toD = this.dateTransform(to);

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";
    var body;

    violType !== null
      ? (body = { from_date: fromD, to_date: toD, violation_type: violType })
      : (body = { from_date: fromD, to_date: toD });
    return page && size && cameraName && violType
      ? this.http.post(
          this.IP +
            "/datewise_violationPPE/" +
            cameraName +
            "/" +
            page +
            "/" +
            size,
          body
        )
      : !page && !size && cameraName && violType
      ? this.http.post(this.IP + "/datewise_violationPPE/" + cameraName, body)
      : page && size && cameraName
      ? this.http.post(
          this.IP + "/datewisePPE/" + cameraName + "/" + page + "/" + size,
          body
        )
      : !page && !size && !cameraName && violType
      ? this.http.post(this.IP + "/datewise_violationPPE", body)
      : page && size && !cameraName && violType
      ? this.http.post(
          this.IP + "/datewise_violationPPE/" + page + "/" + size,
          body
        )
      : page && size && !cameraName && !violType
      ? this.http.post(this.IP + "/datewisePPE/" + page + "/" + size, body)
      : !page && !size && cameraName && !violType
      ? this.http.post(this.IP + "/datewisePPE/" + cameraName, body)
      : this.http.post(this.IP + "/datewisePPE", body);
  }
  DatewiseCCViolations(
    from: any,
    to: any,
    page?: number | null,
    size?: number | null,
    cameraName?: string | null,
    violType?: string | null
  ) {
    var fromD = this.dateTransform(from);
    var toD = this.dateTransform(to);

    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";
    var body;

    violType !== null
      ? (body = { from_date: fromD, to_date: toD, violation_type: violType })
      : (body = { from_date: fromD, to_date: toD });
    return page && size && cameraName && violType
      ? this.http.post(
          this.IP +
            "/datewise_violationCC/" +
            cameraName +
            "/" +
            page +
            "/" +
            size,
          body
        )
      : !page && !size && cameraName && violType
      ? this.http.post(this.IP + "/datewise_violationCC/" + cameraName, body)
      : page && size && cameraName
      ? this.http.post(
          this.IP + "/datewisePPE/" + cameraName + "/" + page + "/" + size,
          body
        )
      : !page && !size && !cameraName && violType
      ? this.http.post(this.IP + "/datewise_violationCC", body)
      : page && size && !cameraName && violType
      ? this.http.post(
          this.IP + "/datewise_violationCC/" + page + "/" + size,
          body
        )
      : page && size && !cameraName && !violType
      ? this.http.post(this.IP + "/datewiseCC/" + page + "/" + size, body)
      : !page && !size && cameraName && !violType
      ? this.http.post(this.IP + "/datewiseCC/" + cameraName, body)
      : this.http.post(this.IP + "/datewiseCC", body);
  }

  GetRiRoViolationData(data: any) {
    return this.http.post(this.IP + "/riro_violation_data", data);
  }
  VerifyViolation(id: string, flag: any) {
    return this.http.get(
      this.IP + "/violation_verification/" + id + "/" + flag
    );
  }

  DatewiseViolations(
    from: any,
    to: any,
    page?: number | null,
    size?: number | null,
    cameraName?: string | null,
    violType?: string | null
  ) {
    var fromD = this.dateTransform(from);
    var toD = this.dateTransform(to);

    // cameraName=cameraName? cameraName.replace(/ /g,'_'):null

    cameraName === "all_cameras" ? (cameraName = null) : "";
    violType === "all_violations" ? (violType = null) : "";
    var body;

    violType !== null
      ? (body = { from_date: fromD, to_date: toD, violation_type: violType })
      : (body = { from_date: fromD, to_date: toD });

    return page && size && cameraName && violType
      ? this.http.post(
          this.IP +
            "/datewise_violation/" +
            cameraName +
            "/" +
            page +
            "/" +
            size,
          body
        )
      : !page && !size && cameraName && violType
      ? this.http.post(this.IP + "/datewise_violation/" + cameraName, body)
      : page && size && cameraName
      ? this.http.post(
          this.IP + "/datewise/" + cameraName + "/" + page + "/" + size,
          body
        )
      : !page && !size && !cameraName && violType
      ? this.http.post(this.IP + "/datewise_violation", body)
      : page && size && !cameraName && violType
      ? this.http.post(
          this.IP + "/datewise_violation/" + page + "/" + size,
          body
        )
      : page && size && !cameraName && !violType
      ? this.http.post(this.IP + "/datewise/" + page + "/" + size, body)
      : !page && !size && cameraName && !violType
      ? this.http.post(this.IP + "/datewise/" + cameraName, body)
      : this.http.post(this.IP + "/datewise", body);
  }

  notification(message: string, action?: string) {
    this.snackbar.open(message, action ? action : "", {
      duration: 4000,
      panelClass: ["error"],
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }

  UpdatePanelRoi(data: any) {
    return this.http.post(this.IP + "/update_panel_roi_id", data);
  }

  AddPanelRoi(data: any) {
    return this.http.post(this.IP + "/add_panel_roi_id", data);
  }

  DeleteMechJobs(id: any) {
    return this.http.get(this.IP + "/delete_mechanical_job/" + id);
  }
  DeleteHydroJob(id: any) {
    return this.http.get(this.IP + "/delete_hydradata/" + id);
  }
  UpdateCameraAnalytics(id: any, value: any) {
    return this.http.get(this.IP + "/analytics_status/" + id + "/" + value);
  }
  FetchJobCameraImg(id: any) {
    return this.http.get(this.IP + "/recaptureImageJob/" + id);
  }

  GetPanelsList(plant: any, area: any) {
    return this.http.post(this.IP + "/get_panel_details", {
      plant: plant,
      area: area,
    });
  }
  GetJobNumbers(data?: { type: string | null }) {
    return data
      ? this.http.post(this.IP + "/GetJOBNUMBER", data)
      : this.http.get(this.IP + "/GetJOBNUMBER");
  }
  GetDepList(data?: { job_no: string | null; type: string | null }) {
    return data
      ? this.http.post(this.IP + "/sheetDepartmentlist", data)
      : this.http.get(this.IP + "/sheetDepartmentlist");
  }

  GetJobCamerasIpList(data?: {
    type: string | null;
    job_no: string | null;
    department: string | null;
  }) {
    return data
      ? this.http.post(this.IP + "/sheet_ipaddress", data)
      : this.http.get(this.IP + "/sheet_ipaddress");
  }
  GetDepartmentsByFilters(data: {
    job_no: string | null;
    type: string | null;
  }) {
    return this.http.post(this.IP + "/sheetDepartmentlist", data);
  }
  GetIpsByFilters(data: {
    job_no: string | null;
    type: string | null;
    department: string | null;
  }) {
    return this.http.post(this.IP + "/sheet_ipaddress", data);
  }

  GetJobPanelList(department: any, ip: any, jobNo: null) {
    return this.http.post(this.IP + "/GROUPBYPANEL", {
      department: department,
      ip_address: ip,
      job_no: jobNo,
    });
  }
  JobsheetSortbyIp(ip: any) {
    return this.http.get(this.IP + "/SORTINGIPWISE/" + ip);
  }

  EditFieldjobsheet(data: any, field: any) {
    return field == "tagname"
      ? this.http.post(this.IP + "/UpdateTagName", data)
      : field == "job_description"
      ? this.http.post(this.IP + "/UpdateJobDescription", data)
      : field == "board"
      ? this.http.post(this.IP + "/UpdateSwitchBoardName", data)
      : field == "department"
      ? this.http.post(this.IP + "/UpdateDepartmentname", data)
      : field == "sub_area"
      ? this.http.post(this.IP + "/UpdateAreaName", data)
      : this.http.get(this.IP + "/UpdateAreaName");
  }
  ResetLiveCount() {
    return this.http.get(this.IP + "/reset_live_data_count");
  }

  GetCamerasStatus() {
    return this.http.get(this.IP + "/get_cam_status_enable_cam_count");
  }
  GetViolationDetails() {
    return this.http.get(this.IP + "/get_solution_data_details");
  }

  GetECSolutionCount() {
    return this.http.get(this.IP + "/get_all_solns_enable_cam_count");
  }
  AddSpillageRoi(data: any) {
    return this.http.post(this.IP + "/add_spillage_roi", data);
  }
  EditSpillageData(data: any) {
    return this.http.post(this.IP + "/edit_spillage_roi", data);
  }
  DeleteSpillageRoi(data: any) {
    return this.http.post(this.IP + "/delete_spillage_roi", data);
  }

  GetSolutionCameraDetails() {
    return this.http.get(this.IP + "/get_solution_data_details");
  }
  DisableCamDetails() {
    return this.http.get(this.IP + "/disable_camera_details");
  }

  GetLiveViolationCount() {
    return this.http.get(this.IP + "/get_current_date_violation");
  }
  GetTotaliveViolationsDetails() {
    return this.http.get(this.IP + "/current_date_violations_count");
  }
  GetNotWorkingCameraDetails() {
    return this.http.get(this.IP + "/get_not_working_camera_details");
  }
  GetCCCamwiseDateWise(fromDate: any, toDate: any) {
    return this.http.get(this.IP + "/CR_violations_count_cam_wise");
  }
  GetCCLiveDataCamwise() {
    return this.http.get(this.IP + "/CR_violations_count_cam_wise");
  }
  GetPPEViolCountCamWise() {
    return this.http.get(this.IP + "/ppe_violations_count_cam_wise");
  }
  GetPPEViolationDetails(fromDate: any, toDate: any) {
    return this.http.post(this.IP + "/date_wise_ppe_violations_count", {
      from_date: fromDate,
      to_date: toDate,
    });
  }
  GetTotalViolDetailsDatewise(fromDate: any, toDate: any) {
    return this.http.post(this.IP + "/date_wise_violations_count", {
      from_date: fromDate,
      to_date: toDate,
    });
  }

  GetRAViolationsDetails(fromDate: any, toDate: any) {
    return this.http.post(this.IP + "/date_wise_ra_violations_count", {
      from_date: fromDate,
      to_date: toDate,
    });
  }

  GetFlasherLog() {
    return this.http.get(this.IP + "/fetchdataflasher");
  }
  GetViolationCountDatewise(fromDate: any, toDate: any, violationType?: any) {
    return this.http.post(this.IP + "/date_wise_given_violation_count", {
      from_date: fromDate,
      to_date: toDate,
      violation_type: violationType ? [violationType] : [],
    });
  }
  CheckApplicationStatus() {
    return this.http.get(this.IP + "/check_process");
  }

  GetConveyorImg(data: any) {
    return this.http.post(this.IP + "/check_mechanical_job", data);
  }

  stopApp() {
    return this.http.get(this.IP + "/stop_app_common");
  }
  StartSmartApp() {
    return this.http.get(this.IP + "/create_smart_config");
  }

  StopSmartApp() {
    return this.http.get(this.IP + "/stop_smart_record");
  }

  GetJobTypeList() {
    return this.http.get(this.IP + "/listofjobtypes");
  }

  ModifyRtspString(inputString: any) {
    // Create a regular expression that matches all characters to be replaced
    let replacements: any = {
      ":": "%3A",
      "/": "%2F",
      "@": "%40",
      "?": "%3F",
      "&": "%26",
      "=": "%3D",
    };
    let resultString = inputString;

    for (const key in replacements) {
      // if (replacements.hasOwnProperty(key)) {
      resultString = resultString.split(key).join(replacements[key]);
      // }
    }

    return resultString;
  }

  createToken(payload: any) {
    // return jwt.sign(payload, this.secretKey, { expiresIn: '60h' }); // Token expires in 1 hour
  }

  verifyToken(token: string): any {
    try {
      //return jwt.verify(token, this.secretKey);
    } catch (error) {
      console.error("Error verifying token:", error);
      // return null;
    }
  }
  encodeUserDetails(userDetails: any): string {
    const userDetailsString = JSON.stringify(userDetails);
    const encodedDetails = btoa(userDetailsString + this.secretKey);
    return encodedDetails;
  }

  // Decode token to get user details
  decodeUserDetails(token: string): any {
    try {
      const decodedDetails = atob(token);
      // Remove the secret key to get the original user details string
      const userDetailsString = decodedDetails.replace(this.secretKey, "");
      return JSON.parse(userDetailsString);
    } catch (error) {
      console.error("Error decoding user details:", error);
      return null;
    }
  }

  DeleteJobHistoryData(id: any) {
    return this.http.get(this.IP + "/delete_job_sheet/" + id);
  }
  setUserType(userType: any) {
    this.userType = userType;
  }
  loadConfigFile(filepath: any) {
    const JSON = this.readConfigFile(filepath, "application/json");
    return JSON;
  }
}
