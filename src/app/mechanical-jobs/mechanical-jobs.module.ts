import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MechanicalJobsRoutingModule } from './mechanical-jobs-routing.module';
import { MechanicalJobsComponent } from './mechanical-jobs.component';
import { CommonModules } from '../common/common.module';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BadgeModule } from 'primeng/badge';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TreeSelectModule } from 'primeng/treeselect';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@NgModule({
  declarations: [
    MechanicalJobsComponent
  ],
  imports: [
    CommonModule,
    CommonModules,
    MechanicalJobsRoutingModule,
    NgbModule,
    BadgeModule,
    NgxDaterangepickerMd,
    NgbCarouselModule,
    TreeSelectModule,
    TooltipModule,
    DropdownModule,
    SelectButtonModule,
    OverlayPanelModule,
  ]
})
export class MechanicalJobsModule { }
