import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { LoginComponent} from './login/login.component';
import { RegisterUserComponent} from './register-user/register-user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { SuccessVoteComponent } from './success-vote/success-vote.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'admin', component: LoginAdminComponent },
  { path: 'home-admin', component: HomeAdminComponent },
  { path: 'vote-success', component: SuccessVoteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
