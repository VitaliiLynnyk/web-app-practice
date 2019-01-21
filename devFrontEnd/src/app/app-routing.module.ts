import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginFormComponent} from './login-form/login-form.component';
import {HomePageComponent} from './home-page/home-page.component';
import {NotFoundComponent} from './not-found/not-found.component';

const appRouter: Routes = [
  { path: '', component: LoginFormComponent},
  { path: 'home', component: HomePageComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
