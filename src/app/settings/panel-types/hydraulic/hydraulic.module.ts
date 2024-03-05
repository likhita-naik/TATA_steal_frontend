import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import 'fabric'
import { CommonModules } from "src/app/common/common.module";
import { HydraulicComponent } from "./hydraulic.component";
const routes:Routes=[
{path:'',component:HydraulicComponent},
]
@NgModule({
    declarations:[HydraulicComponent],
    imports:[CommonModules,RouterModule.forChild(routes)],
    exports:[RouterModule]

})

export class HydraulicModule{

}