import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  validate(email: string, pass: string){
    if(email == "123@outlook.com" && pass == "12439"){
      localStorage.setItem("email","123@outlook.com");
      return true;
    }
    else{
      return false;
    }
  }
}
