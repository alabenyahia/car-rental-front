import { Component } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})
export class UpdateCarComponent {
  constructor(private adminService: AdminService,
              private activatedRoute: ActivatedRoute) {}

  carId: number = this.activatedRoute.snapshot.params["id"];

  ngOnInit() {
    this.getCarById();
  }

  getCarById() {
    this.adminService.getCarById(this.carId).subscribe(res => {
      console.log(res)
    })
  }

}
