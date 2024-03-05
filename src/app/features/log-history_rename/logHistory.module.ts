import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { LightboxModule } from "ngx-lightbox";
import { ToastrModule } from "ngx-toastr";
import { alertComponent } from "src/app/common/alert.component";
import { CommonModules } from "src/app/common/common.module";
import { ServerService } from "src/app/Services/server.service";
import { LogHistoryComponent } from "./log-history.component";
import { TreeSelectModule } from "primeng/treeselect";

const routes:Routes=[{path:'',component:LogHistoryComponent}]

@NgModule({
    declarations:[LogHistoryComponent],
    imports:[CommonModules, RouterModule.forChild(routes),LightboxModule,
        NgMultiSelectDropDownModule.forRoot(),ToastrModule.forRoot({
            timeOut: 5000,
            toastComponent: alertComponent,
            progressBar: true,
            newestOnTop: true,
          }),
          TreeSelectModule,
          
          NgxDaterangepickerMd.forRoot({}),
          NgbModule],
          providers:[ServerService],
          entryComponents:[alertComponent],
    exports:[RouterModule]

})

export class LogHistoryModule{
    // constructor(lib: FaIconLibrary) {
    //     lib.addIconPacks(fas);
    //   }
}