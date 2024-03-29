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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { BadgeComponent } from './badge/badge.component';
import { AuthService } from './Services/auth.service';
import { AuthGuardService } from './Services/auth-guard.service';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ExecutorComponent } from './executor/executor.component';
import { SeuilComponent } from './seuil/seuil.component';
import { InfluenceComponent } from './influence/influence.component';
import { RegressionComponent } from './regression/regression.component';
import { NewsAdminComponent } from './news-admin/news-admin.component';
import { SourceDataComponent } from './source-data/source-data.component';
import { ClassifyComponent } from './classify/classify.component';
import { TrackComponent } from './track/track.component';

const routes : Routes = [
  {path: '', component: LoginComponent}, 
  {path: 'accueil', component: AccueilComponent , canActivate: [AuthGuardService] ,children: [
    {path: 'news', component: NewsComponent, outlet: 'leftrouter'},
    {path: 'comments', component: CommentsComponent, outlet: 'rightrouter'},
    {path: 'favoris', component: FavorisComponent, outlet: 'leftrouter'},
    {path: 'comments/:id/:titre', component: CommentsComponent, outlet: 'rightrouter'},
    {path: 'badges', component: BadgeComponent, outlet: 'leftrouter'},
    {path: 'usersadmin', component: UsersAdminComponent, outlet: 'leftrouter'},
    {path: 'newsadmin', component: NewsAdminComponent, outlet: 'leftrouter'}, 
    {path: 'userlist', component: UserListComponent, outlet: 'rightrouter'}, 
    {path: 'addadmin', component: AddAdminComponent, outlet: 'rightrouter'},
    {path: 'executor', component: ExecutorComponent, outlet: 'rightrouter'},
    {path: 'seuil', component: SeuilComponent, outlet: 'rightrouter'},
    {path: 'influence', component: InfluenceComponent, outlet: 'rightrouter'},
    {path: 'regression', component: RegressionComponent, outlet: 'rightrouter'},
    {path: 'sourcedata', component: SourceDataComponent, outlet: 'rightrouter'},
    {path: 'classify', component: ClassifyComponent, outlet: 'rightrouter'},
    {path: 'track/:id/:titre', component: TrackComponent, outlet: 'rightrouter'}
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
    UsersAdminComponent, UserListComponent, AddAdminComponent, ExecutorComponent, SeuilComponent, InfluenceComponent, RegressionComponent, NewsAdminComponent, SourceDataComponent, ClassifyComponent, TrackComponent,
  ],
  imports: [
    BrowserModule,
    FacebookModule.forRoot(), 
    RouterModule.forRoot(routes),
    HttpModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [FbService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
