import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModules } from "src/app/common/common.module";
import { ReportAlertComponent } from "./report-alert.component";
import { ChipsModule } from 'primeng/chips';
import { FieldsetModule } from 'primeng/fieldset';
import { ReportService } from "./report-alert.server";
import { SliderModule } from 'primeng/slider';
import { TreeSelectModule } from "primeng/treeselect";

const routes:Routes=[{path:'',component:ReportAlertComponent}]
@NgModule({
    declarations:[ReportAlertComponent],
   providers:[ReportService],
 imports:[CommonModules,RouterModule.forChild(routes),ChipsModule,FieldsetModule,SliderModule,TreeSelectModule],

})

export class ReportAlertModule{

}