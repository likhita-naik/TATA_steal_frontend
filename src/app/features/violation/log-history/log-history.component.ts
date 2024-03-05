import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Query,
  ViewChild,
} from "@angular/core";
import { ServerService } from "src/app/Services/server.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of, Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";




export interface violation {
  si_no?: string;
}

var data: any[] = [];
@Component({
  selector: "app-log-history",
  templateUrl: "./log-history.component.html",
  styleUrls: ["./log-history.component.css"],
})
export class LogHistoryComponent implements OnDestroy, OnInit, AfterViewInit {
  aiSolutionsList: any = {
    CRDCNT: "Crowd Count",
    RA: "Danger Zone",
    PPE: "PPE",
  };
  data: any[] = [];
  delay:number=3000
  isalert: boolean = false;

  tempdata: any[] = [];

  audioOff: boolean = false;
  alertmessage: string = "";
  total: Observable<number> = of(0);
  violData: Observable<any[]> = of([]);
  loading: boolean = false;
  prevLiveCount: number = 0;
  images: any[] = [];
  violLength: number = 0;
  updatedLen: number = 0;
  violdata: any[] = [];
  currentViol: any = null;
  activeIndex:any=0
  API: any;
  interval: any;

  alert: boolean = true;
  Subsciption!: Subscription;

  Images: any[] = [];
  @ViewChild("dangerAlert") Violation: ElementRef<any>;
 

  isActive: boolean = false;
  isActive2: boolean = false;
  violationsList: any[] = [];



  constructor(
    private webServer: ServerService,
    private toasterService: ToastrService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public Router: Router
  ) {
    this.Router.navigate(["app/violations/DangerZone"]);

    localStorage.getItem("audioOff") == "true"
      ? (this.audioOff = true)
      : (this.audioOff = false);
    localStorage.getItem("alert") == "true"
      ? (this.alert = true)
      : (this.alert = false);
    console.log(
      localStorage.getItem("audioOff"),
      localStorage.getItem("alert")
    );
    this.delay = this.webServer.logInterval;



    this.API = webServer.IP;

    this.webServer.CheckApplicationStatus().subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        //this.isActive=true
        localStorage.setItem("appStatus", response.message[0].process_status);
        var process = response.message.find((el: any) => {
          return el.process_name == "docketrun-app" ? el : "";
        });
        this.isActive =process?  process.process_status:'';
      }
    });

    this.GetMockdrillStatus();
    //..................for search..................

 

    //..............................................
  }

  ngOnInit(): void {
    //...........Reading previous violation data's length from local storage....
    this.violLength = Number(localStorage.getItem("updatedLen"));
  }

  ngAfterViewInit() {

      this.webServer.LiveViolationData().subscribe(
        (Rdata: any) => {
          if (Rdata.success) {

            // var data = Rdata.message;
            this.prevLiveCount = Rdata.now_live_count;

            
          } else {
          }
        },
        (err) => {

        }
      );
    
    this.dataread();
  }


  public dataread() {
    this.webServer.liveViolInterval = setInterval(() => {
        
        this.Subsciption = this.webServer
          .LiveViolationData()
          .subscribe((Rdata: any) => {
            const tempResponse={...Rdata}
            if (tempResponse.success) {
              var cviol = [...tempResponse.message];

              if (tempResponse.now_live_count - this.prevLiveCount > 0) {
                if (this.alert) {
                  for (
                    let i =( tempResponse.now_live_count - this.prevLiveCount);
                    i >=0;
                    i--
                  ) {
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
        
      
    }, this.delay);
  }

  showViol() {
    if (false) {
      this.toasterService.error(
        <any>this.Violation.nativeElement.innerHTML,
        " ",
        {
          enableHtml: true,
          positionClass: "toast-top-right",
        }
      );
    }
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

  OnTabChange(event: any) {
    switch (event.index) {
      case 0: {
        this.activeIndex = 0;
        this.router.navigate(["app", "violations", "DangerZone"]);
        break;
      }

      case 1: {
        this.activeIndex = 1;

        this.router.navigate(["app", "violations", "ppe"]);

        break;
      }

      case 2: {
        this.activeIndex = 2;
        this.router.navigate(["app", "violations", "CrowdCount"]);
        break;
      }
      // case 3: {
      //   this.activeIndex = 3;
      //   this.router.navigate(["app", "violations", "FireDetection"]);
      //   break;
      // }
      // case 4: {
      //   this.activeIndex = 4;
      //   this.router.navigate(["app", "violations", "SpillageDetection"]);
      //   break;
      // }
      case 3: {
        this.activeIndex = 3;
        this.router.navigate(["app", "violations", "Steam-SuitDetection"]);
      }
    }
  }

  GetMockdrillStatus() {
    this.webServer.GetMockDrillStatus().subscribe((response: any) => {
      this.isActive2 = response.success;
    });
  }

  ngOnDestroy() {
    clearInterval(this.webServer.liveViolInterval);
    this.isalert = false;
    this.toasterService.clear();
  }
}
