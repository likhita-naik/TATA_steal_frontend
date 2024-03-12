import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MechanicalJobsComponent } from './mechanical-jobs.component';

const routes: Routes = [{ path: '', component: MechanicalJobsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanicalJobsRoutingModule { }
