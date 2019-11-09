import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VoteFactory } from '../factories/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient, private voteFactory: VoteFactory) { }

  private voteApiUrl = `http://localhost:8080/api/vote`

  register = async(user, candidate) => {
    return await this.http.post(`${this.voteApiUrl}/register`, {vote: this.voteFactory.create(user, candidate)}).toPromise().then(this.extractData).catch(this.handleError);
  }

  getCandidates = async() => {
    return await this.http.get(`${this.voteApiUrl}/find/all/`).toPromise().then(this.extractData).catch(this.handleError);
  }

  extractData(res: any) {
    return res.vote || {};
  }

  extractDataFromListOfUsers(res:any){
    return res.votes || []
  }

  handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}
