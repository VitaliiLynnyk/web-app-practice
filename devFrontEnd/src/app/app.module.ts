import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AlertCloseableComponent } from './alert-closeable/alert-closeable.component';

import { LoginService } from './services/login.service';
import { AlertService } from './services/alert.service';
import { LogoutService } from './services/logout.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomePageComponent,
    NotFoundComponent,
    AlertCloseableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService,
    AlertService,
    LogoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
