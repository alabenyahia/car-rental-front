import { Component } from '@angular/core';
import {CostumerService} from "../../services/costumer.service";
import {NzTableComponent} from "ng-zorro-antd/table";
import {DatePipe, NgStyle} from "@angular/common";

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    NzTableComponent,
    DatePipe,
    NgStyle
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
  constructor(private customerService: CostumerService) {
    this.getMyBookings();
  }

  bookings: any;

  getMyBookings() {
    this.customerService.getBookingsByUserId().subscribe(res => {
      console.log(res);
      this.bookings = res;
    })
  }

}
