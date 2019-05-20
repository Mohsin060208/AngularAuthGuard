import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
validateEmail(email:string){
  if(email == "abc@outlook.com"){
    return true;
  }
  else{
    return false;
  }
}
validatePass(pass:string){
if(pass == "Cortana1809"){
  return true;
  }
else{
  return false;
  } 
}
  storeSession(email:string){
  sessionStorage.setItem("email","'"+email+"'");
  return true;
  }
}