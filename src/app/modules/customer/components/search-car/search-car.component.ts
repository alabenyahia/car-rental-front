import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {RouterLink} from "@angular/router";
import {CostumerService} from "../../services/costumer.service";

@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    NzTypographyComponent,
    ReactiveFormsModule,
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
              private customerService: CostumerService) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null]
    });
  }


  searchCar() {
    this.customerService.searchCar(this.searchCarForm.value).subscribe(res => {
      this.cars = [];
      console.log(res);
      res.carDtoList.forEach((element: any) => {
        element.processedImage = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      })
    })
  }

}
