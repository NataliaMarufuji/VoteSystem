import { Component } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { CandidateService } from '../candidate/candidate.service';

@Component({
  selector: 'register-candidate',
  templateUrl: './register-candidate.component.html',
  styleUrls: ['./register-candidate.component.less']
})
export class RegisterCandidateComponent {
    
	candidate = {name: '', technologies:[]}
	technologies = ''
    
    constructor(private candidateService: CandidateService){}

	regiterCandidate = async() => {
		try{
			if(!this.candidate.name || this.candidate.name.length < 3)
				return M.toast({html: 'Enter the candidates´s name'})
			this.getCandidateTechnologies()
			await this.candidateService.create(this.candidate)
			this.candidate = {name: '', technologies:[]}
			this.technologies = ''
            M.toast({html: 'Candidate registered'})
        }catch(error){
            M.toast({html: "Internal server error"})
        }

	}

	getCandidateTechnologies = () => {
		let technologies = this.technologies.split(';')
		this.candidate.technologies = technologies
	}
}
