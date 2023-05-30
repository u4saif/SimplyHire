import { StorageService } from '../../services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  passwordVisible = false;
  password?: string;
  isLoginFormVisible: boolean = true;
  isFormLoading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private auth: AuthService,
    private message: NzMessageService,
    private StorageService: StorageService
  ) {}
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required],
    rememberUser: false,
  });

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    username: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required,Validators.minLength(8)]],
  });

  ngOnInit(): void {
    //if (this.StorageService.getToken('authToken'))
      //this.route.navigate(['dashboard/home']);
  }

  toggleForm() {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }

  /**
   * Authenticate user and Store Token in localStorage
   */
  login() {
    const { username, password } = this.loginForm.value;
    this.isFormLoading=true;
    this.auth.userLogin('auth/login', { username, password }).subscribe(
      (response: any) => {
        this.isFormLoading=false;
        this.StorageService.setToken('authToken', response['token']);
        this.StorageService.setToken('refToken', response['token']);
        this.message.create('success', `Logged In successfully`);
        this.route.navigate(['dashboard/home']);
      },
      (error) => {
        this.isFormLoading=false;
        this.message.create(
          'error',
          `Unable to login. ${error?.error?.error || error?.error?.message}`
        );
        this.route.navigate(['login']);
      }
    );
  }

/**
 * Register a new User, login & store the token
 */
  register() {
    const { name, username, password } = this.registerForm.value;
    this.auth.userLogin('auth/register', { name, username, password }).subscribe(
      (resp: any) => {
        this.StorageService.setToken('authToken', resp['token']);
        this.StorageService.setToken('refToken', resp['token']);
        this.message.create('success', `Logged In successfully`);
        this.route.navigate(['dashboard/home']);
      },
      (error) => {
        this.message.create(
          'error',
          `Unable to login. ${error?.error?.error || error?.error?.message}`
        );
      }
    );
  }

  get username(){
    return this.loginForm.controls['username']
  }

  get username2(){
    return this.registerForm.controls['username']
  }
}
