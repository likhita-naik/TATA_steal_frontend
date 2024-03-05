import { DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import {
  NgbCarouselConfig,
  NgbCarouselModule,
  NgbModule,
} from "@ng-bootstrap/ng-bootstrap";
import { CommonModules } from "src/app/common/common.module";
import { AuthGuard } from "src/app/Services/auth.guard";
import { ServerService } from "src/app/Services/server.service";
import { ESIMoniterComponent } from "./esi-moniter.component";
import { BadgeModule } from "primeng/badge";
import { TreeSelectModule } from "primeng/treeselect";
import { TooltipModule } from "primeng/tooltip";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { DropdownModule } from "primeng/dropdown";
import { SelectButtonModule } from "primeng/selectbutton";
import { NgScrollbar } from "ngx-scrollbar";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
const routes: Routes = [
  { path: "", component: ESIMoniterComponent, pathMatch: "full" },
  
];

@NgModule({
  declarations: [ESIMoniterComponent],
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    NgbModule,
    BadgeModule,
    NgxDaterangepickerMd,
    NgbCarouselModule,
    TreeSelectModule,
    TooltipModule,
    DropdownModule,
    SelectButtonModule,
    OverlayPanelModule,
    ButtonModule,
    RippleModule,
  ],
  exports: [RouterModule],
  providers: [
    ServerService,
    DatePipe,
    AuthGuard,
    NgbCarouselConfig,
  ],
})
export class ESIMonitorModule {}
