import { Component } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'teste';
  hideMenu = true

  constructor(private userService: UserService){
    if(sessionStorage.getItem('email')) this.hideMenu = false
  }
}
