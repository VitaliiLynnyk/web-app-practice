import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AlertCloseableComponent } from './alert-closeable/alert-closeable.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { SurveysListComponent } from './surveys-list/surveys-list.component';

import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { SurveysService } from './services/surveys.service';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomePageComponent,
    NotFoundComponent,
    AlertCloseableComponent,
    HomeContentComponent,
    SurveysListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertService,
    SurveysService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
