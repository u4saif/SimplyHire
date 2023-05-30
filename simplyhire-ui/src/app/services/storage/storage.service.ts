import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setToken(key:string,token: string) {
    localStorage.setItem(key,token);
  }
  getToken(key: string) {
    return localStorage.getItem(key);
  }

  logOut(key: string){
    localStorage.removeItem(key);
  }
}
