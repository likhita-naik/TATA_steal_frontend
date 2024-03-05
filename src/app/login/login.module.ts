import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CommonModules} from '../common/common.module'
import { AuthGuardLogin } from '../Services/authLogin.guard';

const routes:Routes=[{path:'',canActivate:[AuthGuardLogin],component:LoginComponent}]


@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModules
    
    
  ],
  exports:[RouterModule]
})
export class LoginModule { }
