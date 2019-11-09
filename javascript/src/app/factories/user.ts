import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserFactory {

    create(user) {
        return {
            created: new Date(),
            name: user.name,
            email: user.email,
            password: user.password,
            passwordConfirm: user.passwordConfirm
        }
    }
}