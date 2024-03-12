import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModules } from "src/app/common/common.module";
import { SteamSuitDetectionComponent } from "./steam-suit-detection.component";

import { TabViewModule } from "primeng/tabview";
import { TreeSelectModule } from "primeng/treeselect";
const routes: Routes = [
  {
    path: "",
    component: SteamSuitDetectionComponent,
    children: [
      {
        path: "Details",
        loadChildren: () =>
          import("../steam-suit-details/steam-suit-details.module").then(
            (m) => m.SteamSuitDetailsModule
          ),
      },
      {
        path: "Settings",
        loadChildren: () =>
          import(
            "../steam-suit-settings/steam-suit-settings.module"
          ).then((m) => m.SteamSuitSettingsModule),
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModules,
    RouterModule.forChild(routes),
    TabViewModule,
    TreeSelectModule,
  ],
  exports: [RouterModule],
  declarations: [SteamSuitDetectionComponent],
})
export class SteamSuitDetecionModule {}
