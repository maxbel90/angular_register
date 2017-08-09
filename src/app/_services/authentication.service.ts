import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import {UserService} from "./user.service";

@Injectable()
export class AuthenticationService {

  serverUrl: string = 'http://localhost:5001/api/';

  constructor(private http: Http, private user: UserService) {

  }

  getFullUrl(endpoint) {
    return this.serverUrl + endpoint;
  }

  login(email: string, password: string) {
    const obj = {
      email: email,
      password: password
    };

    return this.doRequest('authenticate', 'post', obj).then((res)=>{
      if(res.error) {
        return -1;
      }

      this.saveUserData(res[0]);
    });

  }

  registration(obj) {
    return this.doRequest('save', 'post', obj);
  }

  doRequest(url, method, obj = {}) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http[method](this.getFullUrl(url), obj, options)
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(res => {
        return res.json();
      });
  }

  changePassword(password) {
    let id = this.user._id;
    return this.doRequest(`change-password/${id}`, 'put', {password: password}).then((res) => {
      this.saveUserData(res);
    });
  }

  saveUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
    this.user.setUserFromLocalStorage();
  }

  logout() {
    localStorage.removeItem('user');
  }

  becomeAdmin() {
    let id = this.user._id;
    return this.doRequest(`become-admin/${id}`, 'put', {role: 'admin'}).then((res) => {
      this.saveUserData(res);
    })
  }

  getAllUsers() {
    return this.doRequest('users', 'get').then((res) => {
      return res;
    }) ;
  }

  updateUser(id, data) {
    return this.doRequest(`update-user/${id}`, 'put', data);
  }

  blockUser(id) {
    return this.doRequest(`block-user/${id}`, 'put', {blocked: true});
  }

  unblockUser(id) {
    return this.doRequest(`unblock-user/${id}`, 'put', {blocked: false});
  }

  deleteUser(id) {
    return this.doRequest(`users/${id}`, 'delete');
  }

  getUserById(id) {
    return this.doRequest(`users/${id}`, 'get');
  }

}
