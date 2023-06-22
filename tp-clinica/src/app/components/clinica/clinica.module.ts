import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicaRoutingModule } from './clinica-routing.module';
import { ClinicaComponent } from './clinica.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [
    ClinicaComponent,
    MiPerfilComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    ClinicaRoutingModule
  ]
})
export class ClinicaModule { }
