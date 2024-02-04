import {Component} from '@angular/core';
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NzTransitionPatchDirective} from "ng-zorro-antd/core/transition-patch/transition-patch.directive";
import {NzInputDirective} from "ng-zorro-antd/input";
import {StorageService} from "../../../../auth/services/storage/storage.service";
import {AdminService} from "../../services/admin.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-car-post',
  standalone: true,
  imports: [
    NzTypographyComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzDatePickerComponent,
    ReactiveFormsModule,
    NzColDirective,
    NzButtonComponent,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
    NgOptimizedImage,
    NzInputDirective,
    NzFormDirective,
    NgIf
  ],
  templateUrl: './car-post.component.html',
  styleUrl: './car-post.component.css'
})
export class CarPostComponent {
  postCarForm!: FormGroup;
  selectedFile: any;
  imagePreview: any;
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfTypes = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColors = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmissions = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder,
              private adminService: AdminService,
              private message: NzMessageService,
              private router: Router) {}

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    })
  }

  postCar() {
    if (this.postCarForm.valid) {
      console.log(this.postCarForm.value)
      const formData: FormData = new FormData();
      formData.append("image", this.selectedFile);
      formData.append("brand", this.postCarForm.get("brand")!.value)
      formData.append("name", this.postCarForm.get("name")!.value)
      formData.append("type", this.postCarForm.get("type")!.value)
      formData.append("color", this.postCarForm.get("color")!.value)
      formData.append("year", this.postCarForm.get("year")!.value)
      formData.append("transmission", this.postCarForm.get("transmission")!.value)
      formData.append("description", this.postCarForm.get("description")!.value)
      formData.append("price", this.postCarForm.get("price")!.value)
      console.log(formData);
      this.adminService.postCar(formData).subscribe(res => {
        this.message.success("Car posted successfully", {nzDuration: 3500});
        this.router.navigateByUrl("/admin/dashboard")
        console.log(res);
      }, (error: any) => {
        this.message.error("Error while posting car", {nzDuration: 3500});
      })
    } else {
      Object.values(this.postCarForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

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
