import {Injectable} from "@angular/core";

@Injectable()
export class UserService {
  _id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  createdOn: number;
  updatedOn: number;
  role: string;
  blocked: boolean;

  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  setUserFromLocalStorage() {
    if (!this.isAuthenticated()) {
      return false;
    }

    const currentUser = JSON.parse(localStorage.getItem('user'));

    this._id = currentUser._id;
    this.email = currentUser.email;
    this.role = currentUser.role;
    this.firstName = currentUser.firstName;
    this.lastName = currentUser.lastName;
    this.password = currentUser.password;
    this.phone = currentUser.phone;
    this.blocked = currentUser.blocked;
  }

  isAdmin(): boolean {
    if(!this.isAuthenticated()) {
      return false;
    }

    return (this.role === 'admin');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user')
  }
}
