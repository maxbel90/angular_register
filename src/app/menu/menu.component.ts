import {OnInit, Component} from "@angular/core";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})

export class MenuComponent implements OnInit {
  menuItems = [
    {url: 'login', label: 'Login', shotToUser: false},
    {url: 'register', label: 'Register', shotToUser: false},
    {url: 'main', label: 'Main', shotToUser: true},
    {url: 'change-password', label: 'Change password', shotToUser: true},
    {url: 'show-all', label: 'Show all users', shotToUser: true, showToAdmin: true},
    {url: 'logout', label: 'Logout', shotToUser: true},
  ];

  ngOnInit() {

  }

  constructor(private user: UserService) {}

  needToShow(item) {
    if(item.showToAdmin) {
      if (this.user.isAdmin()) {
        return true;
      }
    }
    else if (item.shotToUser) {
      if (this.user.isAuthenticated()) {
        return true;
      }
    } else if (!this.user.isAuthenticated()) {
      return true;
    }

    return false;

  }
}
