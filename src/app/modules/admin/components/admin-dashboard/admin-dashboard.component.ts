import {Component} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DatePipe,
    NzButtonComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  cars: any = [];

  constructor(private adminService: AdminService,
              private message: NzMessageService) {}

  ngOnInit() {
    this.getAllCars();
    console.log("ng init")
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe(res => {
      console.log(res)
      this.cars = [];
      res.forEach((element: any) => {
        element.processedImage = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    })
  }

  deleteCar(id: number) {
    this.adminService.deleteCar(id).subscribe(res => {
      this.getAllCars()
      this.message.success("Car deleted successfully!", {nzDuration: 3500});
    })
  }
}
