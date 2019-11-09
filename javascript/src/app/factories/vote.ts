import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteFactory {
    create(user, candidate) {
        return {
            created: new Date(),
            user:user._id,
            candidate: candidate._id
        }
    }
}