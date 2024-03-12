import { NgModule } from "@angular/core";
import { RouterModule, Routes, RoutesRecognized } from "@angular/router";
import { CommonModules } from "src/app/common/common.module";
import 'fabric'
import { CameraRoiComponent } from "./camera-roi.component";
const routes:Routes=[{path:'',component:CameraRoiComponent}]
import { TreeSelectModule } from 'primeng/treeselect';
import { MenubarModule } from 'primeng/menubar';
import { NgScrollbarModule } from "ngx-scrollbar";
import { TabViewModule } from "primeng/tabview";
//itemClick(event: MouseEvent, item: MenuItem)
@NgModule({
    declarations:[CameraRoiComponent],
    imports:[CommonModules,RouterModule.forChild(routes),TreeSelectModule,MenubarModule,NgScrollbarModule,TreeSelectModule,MenubarModule,TabViewModule],
    exports:[RouterModule],
    
})

export class CameraRoiModule{

}