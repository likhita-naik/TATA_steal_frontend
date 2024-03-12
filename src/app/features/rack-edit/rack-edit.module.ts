import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModules } from "src/app/common/common.module";
import { AuthGuard } from "src/app/Services/auth.guard";
import { ServerService } from "src/app/Services/server.service";
import { RackEditComponent } from "./rack-edit.component";

const routes:Routes=[{path:'',component:RackEditComponent}]
@NgModule({
    declarations:[RackEditComponent],
    imports:[RouterModule.forChild(routes),CommonModules,NgbModule],
    exports:[RouterModule],
    providers: [ServerService, DatePipe, AuthGuard],


})

export class RackEditModule{

}