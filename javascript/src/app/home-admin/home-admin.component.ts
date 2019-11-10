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
	hoursVotes = []
	days = []
	dayToSearch

	constructor(private router: Router, private voteService: VoteService) {
		this.promiseRequest = new Promise(resolve => {this.getReport()});
	}

	ngOnInit() {
		if(!sessionStorage.getItem('admin-session')) this.router.navigate(['/admin'])
		this.initDateFilter()
		M.Modal.init(document.querySelectorAll('.modal'))
		setTimeout(() => {M.FormSelect.init(document.querySelectorAll('select'));}, 100)
	}
    
    getReport = async(date?) => {
        try{
            this.report = await this.voteService.getReport(date)
            this.hoursVotes = this.report.votesByHours
		}catch(error){
			console.log(error)
		}
	}

	initDateFilter = () => {
		let today = new Date()
		this.dayToSearch = today.getDate()
		let daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
		for(let i = 0; i < daysInMonth; i++) this.days.push(i + 1)
	}

}
