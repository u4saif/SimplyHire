import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  userLogin(URL: string, formData: any) {
    const url = Constants.BASE_URL + URL;
    return this.http.post(url, formData);
  }

  getData(){
    const url = Constants.BASE_URL + 'dashboard/interviews';
    return this.http.get(url);
  }
}
