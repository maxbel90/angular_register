import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

import {AuthenticationService} from '../_services/authentication.service';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";

@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  loading: boolean = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {

  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = '/main';

    this.createFormControls();
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);

    this.password = new FormControl('', [
      Validators.minLength(8),
      Validators.required
    ]);
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.email.value, this.password.value)
      .then((data) => {
        if (data < 0) {
          this.alertService.error('Login or password are incorrect', true);
          this.router.navigate(['/login']);
          return false;
        }

        this.loading = false;
        this.alertService.success('Login successful', true);
        this.router.navigate([this.returnUrl]);
      });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
