import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ServerService } from "../Services/server.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-esihistory",
  templateUrl: "./esihistory.component.html",
  styleUrls: ["./esihistory.component.css"],
})
export class ESIHistoryComponent implements OnInit, AfterViewInit {
  isShowDetails: boolean = false;
  jobsheetList: any[] = [];
  shutdownName: FormControl = new FormControl("jobsheet", Validators.required);
  currentShutdown: string = "ESI Monitor";
  jobsheetID: string;
  isHistory: Boolean = false;
  queryParams: any;
  selectedJobData: any;
  dataFetchStatus: string = "";
  failResponseMessage:string=''
  constructor(
    public WebServer: ServerService,
    public Router: Router,
    public modalService: NgbModal,
    public currentRoute: ActivatedRoute
  ) {
    this.currentRoute.queryParams.subscribe((data: any) => {
      this.isHistory = data.isHistory;
      this.queryParams = data;
    });
  }
  ngOnInit(): void {
    this.dataFetchStatus='init'
    this.GetJobsheetList();
  }
  ngAfterViewInit(): void {}


  GetJobsheetList() {
    this.WebServer.GetPreviousJobsheetIds().subscribe(
      (response: any) => {
        if (response.success) {
          this.jobsheetList = response.message;
          this.dataFetchStatus = "success";
        } else {
          this.failResponseMessage=response.message
          this.dataFetchStatus = "fail";
        }
      },
      (Err) => {
        this.dataFetchStatus = "error";
      }
    );
  }

  OnSelectJobsheet(jobsheet: any) {
    this.isShowDetails = true;
    this.Router.navigate(["app/ESIHistory/jobsheetDetails"], {
      queryParams: {
        isHistory: true,
        jobsheetId:
          typeof jobsheet._id == "string" ? jobsheet._id : jobsheet._id.$oid,
        jobsheetName: jobsheet.job_sheet_name,
        shutdownName: jobsheet.shutdownname,
        time: jobsheet.timestamp,
      },
    });
  }
  DeleteShutdownData(){
  this.WebServer.DeleteJobHistoryData(this.selectedJobData._id.$oid).subscribe((response:any)=>{
    this.WebServer.notification(response.message)
    if(response.success){
      this.GetJobsheetList()
      this.modalService.dismissAll()
    }else{

    }
  })
  }

  ToUnplannedJobs(jobsheet: any) {
    this.isShowDetails = true;
    this.Router.navigate(["app/ESIHistory/ESI_Unplanned_jobs"], {
      queryParams: {
        isHistory: true,
        shutdownId:
          typeof jobsheet._id == "string" ? jobsheet._id : jobsheet._id.$oid,
        shutdownName: jobsheet.shutdownname,
        time: jobsheet.timestamp,
      },
    });
  }
  BackToList() {
    this.isShowDetails = false;
    this.Router.navigate(["app/ESIHistory"]);
  }

  OpenTitleEditModal(modal: any, data?: any) {
    this.selectedJobData = data;
    this.shutdownName.setValue(data?.shutdownname);
    this.modalService.open(modal, { size: "md", centered: true });
  }
  OpenDeleteModal(modal:any,data?:any)
{
  this.selectedJobData=data
  this.modalService.open(modal,{backdrop:'static',centered:true})
}
  OnNewTitle() {
    var data = {
      id:
        typeof this.selectedJobData._id == "string"
          ? this.selectedJobData._id
          : this.selectedJobData._id.$oid,
      shutdownname: this.shutdownName.value,
    };
    this.WebServer.UpdateShutdownName(data).subscribe(
      (response: any) => {
        if (response.success) {
          this.currentShutdown = this.shutdownName.value;
          this.WebServer.notification(response.message);
          this.GetJobsheetList();
          this.modalService.dismissAll();
        }
      },
      (Err) => {
        this.WebServer.notification("Error during the process", "Retry");
      }
    );
  }
}
