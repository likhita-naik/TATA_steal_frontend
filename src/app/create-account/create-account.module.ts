import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account.component';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
const routes:Routes=[{path:'',component:CreateAccountComponent}]

@NgModule({
  declarations: [CreateAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CreateAccountModule { }
