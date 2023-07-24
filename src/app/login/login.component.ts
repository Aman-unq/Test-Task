import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginservice: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {
    localStorage.clear();
  }
  get f() {
    return this.loginForm.controls;
  }

  submitData() {
    let data = this.loginForm.value;
    console.log('submit', data);
    this.loginservice
      .getData(data.email, data.password)
      .subscribe((res: any) => {
        console.log('resjson', res);
        if (res.length > 0) {
          this.loginservice.setUser(res[0]);
          console.log('res[0]', res[0]);
          localStorage.setItem('isActive', 'true');
          this.toastr.success('Login Successfull!');
          this.router.navigate(['/welcome']);
        } else {
          this.toastr.error('Please register to login','Login Failed!');
        }
      });
  }
}
