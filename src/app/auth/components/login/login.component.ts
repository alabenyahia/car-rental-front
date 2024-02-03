import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {StorageService} from "../../services/storage/storage.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        NzButtonComponent,
        NzColDirective,
        NzFormControlComponent,
        NzFormDirective,
        NzFormItemComponent,
        NzInputDirective,
        NzInputGroupComponent,
        NzRowDirective,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private fb: NonNullableFormBuilder,
              private authService: AuthService,
              private router: Router,
              private message: NzMessageService) {}


  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    password: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
  });

  login(): void {
    if (this.loginForm.valid) {
      console.log('submit', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe(res => {
        console.log(res)
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole
          }

          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);

          if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl("/admin/dashboard");
          } else if (StorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl("/customer/dashboard")
          }
        } else {
          console.log("baddd cred");
          this.message.error("Bad credentials", {nzDuration: 3500});
        }
      });
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
