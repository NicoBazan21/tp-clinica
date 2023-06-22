import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LogGuardGuard } from './guards/log-guard.guard';

const routes: Routes =
[
  {path: '', component: BienvenidaComponent},//predeterminado
  {path: 'login', component: LoginComponent},
  {path: 'register', loadChildren: () => import('./components/registro/registro.module').then(m => m.RegistroModule)},
  {path: 'clinica',
  loadChildren: () => import('./components/clinica/clinica.module').then(m => m.ClinicaModule),
  canActivate:[LogGuardGuard]},
  //{path: 'home', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
