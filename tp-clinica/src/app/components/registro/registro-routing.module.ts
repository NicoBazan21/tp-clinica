import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro.component';
import { PacienteComponent } from './paciente/paciente.component';
import { EspecialistaComponent } from './especialista/especialista.component';

const routes: Routes = [
  { path: '', component: RegistroComponent },
  { path: 'paciente', component: PacienteComponent},
  { path: 'especialista', component: EspecialistaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
