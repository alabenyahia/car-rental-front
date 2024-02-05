import {Component} from '@angular/core';
import {CostumerService} from "../../services/costumer.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {StorageService} from "../../../../auth/services/storage/storage.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [
    NzButtonComponent,
    RouterLink,
    NgIf,
    NgOptimizedImage,
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
    NzSpinComponent,
    DatePipe
  ],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.css'
})
export class BookCarComponent {
  constructor(private customerService: CostumerService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private message: NzMessageService,
              private router: Router) {}

  carId: number = this.activatedRoute.snapshot.params["id"];
  car: any;
  processedImage: any;
  bookACarForm!: FormGroup;
  isSpinning = false;
  dateFormat = "dd-MM-YYYY";

  ngOnInit() {
    this.bookACarForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required]
    })
    this.getCarById();
  }

  getCarById() {
    this.customerService.getCarById(this.carId).subscribe(res => {
      console.log(res)
      this.processedImage = 'data:image/jpeg;base64,' + res.returnedImage;
      this.car = res;
    })
  }

  bookACar() {
    this.isSpinning = true;

    let bookACarDto = {
      toDate: this.bookACarForm.get("toDate")!.value,
      fromDate: this.bookACarForm.get("fromDate")!.value,
      userId: StorageService.getUserId(),
      carId: this.carId
    }

    console.log("book a car dto", bookACarDto);

    this.customerService.bookACar(bookACarDto).subscribe(res => {
      console.log(res)
      this.message.success("Booking request submited successfully", {nzDuration: 3500});
      this.isSpinning = false;
      this.router.navigateByUrl("/customer/dashboard");
    }, (error: any) => {
      this.message.error("Something wrong happened!", {nzDuration: 3500});
      this.isSpinning = false;
    })

  }

}
