import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private route: Router,
  ) {}

  ngOnInit(): void {}

  getData() {
    this.authService.getData().subscribe((resp) => {
      console.log(resp);
    });
  }

}
