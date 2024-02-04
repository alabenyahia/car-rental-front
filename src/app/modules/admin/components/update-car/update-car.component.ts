import { Component } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [
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
    ReactiveFormsModule
  ],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})
export class UpdateCarComponent {
  constructor(private fb: FormBuilder,
              private adminService: AdminService,
              private message: NzMessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log("on innnnnnnnnnnnit");
    this.updateCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    })
    this.getCarById();
  }

  carId: number = this.activatedRoute.snapshot.params["id"];
  existingImage: string | null = null;

  updateCarForm!: FormGroup;
  selectedFile: any;
  imagePreview: any;
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfTypes = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColors = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmissions = ["Manual", "Automatic"];

  getCarById() {
    this.adminService.getCarById(this.carId).subscribe(res => {
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
      console.log("dttoooo", carDto);
      this.updateCarForm.patchValue(carDto)
    })
  }

  /*updateCar() {
    if (this.updateCarForm.valid) {
      console.log(this.updateCarForm.value)
      const formData: FormData = new FormData();
      formData.append("image", this.selectedFile);
      formData.append("brand", this.updateCarForm.get("brand")!.value)
      formData.append("name", this.updateCarForm.get("name")!.value)
      formData.append("type", this.updateCarForm.get("type")!.value)
      formData.append("color", this.updateCarForm.get("color")!.value)
      formData.append("year", this.updateCarForm.get("year")!.value)
      formData.append("transmission", this.updateCarForm.get("transmission")!.value)
      formData.append("description", this.updateCarForm.get("description")!.value)
      formData.append("price", this.updateCarForm.get("price")!.value)
      console.log(formData);
      this.adminService.updateCar(formData, this.carId).subscribe(res => {
        this.message.success("Car updated successfully", {nzDuration: 3500});
        this.router.navigateByUrl("/admin/dashboard")
        console.log(res);
      }, (error: any) => {
        this.message.error("Error while updating car", {nzDuration: 3500});
      })
    } else {
      Object.values(this.updateCarForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }*/


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage()
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
