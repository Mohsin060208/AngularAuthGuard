import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  SignUpForm: FormGroup;
  email: string;
  emailReq: boolean;
  emailInvalid: boolean;
  emailValid = false;
  pass: string;
  passReq: boolean;
  passInvalid: boolean;
  passLength: boolean;
  passValid = false;
  cb = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.SignUpForm = new FormGroup({
      fname: new FormControl('', [
        Validators.required,Validators.pattern( /^[A-Z]+[a-zA-z]{1,}$/), Validators.minLength(3)
      ]),
      lname: new FormControl('', [
        Validators.required,Validators.pattern( /^[A-Z]+[a-zA-z]{1,}$/), Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,Validators.email
      ]),
      pass: new FormControl('', [
        Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{3,}$/), Validators.minLength(8)
      ]),
      cbo: new FormControl('',Validators.required)
    });
  }
  onSubmit() { 
    if(this.SignUpForm.controls['email'].hasError('required')){
      this.emailValid = false;
      this.emailInvalid = false;
      return this.emailReq = true;
    }
    else {
      this.emailReq = false;
      this.emailInvalid = false;
      this.emailValid = false;
    }
    if(this.SignUpForm.controls['email'].hasError('email')){
      this.emailValid = false;
      return this.emailInvalid = true;
    }
    else {
      this.emailInvalid = false;
      this.emailValid = true;
    }
    if(this.SignUpForm.controls['pass'].hasError('required')){
      this.passValid = false;
      this.passInvalid = false;
      this.passLength = false;
      return this.passReq = true;
    }
    else {
      this.passValid = false;
      this.passInvalid = false;
      this.passLength = false;
      this.passReq = false;
    }
    if(this.SignUpForm.controls['pass'].hasError('pattern')){
      return this.passInvalid = true;
    }
    else {
      this.passInvalid = false;
    }
    if(this.SignUpForm.controls['pass'].hasError('minlength')){
      return this.passLength = true;
    }
    else {
      this.passLength = false;
      this.passValid = true;
    }
    if(this.SignUpForm.controls['cbo'].hasError('required')){
      return this.cb = true;
    }
    else{
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