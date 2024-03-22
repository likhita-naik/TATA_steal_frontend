import { HttpResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ServerService } from "src/app/Services/server.service";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { interval } from "rxjs";
import { toJSDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar";

@Component({
  selector: "app-job-sheet-upload",
  templateUrl: "./job-sheet-upload.component.html",
  styleUrls: ["./job-sheet-upload.component.css"],
})
export class JobSheetUploadComponent implements OnInit, OnDestroy {
  excelFile!: File;
  showError = "";
  showSuccess = "";
  loading: boolean = false;
  arrayBuffer: any;
  isLoading: boolean = false;
  Interval: any;
  IntervalTime: number;
  @ViewChild("errorMessage") errorModal: any;
  faiMessage: string = "";
  constructor(
    private modalService: NgbModal,
    private Server: ServerService,
    private Router: Router
  ) {
    this.IntervalTime = this.Server.jobsheetInterval;
    this.Server.GetJobSheet().subscribe((response: any) => {
      if (response.success)
        if (response.message.length > 0) {
          this.Router.navigate(["app/jobsheetMoniter"]);
        }
    });
  }

  ngOnInit(): void {
    this.Interval = setInterval(() => {
      this.Server.GetJobSheet().subscribe((response: any) => {
        if (response.job_sheet_status) {
          if (response.success) {
            if (response.message.length > 0) {
              this.Router.navigate(["app/jobsheetMoniter"]);
            }
          }
        }
      });
    }, this.IntervalTime);
    this.ekUpload();
  }

  openModal(modal: any) {
    this.modalService.open(modal, { scrollable: false });
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.excelFile = event.target.files[0];
      console.log(this.excelFile, "file");
    }
  }

  ekUpload() {
    var Init = () => {
      console.log("Upload Initialised");

      var fileSelect = document.getElementById("file-upload"),
        fileDrag = document.getElementById("file-drag"),
        submitButton = document.getElementById("submit-button");

      fileSelect.addEventListener("change", fileSelectHandler, false);

      // Is XHR2 available?
      var xhr = new XMLHttpRequest();
      if (xhr.upload) {
        // File Drop
        fileDrag.addEventListener("dragover", fileDragHover, false);
        fileDrag.addEventListener("dragleave", fileDragHover, false);
        fileDrag.addEventListener("drop", fileSelectHandler, false);
      }
    };

    var fileDragHover = (e: any) => {
      var fileDrag = document.getElementById("file-drag");

      e.stopPropagation();
      e.preventDefault();

      fileDrag.className =
        e.type === "dragover" ? "hover" : "modal-body file-upload";
    };

    var fileSelectHandler = (e: any) => {
      // Fetch FileList object
      this.excelFile = e.target.files[0];
      var files = e.target.files || e.dataTransfer.files;

      // Cancel event and hover styling
      fileDragHover(e);

      // Process all File objects
      for (var i = 0, f; (f = files[i]); i++) {
        parseFile(f);
        uploadFile(f);
      }
    };

    // Output
    var output = (msg: any) => {
      // Response
      var m = document.getElementById("messages");
      m.innerHTML = msg;
    };

    var parseFile = (file: any) => {
      var fileName = this.excelFile
        ? this.excelFile.name.replace(/ /g, "_")
        : "";
      console.log(file.name);
      output("<strong>" + encodeURI(fileName) + "</strong>");
      var imageName = file.name;
      var loaderOverlayer = document.getElementById("file-upload-form");
      loaderOverlayer.classList.add("loading");
      var isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);
      // if (isGood) {
      document.getElementById("start").classList.add("hidden");
      document.getElementById("response").classList.remove("hidden");
      var formdata: FormData = new FormData();
      formdata.append("file", this.excelFile);
      console.log(formdata);
      this.Server.JobSheetUpload(formdata).subscribe(
        (response: any) => {
          loaderOverlayer.classList.remove("loading");

          console.log(response);
          if (response.success) {
            loaderOverlayer.classList.remove("loading");

            this.Router.navigate(["app/jobsheetMoniter"]);
            // var link=this.Router.serializeUrl(this.Router.createUrlTree(['app/jobsheetMoniter']))
            // window.open(link)
          } else {
            loaderOverlayer.classList.remove("loading");
            this.faiMessage = response.message;
            this.Server.notification(response.message, "Retry");

            document.getElementById("start").classList.remove("hidden");
            document.getElementById("response").classList.add("hidden");
            //this.ekUpload()
          }
        },
        (Error) => {
          loaderOverlayer.classList.remove("loading");
          document.getElementById("start").classList.remove("hidden");
          document.getElementById("response").classList.add("hidden");
          // document.getElementById('notimage').classList.remove("hidden");
          console.log(Error);
          this.Server.notification("Error while uploading");
        }
      );
    };

    var setProgressMaxValue = (e: any) => {
      var pBar: any = document.getElementById("file-progress");

      if (e.lengthComputable) {
        pBar.max = e.total;
      }
    };

    var updateFileProgress = (e: any) => {
      console.log(e);
      var pBar: any = document.getElementById("file-progress");

      if (e.lengthComputable) {
        pBar.value = e.loaded;
      }

      if (e.loaded) {
        var loaderOverlayer = document.getElementById("file-upload-form");
        loaderOverlayer.classList.add("loading");
      }
    };

    var uploadFile = (file: any) => {
      console.log(file);
      var xhr = new XMLHttpRequest(),
        pBar = document.getElementById("file-progress"),
        fileSizeLimit = 1024; // In MB
      if (xhr.upload) {
        // Check if file is less than x MB
        if (file.size <= fileSizeLimit * 1024 * 1024) {
          // Progress bar
          pBar.style.display = "inline";
          xhr.upload.addEventListener("loadstart", setProgressMaxValue, false);
          xhr.upload.addEventListener("progress", updateFileProgress, false);

          // File received / failed
          xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4) {
            }
          };

          // Start upload
          var fileUpload: any = document.getElementById("file-upload-form");
          xhr.open("POST", fileUpload.action, true);
          xhr.setRequestHeader("X-File-Name", file.name);
          xhr.setRequestHeader("X-File-Size", file.size);
          xhr.setRequestHeader("Content-Type", "multipart/form-data");
          xhr.send(file);
        } else {
          output("Please upload a smaller file (< " + fileSizeLimit + " MB).");
        }
      }
    };

    // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      document.getElementById("file-drag").style.display = "none";
    }
  } // To add user into database
  SampleExcelDownload() {
    this.isLoading = true;
    this.Server.SampleExcelDownload().subscribe(
      (response: any) => {
        const blob = new Blob([response.body], { type: ".xlsx" });
        // var fileName =  response.headers.get('Content-Disposition').split(';')[1];
        var fileName =
          "SAMPLE_EXCEL" +
          " " +
          this.Server.dateTransformbyPattern(
            new Date(),
            "yyyy_MM_dd_HH_mm_ss"
          ) +
          ".xlsx";
        const file = new File([blob], fileName, { type: ".xlsx" });
        this.isLoading = false;
        saveAs(blob, fileName);
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
  ngOnDestroy(): void {
    clearInterval(this.Interval);
  }
}
