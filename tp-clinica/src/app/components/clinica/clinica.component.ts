import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { EspecialistasService } from 'src/app/service/especialistas.service';
import { PacientesService } from 'src/app/service/pacientes.service';

@Component({
  selector: 'app-clinica',
  templateUrl: './clinica.component.html',
  styleUrls: ['./clinica.component.css']
})
export class ClinicaComponent implements OnInit
{
  mail = '';
  user!: any;
  rol = '';

  constructor(private authService: AuthService,
    private pacientesService: PacientesService,
    private especialistasService: EspecialistasService,
    private adminService: AdminService)
    {

    }

  async ngOnInit()
  {
    this.mail = this.authService.obtenerSesion().currentUser!.email!;
    const a = await this.pacientesService.traerEmail(this.mail);
    const b = await this.adminService.traerEmail(this.mail);
    const c = await this.especialistasService.traerEmail(this.mail);
    if(a.length != 0)
    {
      this.rol = 'paciente';
      this.user = a;
    }
    if(b.length != 0)
    {
      this.rol = 'admin';
      this.user = b;
    }
    if(c.length != 0)
    {
      this.rol = 'especialista';
      this.user = c;
    }

    console.log(this.user);

  }
}

