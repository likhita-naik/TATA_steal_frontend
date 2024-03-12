import { Injectable } from "@angular/core";
import { configService } from "../Services/config.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MechanicalService {
  constructor(public configService: configService, private http: HttpClient) {}
  GetJobNumbers(data?: { type: string | null }) {
    return data
      ? this.http.post(this.configService.IP + "/GetJOBNUMBER", data)
      : this.http.get(this.configService.IP + "/GetJOBNUMBER");
  }
  GetDepList(data?: { job_no: string | null; type: string | null }) {
    return data
      ? this.http.post(this.configService.IP + "/sheetDepartmentlist", data)
      : this.http.get(this.configService.IP + "/sheetDepartmentlist");
  }

  GetJobCamerasIpList(data?: {
    type: string | null;
    job_no: string | null;
    department: string | null;
  }) {
    return data
      ? this.http.post(this.configService.IP + "/sheet_ipaddress", data)
      : this.http.get(this.configService.IP + "/sheet_ipaddress");
  }
  GetDepartmentsByFilters(data: {
    job_no: string | null;
    type: string | null;
  }) {
    return this.http.post(this.configService.IP + "/sheetDepartmentlist", data);
  }
  GetIpsByFilters(data: {
    job_no: string | null;
    type: string | null;
    department: string | null;
  }) {
    return this.http.post(this.configService.IP + "/sheet_ipaddress", data);
  }

  GetJobPanelList(department: any, ip: any, jobNo: null) {
    return this.http.post(this.configService.IP + "/GROUPBYPANEL", {
      department: department,
      ip_address: ip,
      job_no: jobNo,
    });
  }
  JobsheetSortbyIp(ip: any) {
    return this.http.get(this.configService.IP + "/SORTINGIPWISE/" + ip);
  }

  EditFieldjobsheet(data: any, field: any) {
    return field == "tagname"
      ? this.http.post(this.configService.IP + "/UpdateTagName", data)
      : field == "job_description"
      ? this.http.post(this.configService.IP + "/UpdateJobDescription", data)
      : field == "board"
      ? this.http.post(this.configService.IP + "/UpdateSwitchBoardName", data)
      : field == "department"
      ? this.http.post(this.configService.IP + "/UpdateDepartmentname", data)
      : field == "sub_area"
      ? this.http.post(this.configService.IP + "/UpdateAreaName", data)
      : this.http.get(this.configService.IP + "/UpdateAreaName");
  }
  DeleteMechJobs(id: any) {
    return this.http.get(
      this.configService.IP + "/delete_mechanical_job/" + id
    );
  }
}
