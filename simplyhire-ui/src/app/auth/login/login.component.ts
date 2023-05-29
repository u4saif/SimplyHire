import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  passwordVisible = false;
  password?: string;
  isLoginFormVisible:boolean = true;

  constructor(private fb: FormBuilder) {}
  loginForm: FormGroup = this.fb.group({
    username: ['',Validators.required],
    userPassword: ['',Validators.required],
    rememberUser: false,
  });

  registerForm: FormGroup = this.fb.group({
    name: ['',Validators.required],
    username: ['',Validators.required],
    userPassword: ['',Validators.required],
    confirmPassword: ['',Validators.required],
  })

  ngOnInit(): void {}

  toggleForm(){
    this.isLoginFormVisible= !this.isLoginFormVisible;
  }
}
