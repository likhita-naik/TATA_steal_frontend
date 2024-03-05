import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import 'fabric'
import { CommonModules } from "src/app/common/common.module";
import { TabViewModule } from 'primeng/tabview';
import { LtPanelComponent } from "./lt-panel.component";
const routes:Routes=[
{path:'',component:LtPanelComponent},
]
@NgModule({
    declarations:[LtPanelComponent],
    imports:[CommonModules,RouterModule.forChild(routes),TabViewModule],
    exports:[RouterModule]

})

export class LTModule{

}