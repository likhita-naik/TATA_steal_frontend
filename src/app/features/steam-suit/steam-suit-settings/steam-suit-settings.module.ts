import { NgModule } from "@angular/core";
import { SteamSuitSettingsComponent } from "./steam-suit-settings.component";
import { CommonModules } from "src/app/common/common.module";
import { RouterModule, Routes } from "@angular/router";
import { StepsModule } from 'primeng/steps';
import { FieldsetModule } from 'primeng/fieldset';
import { SteamSuitRoiComponent } from "src/app/settings/steam-suit-roi/steam-suit-roi.component";
import { TreeSelectModule } from "primeng/treeselect";
import { ToastModule } from "primeng/toast";
const routes:Routes=[{path:'',component:SteamSuitSettingsComponent}]
@NgModule({
    declarations:[SteamSuitSettingsComponent,SteamSuitRoiComponent],
    imports:[CommonModules,RouterModule.forChild(routes),StepsModule,FieldsetModule,TreeSelectModule,ToastModule],
    exports:[RouterModule],

})

export class SteamSuitSettingsModule{

}