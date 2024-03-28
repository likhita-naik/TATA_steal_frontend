import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StartDate } from "ngx-daterangepicker-material/daterangepicker.component";

@Injectable({
  providedIn: "root",
})
export class RaViolationsService {
  IP: string;
  logInterval: number = 0;
  raLiveInterval: any;
  constructor(
    public http: HttpClient,
    public snackbar: MatSnackBar,
    public datePipe: DatePipe
  ) {
    var res = this.loadConfigFile("assets/config.json");
    res = JSON.parse(res);
    this.IP = res.IP;
    this.logInterval = res.logInterval;
  }

  loadConfigFile(filepath: any) {
    const JSON = this.readConfigFile(filepath, "application/json");
    return JSON;
  }
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

  dateTransform(date: Date) {
    return this.datePipe.transform(date, "yyyy-MM-dd HH:mm:ss");
  }

  LiveRAViolationData(
    cameraName?: string | null,
    department?: string | null,
    page?: number,
    size?: number
  ) {
    department === "all_departments" ? (department = null) : "";
    cameraName === "all_cameras" ? (cameraName = null) : "";

    return page && size && cameraName && department
      ? this.http.get(
          this.IP +
            "/live_data1RA/" +'camera_name/'+
            cameraName +'/department/'+department+
            "/" +
            page +
            "/" +
            size
        )
        :!page && !size && cameraName && department
        ? this.http.get(
            this.IP +
              "/live_data1RA/" +'camera_name/'+
              cameraName +'/department/'+department
             
          )
      : 
      page && size && cameraName&& !department
      ? this.http.get(
          this.IP +
            "/live_data1RA/cameraname/" +
            cameraName +
            "/" +
            page +
            "/" +
            size
        )
      : page && size && department&&!cameraName
      ? this.http.get(
          this.IP +
            "/live_data1RA/department/" +
            department +
            "/" +
            page +
            "/" +
            size
        ) : !page && !size && cameraName&&!department
        ? this.http.get(this.IP + "/live_data1RA/cameraname/" + cameraName)
        : !page && !size && department&&!cameraName
        ? this.http.get(this.IP + "/live_data1RA/department/" + department)
      : 
      page && size && !cameraName
      ? this.http.get(this.IP + "/live_data1RA/pagination/" + page + "/" + size)
      : page && size && !department
      ? this.http.get(this.IP + "/live_data1RA/pagination/" + page + "/" + size)
     
      : !page && !size && cameraName
      ? this.http.get(this.IP + "/live_data1RA/cameraname/" + cameraName)
      : !page && !size && department
      ? this.http.get(this.IP + "/live_data1RA/department/" + department)
      : this.http.get(this.IP + "/live_data1RA");
  }

  DatewiseRAViolations(
    from: any,
    to: any,
    page?: number | null,
    size?: number | null,
    department?: string | null,
    cameraName?: string | null
  ) {
    var fromD = this.dateTransform(from);
    var toD = this.dateTransform(to);

    cameraName === "all_cameras" ? (cameraName = null) : "";
    department === "all_departments" ? (department = null) : "";
    var body:any;
    body = {
      from_date: fromD,
      to_date: toD,
       department_name: department !== null ? department : "none",
    };

    return page && size && cameraName && department
      ? this.http.post(
          this.IP + "/datewiseRA/"  +cameraName+'/'+ page + "/" + size,
          body
        )
      : // page && size && department ? this.http.post(this.IP + '/datewiseRA/' + department + '/' + page + '/' + size, body) :
      !page && !size && !cameraName 
      ? this.http.post(this.IP + "/datewiseRA", body)
      : page && size && !cameraName 
      ? this.http.post(this.IP + "/datewiseRA/" + page + "/" + size, body)
      : page && size && cameraName
      ? this.http.post(this.IP + "/datewiseRA/" +cameraName+'/'+ page + "/" + size, body)
      : !page && !size && cameraName &&!department
      ? this.http.post(this.IP + "/datewiseRA/" + cameraName, body)
      : !page && !size && department && cameraName
      ? this.http.post(this.IP + "/datewiseRA", body)
      : //  !page && !size &&department ? this.http.post(this.IP + '/datewiseRA' , body) :
        this.http.post(this.IP + "/datewiseRA", body);
  }

  CreateRAViolationExcel(data: any) {
    return this.http.post(this.IP + "/create_violation_excelRA", data);
  }

  DownloadViolationExcel() {
    return this.http.get(this.IP + "/violation_excel_download", {
      observe: "response",
      responseType: "arraybuffer",
    });
  }

  GetLatestRAData(camera_name: any, department: any) {
    return (
      camera_name
        ? this.http.get(this.IP + "/latest_dataRA/" + camera_name)
        : this.http.get(this.IP + "/latest_dataRA"),
      department
        ? this.http.get(this.IP + "/latest_dataRA/" + department)
        : this.http.get(this.IP + "/latest_dataRA")
    );
  }

  GetRACameraDetails(from: any, to: any) {
    // var fromD = this.dateTransform(from)
    // var toD = this.dateTransform(to)
    return from === null && to === null
      ? this.http.get(this.IP + "/camera_detailsRA")
      : this.http.post(this.IP + "/camera_detailsRA", {
          from_date: from,
          to_date: to,
        });
  }

  GetRADepartmentDetails(from: any, to: any) {
    // var fromD = this.dateTransform(from)
    // var toD = this.dateTransform(to)
    return from === null && to === null
      ? this.http.get(this.IP + "/department_detailsRA")
      : this.http.post(this.IP + "/department_detailsRA", {
          from_date: from,
          to_date: to,
        });
  }

  GetViolationList() {
    return this.http.get(this.IP + "/violation_type_details");
  }

  VerifyViolation(id: string, flag: any) {
    return this.http.get(
      this.IP + "/violation_verification/" + id + "/" + flag
    );
  }

  notification(message: string, action?: string) {
    this.snackbar.open(message, action ? action : "", {
      duration: 4000,
      panelClass: ["error"],
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }

  DeleteViolationData(id: any) {
    return this.http.get(this.IP + "/Deleteviolation/" + id);
  }
}
