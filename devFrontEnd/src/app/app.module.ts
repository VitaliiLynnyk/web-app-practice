import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {ClipboardModule} from 'ngx-clipboard';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {AppWrapperComponent} from './app-wrapper/app-wrapper.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AlertCloseableComponent} from './alert-closeable/alert-closeable.component';
import {HomeContentComponent} from './home-content/home-content.component';
import {SurveysListComponent} from './surveys-list/surveys-list.component';
import {CompletedSurveyInfoComponent} from './completed-survey-info/completed-survey-info.component';
import {SurveyAnswerItemComponent} from './survey-answer-item/survey-answer-item.component';
import {CreateNewSurveyComponent} from './create-new-survey/create-new-survey.component';
import {SidebarMenuItemComponent} from './sidebar-menu-item/sidebar-menu-item.component';
import {UserSurveyPassComponent} from './user-survey-pass/user-survey-pass.component';

import {AuthService} from './services/auth.service';
import {AlertService} from './services/alert.service';
import {SurveysService} from './services/surveys.service';
import {UsersService} from './services/users.service';

import {AuthGuard} from './guards/auth.guard';
import {SurveyGuard} from './guards/survey.guard';
import { HomeStatisticItemComponent } from './home-statistic-item/home-statistic-item.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
        AppWrapperComponent,
        NotFoundComponent,
        AlertCloseableComponent,
        HomeContentComponent,
        SurveysListComponent,
        CompletedSurveyInfoComponent,
        SurveyAnswerItemComponent,
        CreateNewSurveyComponent,
        SidebarMenuItemComponent,
        UserSurveyPassComponent,
        HomeStatisticItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        NgHttpLoaderModule.forRoot(),
        ReactiveFormsModule,
        ClipboardModule
    ],
    providers: [
        AuthGuard,
        SurveyGuard,
        AuthService,
        AlertService,
        SurveysService,
        UsersService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
