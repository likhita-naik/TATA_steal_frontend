import { NgModule } from "@angular/core";
import { CommonModules } from "src/app/common/common.module";
import { RouterModule, Routes } from "@angular/router";
import { SteamSuitDetailsComponent } from "./steam-suit-details.component";
import { SteamSuitAllDetailsComponent } from "../steam-suit-all-details/steam-suit-all-details.component";

const routes:Routes=[{path:'',component:SteamSuitDetailsComponent,children:[{
    path:'AllDetails',component:SteamSuitAllDetailsComponent
}]}]
@NgModule({
    declarations:[SteamSuitAllDetailsComponent,SteamSuitDetailsComponent],
    imports:[CommonModules,RouterModule.forChild(routes)],
    exports:[RouterModule],

})

export class SteamSuitDetailsModule{
    
}