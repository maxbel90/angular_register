import {OnInit, Component} from "@angular/core";
import {UserService} from "../_services/user.service";
import {AuthenticationService} from "../_services/authentication.service";

import _ from 'lodash';

@Component({
  templateUrl: 'show-all.component.html'
})

export class ShowAllComponent implements OnInit {
  users;

  constructor(private authenticationService: AuthenticationService,
              private  currentUser: UserService) {
    this.currentUser.setUserFromLocalStorage();
  }

  ngOnInit() {
    this.loadUsers();
  }


  blockUser(id) {
    if (!confirm(`Are you sure that you want to block user with id ${id} ?`)) {
      return;
    }

    this.authenticationService.blockUser(id).then((res) => {
      let index = _.findIndex(this.users, (user) => user._id === id);
      this.users[index].blocked = true;
    })
  }

  unblockUser(id) {
    if (!confirm(`Are you sure that you want to unblock user with id ${id} ?`)) {
      return;
    }
    this.authenticationService.unblockUser(id).then((res) => {
      let index = _.findIndex(this.users, (user) => user._id === id);
      this.users[index].blocked = false;
    })
  }

  deleteUser(id) {
    if (!confirm(`Are you sure that you want to delete user with id ${id} ?`)) {
      return;
    }

    this.authenticationService.deleteUser(id).then((res) => {
      let index = _.findIndex(this.users, (user) => user._id === id);
      this.users.splice(index, 1);
    })
  }

  loadUsers() {
    this.authenticationService.getAllUsers().then((data) => {
      this.users = data;
    });
  }

}
