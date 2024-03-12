import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import 'fabric'
import { CommonModules } from "src/app/common/common.module";
import { HtPanelComponent } from "./ht-panel.component";
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from "primeng/carousel";
const routes:Routes=[
{path:'',component:HtPanelComponent},
]
@NgModule({
    declarations:[HtPanelComponent],
    imports:[CommonModules,RouterModule.forChild(routes),TabViewModule,CarouselModule],
    exports:[RouterModule]

})

export class HTModule{

}