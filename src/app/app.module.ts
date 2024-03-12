import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./NavigationBar/header/header.component";
import { SidebarComponent } from "./NavigationBar/sidebar/sidebar.component";

import { FooterComponent } from "./NavigationBar/footer/footer.component";
import { NgbCarouselModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ServerService } from "./Services/server.service";
import { ToastrModule } from "ngx-toastr";
import { DatePipe } from "@angular/common";

import { AuthGuard } from "./Services/auth.guard";
import { alertComponent } from "./common/alert.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import "fabric";
import * as CanvasJSAngularChart from "../assets/canvasjs/canvasjs.angular.component";
import { NgScrollbarModule } from "ngx-scrollbar";

import { TcRoiComponent } from "./settings/tc-roi/tc-roi.component";
import { IconComponent } from "./common/icon/icon.component";
import { MechJobCamerasComponent } from "./settings/mech-job-cameras/mech-job-cameras.component";
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    alertComponent,
    TcRoiComponent,
    IconComponent,
    MechJobCamerasComponent,
  ],
  imports: [
    NgScrollbarModule,
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      toastComponent: alertComponent,
      progressBar: true,
      newestOnTop:true,
    }),
    NgxDaterangepickerMd.forRoot({}),
    NgbCarouselModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  entryComponents: [alertComponent],
  providers: [ServerService, DatePipe, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(lib: FaIconLibrary, private http: HttpClient) {
    lib.addIconPacks(fas);
    // this.http.get("assets/config.json").subscribe((data: any) => {
    //   Object.assign(environment, data);
    // });
  }
}
