import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UniqueUsername } from 'src/app/utils/asyncValidators/unique-usernmae.validator';
import { Matchfield } from 'src/app/utils/syncValidators/mach-fields.validator';
import { StorageService } from '../../services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  passwordVisible = false;
  password?: string;
  
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private auth: AuthService,
    private message: NzMessageService,
    private StorageService: StorageService) { }
  registerForm: FormGroup = this.fb.group(
    {
      name: ['', Validators.required],
      username: ['', {
        validators:[Validators.required, Validators.email],
        asyncValidators:[UniqueUsername(this.auth)],
        // updateOn: 'blur'
    }],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [
        '',
        {
          validators: [Validators.required, Validators.minLength(8)],
        },
      ],
    },
    {
      validator: [Matchfield('password','confirmPassword')],
    }
  );

  ngOnInit(): void {
  }

  /**
   * Register a new User, login & store the token
   */
  register() {
    const { name, username, password } = this.registerForm.value;
    this.auth
      .userLogin('auth/register', { name, username, password })
      .subscribe(
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

  get registerUsername() {
    return this.registerForm.controls['username'];
  }

}
