import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
LoginForm: FormGroup;
submitted = false;
pass : string;
email: string;
emailReq = false;
emailInvalid = false;
emailError = false;
emailMatch = false;
passReq = false;
passInvalid = false;
passMatch = true;
passLength = false;
  passValidator: boolean;
  emailValidator: boolean;
    constructor(private router:Router, private service: AuthService) { }
    ngOnInit() {
      this.LoginForm = new FormGroup({
        email: new FormControl('', [
          Validators.required,Validators.email
        ]),
        pass: new FormControl('', [
          Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{3,}$/), Validators.minLength(8)
        ])})
  }
    onSubmit() { 
      if(this.LoginForm.controls['email'].hasError('required')){
        this.emailError = false;
        this.emailMatch = false;
        this.emailInvalid = false;
        return this.emailReq = true;
      }
      else {
        this.emailReq = false;
        this.emailError = false;
        this.emailMatch = false;
        this.emailInvalid = false;
      }
      if(this.LoginForm.controls['email'].hasError('email')){
        return this.emailInvalid = true;
      }
      else {
        this.emailInvalid = false;
      }
      this.emailValidator = this.service.validateEmail(this.email);
      if(!this.emailValidator){
        return this.emailError = true;
      }
      else {
        this.emailError = false;
        this.emailMatch = true;
      }
      if(this.LoginForm.controls['pass'].hasError('required')){
        this.passInvalid = false;
        this.passLength = false;
        return this.passReq = true;
      }
      else {
        this.passInvalid = false;
        this.passLength = false;
        this.passReq = false;
      }
      if(this.LoginForm.controls['pass'].hasError('pattern')){
        return this.passInvalid = true;
      }
      else {
        this.passInvalid = false;
      }
      if(this.LoginForm.controls['pass'].hasError('minlength')){
        return this.passLength = true;
      }
      else {
        this.passLength = false;
      }
      this.passValidator = this.service.validatePass(this.pass);
      if(!this.passValidator){
        return this.passMatch = false;
      }
      else {
        this.passMatch = true;
    }
      if(this.emailMatch == true && this.passMatch == true){
        this.submitted = this.service.storeSession(this.email);
        if(this.submitted == true){
          this.router.navigate(['/dashboard']);
        }
        else{
          alert("Something Went Wrong");
          this.router.navigate(['/login']);
        }
      }
else{
  // alert("Please fill in the LoginForm with valid credentials.");
  this.router.navigate(['/login']);
}
    }
    checkPassword(event: Event,p: any){
      this.pass = (<HTMLInputElement>event.target).value.toString();
    }
    checkEmail(event: Event, p : any){
      this.email = (<HTMLInputElement>event.target).value.toString();
    }
}