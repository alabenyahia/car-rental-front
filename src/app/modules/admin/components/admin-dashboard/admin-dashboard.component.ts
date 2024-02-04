import { Component } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {DatePipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  cars: any = [];
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getAllCars();
    console.log("ng init")
  }
  getAllCars() {
    this.adminService.getAllCars().subscribe(res => {
      console.log(res)

      res.forEach((element: any) => {
        element.processedImage = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    })
  }
}
