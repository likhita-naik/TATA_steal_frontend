



import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import 'fabric'
import { CommonModules } from "src/app/common/common.module";
import { UceilComponent } from "./uceil.component";
const routes:Routes=[
{path:'',component:UceilComponent},
]
@NgModule({
    declarations:[UceilComponent],
    imports:[CommonModules,RouterModule.forChild(routes)],
    exports:[RouterModule]

})

export class UceilModule{

}