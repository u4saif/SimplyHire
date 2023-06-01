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
  isFormLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private auth: AuthService,
    private message: NzMessageService,
    private StorageService: StorageService
  ) {}
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberUser: false,
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
    this.isFormLoading = true;
    this.auth.userLogin('auth/login', { username, password }).subscribe(
      (response: any) => {
        this.isFormLoading = false;
        this.StorageService.setToken('authToken', response['token']);
        this.StorageService.setToken('refToken', response['token']);
        this.message.create('success', `Logged In successfully`);
        this.route.navigate(['dashboard/home']);
      },
      (error) => {
        this.isFormLoading = false;
        this.message.create(
          'error',
          `Unable to login. ${error?.error?.error || error?.error?.message}`
        );
        this.route.navigate(['login']);
      }
    );
  }

  

  get username() {
    return this.loginForm.controls['username'];
  }

 
}
