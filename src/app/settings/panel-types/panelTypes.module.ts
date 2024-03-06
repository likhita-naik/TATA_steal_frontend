import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import 'fabric'
import { CommonModules } from "src/app/common/common.module";
import { PneumaticModule } from "./pneumatic/pneumatic.module";
const routes:Routes=[{path:'',children:[{
    path:'HTPanel',loadChildren:()=>import('./ht-panel/ht-panel.module').then(m=>m.HTModule)
},{
    path:'hydraulic',loadChildren:()=>import('./hydraulic/hydraulic.module').then(m=>m.HydraulicModule)
},
{
    path:'pneumatic',loadChildren:()=>import('./pneumatic/pneumatic.module').then(m=>PneumaticModule)
},
{
    path:'uceil',loadChildren:()=>import('./uceil/uceil.module').then(m=>m.UceilModule)
},
{
    path:'lt',loadChildren:()=>import('./lt-panel/lt-panel.module').then(m=>m.LTModule)
},
{
    path:'conveyor',loadChildren:()=>import('./conveyor/conveyor.module').then(m=>m.ConveyorModule)
}



]
}]
@NgModule({
    declarations:[
  ],
    imports:[CommonModules,RouterModule.forChild(routes)],
    exports:[RouterModule]

})

export class PanelTypesModule{

}