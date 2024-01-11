import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth-guard.service.service';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full',
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'home',
    loadChildren:() => import('./views/home/home.module').then(
      (m) => m.HomeModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path:'entrada',
    loadChildren:() => import('./views/entrada/entrada.module').then(
      (m) => m.EntradaModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path:'classificacao',
    loadChildren:() => import('./views/classificacao/classificacao.module').then(
      (m) => m.ClassificacaoModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path:'pesagem',
    loadChildren:() => import('./views/pesagem/pesagem.module').then(
      (m) => m.PesagemModule
    ),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
