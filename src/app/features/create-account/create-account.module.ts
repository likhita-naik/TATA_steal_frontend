import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account.component';
import { TabViewModule } from 'primeng/tabview';
const routes:Routes=[{path:'',component:CreateAccountComponent}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabViewModule
  ]
})
export class CreateAccountModule { }
