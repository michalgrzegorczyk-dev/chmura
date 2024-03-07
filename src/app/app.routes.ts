import {Routes} from "@angular/router";
import {isAuthenticatedGuard} from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'cat-facts',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => import('./cat-facts/cat-facts.component'),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
