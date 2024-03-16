import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management.component';

import { MessageService } from 'primeng/api';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/Services/server.service';
import { AuthGuard } from 'src/app/Services/auth.guard';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModules } from "../../common/common.module";

const routes:Routes=[{path:'',component:UserManagementComponent}]


@NgModule({
    declarations: [UserManagementComponent],
    exports: [RouterModule],
    providers: [ServerService,
        DatePipe,
        AuthGuard,
        MessageService,
        NgbCarouselConfig],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        CommonModules
    ]
})
export class UserManagementModule { }
