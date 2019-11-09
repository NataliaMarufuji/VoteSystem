import { Injectable } from '@angular/core';
import { UserService} from '../user/user.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {

    constructor(private router: Router, private userService: UserService) { }

    authenticate = async(token) => {
        try{
            if(await this.userService.authenticateAdmin(token)){
                console.log('asdasd')
                // sessionStorage.setItem('email', emailEntered)
                // this.router.navigate(['/home'])
            }
            else
                throw new Error('Incorrect e-mail or password.')
        }catch(error){
            throw error
        }
    }
}
