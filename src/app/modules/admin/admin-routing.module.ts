import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {CarPostComponent} from "./components/car-post/car-post.component";

const routes: Routes = [
  {path: "dashboard", component: AdminDashboardComponent},
  {path: "car", component: CarPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
