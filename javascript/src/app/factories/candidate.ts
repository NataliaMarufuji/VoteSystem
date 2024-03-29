import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateFactory {
    create(candidate) {
        return {
            name:candidate.name,
            age: candidate.age,
            currentPosition: candidate.currentPosition,
            technologies: candidate.technologies
        }
    }
}