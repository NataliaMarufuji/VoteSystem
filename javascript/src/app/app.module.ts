import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { NgxEditorModule } from 'ngx-editor'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent} from './register-user/register-user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { RegisterCandidateComponent } from './register-candidate/register-candidate.component';
import { PartialResultComponent } from './partial-result/partial-result.component';
import { SuccessVoteComponent } from './success-vote/success-vote.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeAdminComponent,
    LoginComponent,
    LoginAdminComponent,
    PartialResultComponent,
    RegisterCandidateComponent,
    RegisterUserComponent,
    SuccessVoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxEditorModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
