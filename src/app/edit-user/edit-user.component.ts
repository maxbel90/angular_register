import {OnInit, Component} from "@angular/core";
import {UserService} from "../_services/user.service";
import {AuthenticationService} from "../_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AlertService} from "../_services/alert.service";

@Component({
  templateUrl: 'edit-user.component.html'
})

export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  password: FormControl;
  phone: FormControl;
  dataLoaded: boolean = false;
  loading: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private  user: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
    this.user.setUserFromLocalStorage();
  }

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.loadUser(params['id']);
    });
  }

  loadUser(id) {
    this.authenticationService.getUserById(id).then((data) => {
      this.user = data;
      this.dataLoaded = true;

      this.createFormControls();
      this.editUserForm = new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        phone: this.phone,
      });
    });
  }

  createFormControls() {
    this.firstName = new FormControl(this.user.firstName, [
      Validators.minLength(3),
      Validators.required,
    ]);
    this.lastName = new FormControl(this.user.lastName, [
      Validators.minLength(3),
      Validators.required,
    ]);
    this.phone = new FormControl(this.user.phone, [
      Validators.minLength(10),
      Validators.required,
    ]);

    this.password = new FormControl(this.user.password, [
      Validators.minLength(8),
      Validators.required
    ]);
  }

  save() {
    this.loading = true;

    const dataToSend = JSON.stringify({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      password: this.password.value,
      phone: this.phone.value,
    });

    if (this.authenticationService.updateUser(this.user._id, dataToSend)) {
      this.loading = false;
      this.alertService.success('Data successfully saved', true);
      this.usersList();
    }
  }

  usersList() {
    this.router.navigate(['/show-all']);
  }

}
