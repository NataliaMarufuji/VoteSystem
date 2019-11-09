import { Component } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { RegisterUserService } from './register-user.service';

@Component({
  selector: 'register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.less']
})
export class RegisterUserComponent {
    user
    
    constructor(private registerUserService: RegisterUserService){
        this.user = {}
    }

    register = async() =>{
        try{
            await this.registerUserService.register(this.user)
            M.toast({html: 'User registered'})
        }catch(error){
            M.toast({html: "Internal server error"})
        }
    }
}
