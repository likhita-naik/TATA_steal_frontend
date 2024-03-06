import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateAccountComponent } from "./create-account.component";
import { TabViewModule } from "primeng/tabview";
import { CommonModules } from "../common/common.module";
const routes: Routes = [{ path: "", component: CreateAccountComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    TabViewModule,
  ],
})
export class CreateAccountModule {}
