import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ESIHistoryComponent } from './esihistory.component';

const routes: Routes = [{ path: '', component: ESIHistoryComponent,children:[
  {
    path:'jobsheetDetails',loadChildren:()=>import('../features/esi-moniter/esi-monitor.module').then(m=>m.ESIMonitorModule)
  },{
    path:'ESI_Unplanned_jobs',loadChildren:()=>import('../features/esi-unallocated/esi-unallocated.module').then(m=>m.esiUnallocatedModule)
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ESIHistoryRoutingModule { }
