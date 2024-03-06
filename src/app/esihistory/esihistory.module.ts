import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ESIHistoryRoutingModule } from './esihistory-routing.module';
import { ESIHistoryComponent } from './esihistory.component';
import { CommonModules } from '../common/common.module';
import { Route } from '@angular/router';
import { TreeSelectModule } from 'primeng/treeselect';



@NgModule({
  declarations: [
    ESIHistoryComponent
  ],
  imports: [
    CommonModules,


    ESIHistoryRoutingModule
  ]
})
export class ESIHistoryModule { }
