import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConveyorComponent } from "./conveyor.component";
import { CommonModules } from "src/app/common/common.module";
import { TabViewModule } from "primeng/tabview";

const routes:Routes=[{path:'',component:ConveyorComponent}]
@NgModule({
    declarations:[ConveyorComponent],
    imports:[RouterModule.forChild(routes),CommonModules,TabViewModule],
    exports:[RouterModule]
})

export class ConveyorModule{
    
}