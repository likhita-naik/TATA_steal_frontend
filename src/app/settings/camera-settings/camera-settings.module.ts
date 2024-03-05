import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModules } from "src/app/common/common.module";
import { CameraSettingsComponent } from "./camera-settings.component";
import { TabViewModule } from "primeng/tabview";
import { TreeSelectModule } from "primeng/treeselect";

const routes: Routes = [
  {
    path: "",
    component: CameraSettingsComponent,
    children: [
      {
        path: "steam-suit-cameras",
        loadChildren: () =>
          import("../../features/steam-suit/steam-suit-settings/steam-suit-settings.module").then(
            (m) => m.SteamSuitSettingsModule
          ),
      },
    ],
  },
];
@NgModule({
  declarations: [CameraSettingsComponent],
  imports: [CommonModules, RouterModule.forChild(routes), TabViewModule,TreeSelectModule],
  exports: [RouterModule],
})
export class CameraSettingsModule {}
