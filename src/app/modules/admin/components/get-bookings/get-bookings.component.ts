import { Component } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {DatePipe, NgStyle} from "@angular/common";
import {NzTableComponent} from "ng-zorro-antd/table";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-get-bookings',
  standalone: true,
  imports: [
    DatePipe,
    NzTableComponent,
    NgStyle,
    NzButtonComponent
  ],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.css'
})
export class GetBookingsComponent {
  constructor(private adminService: AdminService,
              private message: NzMessageService) {
    this.getBookings();
  }

  bookings: any;

  getBookings() {
    this.adminService.getCarBookings().subscribe(res => {
      console.log(res)
      this.bookings = [];
      this.bookings = res
    })
  }

  changeBookingStatus(bookingId: number, status: string) {
    this.adminService.changeBookingStatus(bookingId, status).subscribe(res => {
      this.getBookings();
      this.message.success("Booking status changed successfully!", {nzDuration: 3500});
    }, (error: any) => {
      this.message.error("Something went wrong!", {nzDuration: 3500});
    })
  }

}
