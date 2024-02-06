import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {AdminService} from "../../services/admin.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgOptimizedImage,
    NzButtonComponent,
    NzColDirective,
    NzDatePickerComponent,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzInputDirective,
    NzOptionComponent,
    NzSelectComponent,
    NzTypographyComponent,
    ReactiveFormsModule,
    DatePipe,
    NzRowDirective,
    RouterLink
  ],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.css'
})
export class SearchCarComponent {
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfTypes = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColors = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmissions = ["Manual", "Automatic"];

  searchCarForm!: FormGroup;
  cars: any[] = [];
  constructor(private fb: FormBuilder,
              private adminService: AdminService) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null]
    });
  }


  searchCar() {
    this.adminService.searchCar(this.searchCarForm.value).subscribe(res => {
      this.cars = [];
      console.log(res);
      res.carDtoList.forEach((element: any) => {
        element.processedImage = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      })
    })
  }



}
