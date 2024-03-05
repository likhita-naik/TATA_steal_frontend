import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class configService {
  public config: any;
  public IP: any;
  public IP_ESI: any;
  dashboardInterval: number=3000;
  jobsheetInterval: number=3000;
  jobsheetDataInterval2: number=3000;
  jobsheetDataInterval: number=3000;
  steamDataDelay
  startEsiApi
  logInterval
  unplannedInterval
  constructor() {
    this.config = this.loadConfigFile("assets/config.json");
    this.IP = this.config.IP;
    this.IP_ESI=this.config.IP_ESI

    this.dashboardInterval=this.config.dashboardInterval
    this.jobsheetDataInterval=this.config.jobSheetDataInterval
    this.jobsheetInterval=this.config.jobSheetStatusInterval
    this.jobsheetDataInterval2=this.config.jobSheetDataInterval2
    this.startEsiApi=this.config.StartESIAppApi
    this.steamDataDelay=this.config.steamSuitInterval
    this.logInterval=this.config.logInterval
    this.unplannedInterval=this.config.unallocatedInterval

  }
  loadConfigFile(filepath: any) {
    const json = this.readConfigFile(filepath, "application/json");
    return JSON.parse(json);
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
}
