import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import 'fabric'
import { CommonModules } from "src/app/common/common.module";
import { PneumaticComponent } from "./pneumatic.component";
const routes:Routes=[
{path:'',component:PneumaticComponent},
]
@NgModule({
    declarations:[PneumaticComponent],
    imports:[CommonModules,RouterModule.forChild(routes)],
    exports:[RouterModule]

})

export class PneumaticModule{

}