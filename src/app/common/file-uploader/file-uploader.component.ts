import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit,AfterViewInit {
  excelFile:File
  @Input() fileUploadStatus:boolean=false
  // @Input() apiEndPoint?:string=''
  @Output() OnFileUploaded=new EventEmitter()
  ngOnInit(): void {
    this.ekUpload()
  }
  ngAfterViewInit(): void {
   
  }
  onFileChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.excelFile = event.target.files[0]
      console.log(this.excelFile)
    }
  }

  ekUpload() {
    var Init = () => {


      var fileSelect = document.getElementById('file-upload'),
        fileDrag = document.getElementById('file-drag'),
        submitButton = document.getElementById('submit-button');

      fileSelect.addEventListener('change', fileSelectHandler, false);

      // Is XHR2 available?
      var xhr = new XMLHttpRequest();
      if (xhr.upload) {
        // File Drop
        fileDrag.addEventListener('dragover', fileDragHover, false);
        fileDrag.addEventListener('dragleave', fileDragHover, false);
        fileDrag.addEventListener('drop', fileSelectHandler, false);
      }
    }

    var fileDragHover = (e: any) => {
      var fileDrag = document.getElementById('file-drag');

      e.stopPropagation();
      e.preventDefault();

      fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
    }

    var fileSelectHandler = (e: any) => {
      // Fetch FileList object
      var files = e.target.files || e.dataTransfer.files;

      // Cancel event and hover styling
      fileDragHover(e);

      // Process all File objects
      for (var i = 0, f; f = files[i]; i++) {
        parseFile(f);
        uploadFile(f);
      }
    }

    // Output
    var output = (msg: any) => {
      // Response
      var m = document.getElementById('messages');
      m.innerHTML = msg;
    }

    var parseFile = (file: any) => {
      var fileName = file.name.replace(/ /g, '_')
      output(
        '<strong>' + encodeURI(fileName) + '</strong>'
      );
      var imageName = file.name;
      var loaderOverlayer = document.getElementById('file-upload-form')
      
      // loaderOverlayer.classList.remove('loading')

      this.excelFile=file
    
      document.getElementById('start').classList.add("hidden");
      document.getElementById('response').classList.remove("hidden");
      // document.getElementById('submit').classList.remove("hidden");
      console.log(file,'in parse file');

      this.OnFileUploaded.emit(this.excelFile)

      loaderOverlayer.classList.remove('loading')
 
    
    }

    var setProgressMaxValue = (e: any) => {
      var pBar: any = document.getElementById('file-progress');

      if (e.lengthComputable) {
        pBar.max = e.total;
      }
    }

    var updateFileProgress = (e: any) => {
      console.log(e)
      var pBar: any = document.getElementById('file-progress');

      if (e.lengthComputable) {
        pBar.value = e.loaded;
      }

      if (e.loaded) {
        var loaderOverlayer = document.getElementById('file-upload-form')
        loaderOverlayer.classList.remove('loading')

      }
    }

    var uploadFile = (file: any) => {
      console.log(file)
      this.excelFile=file
      var xhr = new XMLHttpRequest(),
        fileInput = document.getElementById('class-roster-file'),
        pBar = document.getElementById('file-progress'),
        fileSizeLimit = 1024; // In MB
      if (xhr.upload) {
        // Check if file is less than x MB
        if (file.size <= fileSizeLimit * 1024 * 1024) {
          // Progress bar
          pBar.style.display = 'inline';
          xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
          xhr.upload.addEventListener('progress', updateFileProgress, false);

          // File received / failed
          xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4) {
              // Everything is good!

              // progress.className = (xhr.status == 200 ? "success" : "failure");
              // document.location.reload(true);
            }
          };

          // Start upload
          var fileUpload: any = document.getElementById('file-upload-form')
          xhr.open('POST', fileUpload.action, true);
          xhr.setRequestHeader('X-File-Name', file.name);
          xhr.setRequestHeader('X-File-Size', file.size);
          xhr.setRequestHeader('Content-Type', 'multipart/form-data');
       // this.OnFileUploaded.emit(this.excelFile)
          xhr.send(file);
        } else {
          output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
        }
      }
    }

    // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  }

  OnFileSubmit(){
    this.OnFileUploaded.emit(this.excelFile)
  }
}
