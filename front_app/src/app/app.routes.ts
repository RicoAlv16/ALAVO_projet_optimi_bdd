import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'parties-plans/home',
    pathMatch: 'full',
  },
  {
    path: 'parties-plans/home',
    title: 'Parties Plans home page',
    component: HomePageComponent,
  },
  {
    path: 'parties-plans/login',
    title: 'Parties Plans login page',
    component: LoginComponent,
  },
  {
    path: 'parties-plans/signup',
    title: 'Parties Plans login page',
    component: SignupComponent,
  },
  {
    path: '404-not-found',
    title: 'Parties Plans not found page',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '404-not-found',
    pathMatch: 'full',
  },
];
