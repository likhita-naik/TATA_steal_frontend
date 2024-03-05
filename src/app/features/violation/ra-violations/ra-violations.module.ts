import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaViolationsComponent } from './ra-violations.component';
import { CommonModules } from 'src/app/common/common.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TreeSelectModule } from 'primeng/treeselect';

import { CarouselModule } from 'primeng/carousel';
import { NgScrollbarModule } from 'ngx-scrollbar';

const routes: Routes = [
  { path: '', component: RaViolationsComponent ,}
];

@NgModule({
  declarations: [
    RaViolationsComponent
  ],
  imports: [
    CommonModules,
    NgScrollbarModule,
    CarouselModule,
    NgxDaterangepickerMd,
    TreeSelectModule,
      RouterModule.forChild(routes)
  ]
})
export class RaViolationsModule { }
