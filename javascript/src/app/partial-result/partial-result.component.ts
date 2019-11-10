import { Component } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { VoteService } from '../vote/vote.service';

@Component({
	selector: 'partial-result',
	templateUrl: './partial-result.component.html',
	styleUrls: ['./partial-result.component.less']
})
export class PartialResultComponent {
    promiseRequest
    partialResults

    constructor(private voteService: VoteService) {
		this.promiseRequest = new Promise(resolve => {this.getPartialResults()});
	}

    getPartialResults = async() => {
        try{
            this.partialResults = await this.voteService.getPartialResults()
		}catch(error){
			console.log(error)
		}
	}
}
