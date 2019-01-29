import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';
import {HomeContentComponent} from './home-content/home-content.component';
import {CompletedSurveysComponent} from "./completed-surveys/completed-surveys.component";

const appRouter: Routes = [
  { path: '', component: LoginFormComponent},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard], children: [
      {path: '', component: HomeContentComponent},
      {path: 'completed-surveys', component: CompletedSurveysComponent}
    ]},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
