import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EspecialistaComponent } from './especialista/especialista.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ToastContainerDirective } from 'ngx-toastr';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [
    RegistroComponent,
    PacienteComponent,
    EspecialistaComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastContainerDirective,
    NgxCaptchaModule
  ]
})
export class RegistroModule { }
