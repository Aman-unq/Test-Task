import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { uniqueEmailValidator } from '../customvalidators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private signupservice: DataService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  signupForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email],[uniqueEmailValidator(this.http)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {}
  get f() {
    return this.signupForm.controls;
  }

  signupData() {
    let data = this.signupForm.value;
    console.log('signup', data);
    // if(!this.signupForm.valid) {
    //   return alert('Please Provide Some Value');
    // }
    this.signupservice.setSignupData(data).subscribe((res) => {
      console.log('response', res);
      this.toastr.success('Please Login!', 'Registration Successfull!');
      this.router.navigate(['/login']);
    });
  }
}
