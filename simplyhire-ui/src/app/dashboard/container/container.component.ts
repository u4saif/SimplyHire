import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.less']
})
export class ContainerComponent implements OnInit {
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

  logOut() {
    this.storageService.logOut('authToken');
    this.route.navigate(['/']);
  }

}
