import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModules } from "src/app/common/common.module";
import { JobSheetUploadComponent } from "./job-sheet-upload.component";
const routes:Routes=[{path:'',component:JobSheetUploadComponent}]
@NgModule({
    declarations:[JobSheetUploadComponent],
    imports:[CommonModules,RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class JobsheetUploadModule{
    
}