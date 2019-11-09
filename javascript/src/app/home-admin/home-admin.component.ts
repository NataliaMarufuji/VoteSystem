import { Component } from '@angular/core';
import { CandidateService } from '../candidate/candidate.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css/dist/js/materialize';
import { VoteService } from '../vote/vote.service';

@Component({
	selector: 'home-admin',
	templateUrl: './home-admin.component.html',
	styleUrls: ['./home-admin.component.less']
})
export class HomeAdminComponent {
	promiseRequest
	candidates
    report
    candidatesVotes = []
    hoursVotes = []

	constructor(private router: Router, private candidateService: CandidateService, private voteService: VoteService) {
		this.promiseRequest = new Promise(resolve => {this.getCandidates(), this.getReport()});
	}

	ngOnInit() {
		if(!sessionStorage.getItem('admin-session')) this.router.navigate(['/login'])
		M.Modal.init(document.querySelectorAll('.modal'))
	}

	getCandidates = async() => {
		try{
			this.candidates = await this.candidateService.getCandidates()
		}catch(error){
			console.log(error)
		}
    }
    
    getReport = async() => {
        try{
            this.report = await this.voteService.getReport()
            this.candidatesVotes = this.report.votesByCandidates
            this.hoursVotes = this.report.votesByHours
		}catch(error){
			console.log(error)
		}
	}
	
}
