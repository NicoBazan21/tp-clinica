import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicaComponent } from './clinica.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: ClinicaComponent },
  { path: 'usuarios', component: UsuariosComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicaRoutingModule { }
