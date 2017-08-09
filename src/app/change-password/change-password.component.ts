import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {matchOtherValidator} from "../validators/match-other.validator";
import {checkCurrentPasswordValidator} from "../validators/check-current-password.validator";
import {AuthenticationService} from "../_services/authentication.service";
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";
@Component({
  templateUrl: 'change-password.component.html'
})

export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  oldPassword: FormControl;
  newPassword: FormControl;
  confirmPassword: FormControl;
  loading: boolean = false;
  returnUrl: string;

  constructor(private authenticationService: AuthenticationService,
              private  user: UserService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.user.setUserFromLocalStorage();
    this.returnUrl = '/main';

    this.createFormControls();
    this.changePasswordForm = new FormGroup({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    });
  }

  createFormControls() {
    let currentPassword = this.user.password;

    this.oldPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      checkCurrentPasswordValidator(currentPassword)
    ]);

    this.newPassword = new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]);

    this.confirmPassword = new FormControl('', [
      Validators.minLength(8),
      Validators.required,
      matchOtherValidator('newPassword')
    ]);
  }

  changePassword() {
    this.loading = true;
    this.authenticationService.changePassword(this.newPassword.value).then(() => {
      this.loading = false;
      this.alertService.success('Data successfully saved', true);
      this.router.navigate([this.returnUrl]);
    });
  }
}
