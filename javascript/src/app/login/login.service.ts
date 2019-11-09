import { Injectable } from '@angular/core';
import { UserService} from '../user/user.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(private router: Router, private userService: UserService) { }

    authenticate = async(emailEntered, passwordEntered) => {
        try{
            if(await this.passwordsMatch(emailEntered, passwordEntered)){
                sessionStorage.setItem('email', emailEntered)
                this.router.navigate(['/home'])
            }
            else
                throw new Error('Incorrect e-mail or password.')
        }catch(error){
            throw error
        }
    }

    getUser = async(email) => {
        return await this.userService.getUserByEmail(email)
    }

    getUserPassword(user){
        return user.password
    }

    passwordsMatch = async(emailEntered, passwordEntered) => {
        return this.getUserPassword(await this.getUser(emailEntered)) === passwordEntered
    }
}
