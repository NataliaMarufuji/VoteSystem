import { Component } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'success-vote',
  templateUrl: './success-vote.component.html',
  styleUrls: ['./success-vote.component.less']
})
export class SuccessVoteComponent {
    
    constructor(private router: Router){
    }

    gotoHome = () => {
        try{
            this.router.navigate(['/home'])
		}catch(error){
			console.log(error)
		}
	}

}
