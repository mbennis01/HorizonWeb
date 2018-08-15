import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FacebookModule } from 'ngx-facebook';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FbService } from './Services/fb.service';
import { NewsComponent } from './news/news.component';
import { CommentsComponent } from './comments/comments.component';
import { TestComponent } from './test/test.component';
import { FavorisComponent } from './favoris/favoris.component';

import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { BadgeComponent } from './badge/badge.component';
import { AuthService } from './Services/auth.service';
import { AuthGuardService } from './Services/auth-guard.service';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ExecutorComponent } from './executor/executor.component';
import { SeuilComponent } from './seuil/seuil.component';

const routes : Routes = [
  {path: '', component: LoginComponent}, 
  {path: 'accueil', component: AccueilComponent , canActivate: [AuthGuardService] ,children: [
    {path: 'news', component: NewsComponent, outlet: 'leftrouter'},
    {path: 'comments', component: CommentsComponent, outlet: 'rightrouter'},
    {path: 'favoris', component: FavorisComponent, outlet: 'leftrouter'},
    {path: 'comments/:id/:titre', component: CommentsComponent, outlet: 'rightrouter'},
    {path: 'badges', component: BadgeComponent, outlet: 'leftrouter'},
    {path: 'usersadmin', component: UsersAdminComponent, outlet: 'leftrouter'}, 
    {path: 'userlist', component: UserListComponent, outlet: 'rightrouter'}, 
    {path: 'addadmin', component: AddAdminComponent, outlet: 'rightrouter'},
    {path: 'executor', component: ExecutorComponent, outlet: 'rightrouter'},
    {path: 'seuil', component: SeuilComponent, outlet: 'rightrouter'}
  ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    AccueilComponent, 
    NewsComponent, 
    CommentsComponent, 
    TestComponent, 
    FavorisComponent, 
    PaginationComponent, 
    BadgeComponent, 
    UsersAdminComponent, UserListComponent, AddAdminComponent, ExecutorComponent, SeuilComponent,
  ],
  imports: [
    BrowserModule,
    FacebookModule.forRoot(), 
    RouterModule.forRoot(routes),
    HttpModule, 
    FormsModule
  ],
  providers: [FbService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
