import { Component } from '@angular/core';
import {CostumerService} from "../../services/costumer.service";
import {DatePipe} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    DatePipe,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
  cars: any = [];

  constructor(private customerService: CostumerService) {}

  ngOnInit() {
    this.getAllCars();
    console.log("ng init")
  }

  getAllCars() {
    this.customerService.getAllCars().subscribe(res => {
      console.log(res)
      this.cars = [];
      res.forEach((element: any) => {
        element.processedImage = 'data:image/jpeg;base64,' + element.returnedImage
        this.cars.push(element);
      });
    })
  }

}
