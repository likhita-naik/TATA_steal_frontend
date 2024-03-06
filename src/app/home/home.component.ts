import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ServerService } from "../Services/server.service";
import { configService } from "../Services/config.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, AfterViewInit {
  currentViol: any;
  API: any;
  alert: boolean = true;
  audioOff: boolean = false;
  aiSolutionsList: any = {
    CRDCNT: "Crowd Count",
    RA: "Danger Zone",
    PPE: "PPE",
  };  subscription1: any;
  cViol: any[];
  delay: number = 3000;
  @ViewChild("dangerAlert") violationAlertTemplate: ElementRef<any>;
  prevLiveCount: number = 0;
  constructor(
    public configServer: configService,
    public webServer: ServerService,
    public toasterService: ToastrService
  ) {
    this.API = this.configServer.IP;
    this.delay = configServer.logInterval;

    localStorage.getItem("audioOff") == "true"
      ? (this.audioOff = true)
      : (this.audioOff = false);
    localStorage.getItem("alert") == "true"
      ? (this.alert = true)
      : (this.alert = false);
    this.webServer.GetNotificationSettings().subscribe((value:boolean)=>{
      this.alert=value
      console.log('updatin the notification value in home component')
    })

      
  }
  ngOnInit(): void {
    this.setPrevViolCount()
  }
  ngAfterViewInit(): void {
    this.subscription1 = setInterval(() => {
      this.getViolationNotification();
    }, this.delay);
    
    this.webServer.alertVoiceSettings.subscribe((value:boolean)=>{
      this.audioOff=value
    })
  }
  showViol() {
    if (this.alert) {
      this.toasterService.error(
        <any>this.violationAlertTemplate.nativeElement.innerHTML,
        " ",
        {
          enableHtml: true,
          positionClass: "toast-top-right",
        }
      );
    }
  }
  getViolationNotification() {
    this.webServer.LiveViolationData().subscribe((Rdata: any) => {
      const tempResponse = { ...Rdata };
      if (tempResponse.success) {
        var cviol = [...tempResponse.message];
        console.log(cviol, "cviol");
        if (tempResponse.now_live_count - this.prevLiveCount > 0) {
          if (this.alert) {
            for (
              let i =
                (tempResponse.now_live_count - this.prevLiveCount);
              i >= 0;
              i--
            ) {
              console.log(i, "i");
              var todayi = new Date();
              var tempi = new Date(cviol[i].timestamp);

              if (this.alert) {
                setTimeout(() => {
                  this.currentViol = cviol[i];

                  this.alert ? this.showViol() : "";
                }, 100);
                !this.audioOff ? this.alertSound() : "";
              }
            }
          }
          this.prevLiveCount = Rdata.now_live_count;
        }
      }
    });
  }
  getFiveMeter() {}
  setPrevViolCount() {
    this.webServer.LiveViolationData().subscribe((Rdata: any) => {
      if (Rdata.success) {
        this.prevLiveCount = Rdata.previous_live_count;
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

  //----------METHOD TO TOGGLE THE VOLUME-------
  volumeToggle() {
    if (!this.alert) {
      this.audioOff = true;
      localStorage.setItem("audioOff", "true");
    } else {
      this.audioOff = !this.audioOff;
      localStorage.setItem("audioOff", this.audioOff ? "true" : "false");
    }
  }

  //----------METHOD TO TOGGLE THE NOTIFICATION --------
  alertToggle() {
    this.alert = !this.alert;
    localStorage.setItem("alert", this.alert ? "true" : "false");
    if (!this.alert) {
      this.audioOff = true;
      localStorage.setItem("alert", "false");

      localStorage.setItem("audioOff", "true");
      this.toasterService.clear();
    }
  }
}
