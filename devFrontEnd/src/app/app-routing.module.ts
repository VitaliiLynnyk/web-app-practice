import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginFormComponent} from './login-form/login-form.component';
import {AppWrapperComponent} from './app-wrapper/app-wrapper.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeContentComponent} from './home-content/home-content.component';
import {SurveysListComponent} from './surveys-list/surveys-list.component';
import {CompletedSurveyInfoComponent} from './completed-survey-info/completed-survey-info.component';
import {CreateNewSurveyComponent} from './create-new-survey/create-new-survey.component';

import {AuthGuard} from './guards/auth.guard';

const appRouter: Routes = [
    {path: '', component: LoginFormComponent},
    {
        path: 'home', component: AppWrapperComponent, canActivate: [AuthGuard], children: [
            {path: '', component: HomeContentComponent},
            {path: 'surveys-list', component: SurveysListComponent},
            {path: 'survey-info', component: CompletedSurveyInfoComponent},
            {path: 'create-survey', component: CreateNewSurveyComponent}
        ]
    },
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRouter)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
