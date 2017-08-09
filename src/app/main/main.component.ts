import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  templateUrl: 'main.component.html'
})

export class MainComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    public user: UserService) {}

  ngOnInit() {
    this.user.setUserFromLocalStorage();
  }

  becomeAdmin() {
    this.authenticationService.becomeAdmin();
  }

}
