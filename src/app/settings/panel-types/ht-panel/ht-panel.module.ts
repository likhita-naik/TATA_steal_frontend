import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import 'fabric'
import { CommonModules } from "src/app/common/common.module";
import { HtPanelComponent } from "./ht-panel.component";
import { TabViewModule } from 'primeng/tabview';
const routes:Routes=[
{path:'',component:HtPanelComponent},
]
@NgModule({
    declarations:[HtPanelComponent],
    imports:[CommonModules,RouterModule.forChild(routes),TabViewModule],
    exports:[RouterModule]

})

export class HTModule{

}