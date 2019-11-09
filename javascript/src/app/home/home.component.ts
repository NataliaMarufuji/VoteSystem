import { Component } from '@angular/core';
import { CandidateService } from '../candidate/candidate.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { VoteService } from '../vote/vote.service';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent {
	promiseRequest
	candidates
	user

	constructor(private router: Router, private userService: UserService, private candidateService: CandidateService, private voteService: VoteService,) {
		this.promiseRequest = new Promise(resolve => {this.getCandidates(), this.getLoggedUser()});
	}

	ngOnInit() {
		if(!sessionStorage.getItem('email')) this.router.navigate(['/login'])
	}

	getCandidates = async() => {
		try{
			this.candidates = await this.candidateService.getCandidates()
		}catch(error){
			console.log(error)
		}
	}

	getLoggedUser = async() => {
		try{
			this.user = await this.userService.getLoggedUser()
		}catch(error){
			console.log(error)
		}
	}

	vote = async(index) => {
		let candidate = this.candidates[index]
		try{
			await this.voteService.register(this.user, candidate)
			M.toast({html: 'Vote successfully'})
		  }catch(error){
			M.toast({html: 'Internal server error'})
		  }
	}
	
}
