import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CandidateFactory } from '../factories/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient, private candidateFactory: CandidateFactory) { }

  private candidatesApiUrl = `http://localhost:8080/api/candidate`
  candidate: any;

  create = async(candidate) => {
    return await this.http.post(`${this.candidatesApiUrl}/register`, {candidate: this.candidateFactory.create(candidate)}).toPromise().then(this.extractData).catch(this.handleError);
  }

  getCandidates = async() => {
    return await this.http.get(`${this.candidatesApiUrl}/find/all/`).toPromise().then(this.extractData).catch(this.handleError);
  }

  extractData(res: any) {
    return res.candidates || {};
  }

  extractDataFromListOfUsers(res:any){
    return res.candidates || []
  }

  handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}
