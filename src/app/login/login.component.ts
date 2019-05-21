import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  emailMatch: boolean;
  passMatch: boolean;
  pass: string;
  email: string;
 
  constructor(private router: Router, private service: AuthService) { }
  ngOnInit() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      pass: new FormControl('', [
        Validators.required
      ])
    })
  }
  onSubmit() {
    this.submitted = true;
    this.emailMatch = this.service.validateEmail(this.email);
    this.passMatch = this.service.validatePass(this.pass);
    if (this.emailMatch == true && this.passMatch == true) {
      this.submitted = false;
      this.logged = this.service.storeSession(this.email);
      if (this.logged == true) {
        this.router.navigate(['/dashboard']);
      }
      else {
        this.submitted = false;
        this.LoginForm.reset();
        this.router.navigate(['/login']);
      }
    }
  }
  checkPassword(event: Event, p: any) {
    this.pass = (<HTMLInputElement>event.target).value.toString();
  }
  checkEmail(event: Event, p: any) {
    this.email = (<HTMLInputElement>event.target).value.toString();
  }
}