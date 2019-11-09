import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteFactory {
    create(user, candidate) {
        return {
            user:user._id,
            candidate: candidate._id
        }
    }
}