import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'log',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.component').then( m => m.SplashComponent),
  },
  {
    path: 'chatA',
    loadComponent: () => import('./chat-a/chat-a.component').then( m => m.ChatAComponent),
  },
  {
    path: 'chatB',
    loadComponent: () => import('./chat-b/chat-b.component').then( m => m.ChatBComponent),
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
