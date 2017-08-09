import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthenticationService} from "../_services/authentication.service";
import {AlertService} from "../_services/alert.service";

@Component({
  templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  phone: FormControl;
  loading: boolean = false;

  returnUrl: string = '/login';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.createFormControls();
    this.registrationForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
    });
  }

  createFormControls() {
    this.firstName = new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]);
    this.lastName = new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.phone = new FormControl('', [
      Validators.minLength(10),
      Validators.required,
    ]);

    this.password = new FormControl('', [
      Validators.minLength(8),
      Validators.required
    ]);
  }

  register() {
    this.loading = true;

    const dataToSend = JSON.stringify({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.phone.value,
    });

    if(this.authenticationService.registration(dataToSend)) {
      this.alertService.success('Registration successful', true);
      this.router.navigate([this.returnUrl]);
    }
  }

}
