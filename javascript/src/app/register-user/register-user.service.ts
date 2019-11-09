import { Injectable } from '@angular/core';
import { UserService} from '../user/user.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

    constructor(private router: Router, private userService: UserService) { }

    register = async(user) => {
        try{
            if(this.validateUserRegister(user)){
                await this.userService.create(user)
                sessionStorage.setItem('email', user.email)
                this.router.navigate(['/home'])
            }
            else
                throw("Error to register user")
        }catch(error){
            throw error
        }
    }

    validateUserRegister(user){
        return (this.allFieldsAreFilled(user) && this.passwordsCheck(user.password, user.passwordConfirm))
    }

    passwordsCheck(password, passwordConfirm){
        if(password === passwordConfirm) return true
        throw new Error('Passwords must match')
    }

    allFieldsAreFilled(user){
        if(!this.isFilled(user.name)) throw new Error('Enter your name')
        if(!this.isFilled(user.email)) throw new Error('Enter your email address')
        if(!this.isFilled(user.password)) throw new Error('Enter your password')
        if(!this.isFilled(user.passwordConfirm)) throw new Error('Confirm your password')
        return true
    }

    isFilled(field){
        return field != ''
    }

}
