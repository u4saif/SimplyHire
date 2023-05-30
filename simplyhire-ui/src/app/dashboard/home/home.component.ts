import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  isCollapsed = false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  getData(){
  this.authService.getData().subscribe((resp)=>{
    console.log(resp)
  })
  }

}
