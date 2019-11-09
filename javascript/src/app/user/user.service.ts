import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserFactory } from '../factories/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private userFactory: UserFactory) { }

  private usersApiUrl = `http://localhost:8080/api/users`
  user: any;

  create = async(user) => {
    return await this.http.post(`${this.usersApiUrl}/signup`, {user: this.userFactory.create(user)}).toPromise().then(this.extractData).catch(this.handleError);
  }

  getUserByEmail = async(email) => {
    return await this.http.get(`${this.usersApiUrl}/find/email/${email}`).toPromise().then(this.extractData).catch(this.handleError);
  }

  getLoggedUser = async() => {
    return await this.getUserByEmail(sessionStorage.getItem('email'))
  }

  authenticateAdmin = async(token) => {
    return await this.http.post(`${this.usersApiUrl}/authenticate/admin`, {token: token}).toPromise().then(this.processAuthentication).catch(this.handleError);
  }

  processAuthentication(res: any){
    if(res.authenticated != false) return true
    return false
  }

  extractData(res: any) {
    return res.user || {};
  }

  extractDataFromListOfUsers(res:any){
    return res.users || []
  }

  handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}
