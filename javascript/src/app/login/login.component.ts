import { Component } from '@angular/core';
import { LoginService } from './login.service';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  private user = {
    email:"",
    password: ""
  }

  constructor(private loginService: LoginService) {}

  login = async() =>{
    try{
      await this.loginService.authenticate(this.user.email, this.user.password)
      M.toast({html: 'Login successfully'})
    }catch(error){
      M.toast({html: 'Incorrect e-mail or password.'})
    }
  }

}
