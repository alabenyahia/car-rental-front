import {Component} from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzInputDirective,
    NzFormDirective,
    NzColDirective,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzRowDirective,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private fb: NonNullableFormBuilder,
              private authService: AuthService,
              private message: NzMessageService,
              private router: Router) {}

  registerForm: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
  });

  register(): void {
    if (this.registerForm.valid) {
      console.log('submit', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe(res => {
        console.log(res);
        if (res.id != null) {
          this.message.success("Registration successful !", {nzDuration: 3500});
          this.router.navigateByUrl("/login");
        } else {
          this.message.error("Something went wrong!", {nzDuration: 3500});
        }
      })
    } else {
      Object.values(this.registerForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }


}
