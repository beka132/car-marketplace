import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listings',
  },
  {
    path: 'auth',
    loadComponent: () =>
      loadRemoteModule('auth', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'listings',
    loadComponent: () =>
      loadRemoteModule('car-listings', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'listings/:id',
    loadComponent: () =>
      loadRemoteModule('car-details', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      loadRemoteModule('user-dashboard', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'sell',
    loadComponent: () =>
      loadRemoteModule('sell-ad', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      loadRemoteModule('admin', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'chatbot',
    loadComponent: () =>
      loadRemoteModule('chatbot', './Component').then((m) => m.AppComponent),
  },
  {
    path: '**',
    redirectTo: 'listings',
  },
];

