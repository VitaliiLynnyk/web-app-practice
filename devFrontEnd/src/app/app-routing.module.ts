import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { SurveysListComponent } from './surveys-list/surveys-list.component';
import { CompletedSurveyInfoComponent } from './completed-survey-info/completed-survey-info.component';

import { AuthGuard } from './guards/auth.guard';

const appRouter: Routes = [
  { path: '', component: LoginFormComponent},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard], children: [
      {path: '', component: HomeContentComponent},
      {path: 'surveys-list', component: SurveysListComponent},
      {path: 'survey-info', component: CompletedSurveyInfoComponent}
    ]},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
