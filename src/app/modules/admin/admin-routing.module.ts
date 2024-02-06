import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {CarPostComponent} from "./components/car-post/car-post.component";
import {UpdateCarComponent} from "./components/update-car/update-car.component";
import {GetBookingsComponent} from "./components/get-bookings/get-bookings.component";

const routes: Routes = [
  {path: "dashboard", component: AdminDashboardComponent},
  {path: "car", component: CarPostComponent},
  {path: "car/:id", component: UpdateCarComponent},
  {path: "bookings", component: GetBookingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
