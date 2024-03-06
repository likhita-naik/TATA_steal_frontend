import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { ServerService } from '../Services/server.service';
import { AuthGuard } from '../Services/auth.guard';
import { MessageService } from 'primeng/api';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
const routes:Routes=[{path:'',component:UserManagementComponent}]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
  ],

  exports:[RouterModule],
    
    providers:
     [ServerService, 
        DatePipe, 
        AuthGuard,
        MessageService,
        NgbCarouselConfig],
})
export class UserManagementModule { }
