import { Component } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { LoginAdminService } from './login-admin.service';

@Component({
	selector: 'login-admin',
	templateUrl: './login-admin.component.html',
	styleUrls: ['./login-admin.component.less']
})
export class LoginAdminComponent {
	private token

	constructor(private loginAdminService: LoginAdminService) {}

	authenticate = async() =>{
		try{
			await this.loginAdminService.authenticate(this.token)
			M.toast({html: 'Login successfully'})
		}catch(error){
			M.toast({html: 'Incorrect token.'})
		}
	}

}
