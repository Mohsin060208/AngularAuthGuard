import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  pass = '';
  email = '';
  logged: boolean;
  constructor(private router: Router, private service: AuthService) { 
    sessionStorage.clear();
  }
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
  checkPassword(event: Event, p: any) {
    this.pass = (<HTMLInputElement>event.target).value.toString();
  }
  checkEmail(event: Event, p: any) {
    this.email = (<HTMLInputElement>event.target).value.toString();
  }
  onSubmit() {
    this.submitted = true;
    if (this.LoginForm.valid) {
      this.emailMatch = this.service.validateEmail(this.email);
      this.passMatch = this.service.validatePass(this.pass);
      if (this.emailMatch == true && this.passMatch == true) {
        this.submitted = false;
        this.logged = this.service.storeSession(this.email);
        if (this.logged == true) {
          console.log("Logged in");
          this.router.navigate(['/dashboard']);
        }
      }
      else {
        alert("Email/Password is incorrect!");
        this.submitted = false;
        this.LoginForm.reset();
      }
    }
  }
}