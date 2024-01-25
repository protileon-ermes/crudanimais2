import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/animais/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'registrar',
    loadChildren: () => import('./view/animais/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./view/animais/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./view/usuarios/sign-up/signup.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./view/usuarios/sign-in/signin.module').then( m => m.SignInPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
