import { Component, OnInit } from '@angular/core';
import { EspecialistasService } from 'src/app/service/especialistas.service';
import { PacientesService } from 'src/app/service/pacientes.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit
{
  lista =
  [
    {
      id: '1',
      nombre: 'nico'
    },
    {
      id: '2',
      nombre: 'delia'
    }
  ]

  listaUsuarios!: any;
  listaEspecialistas!: any;
  constructor(
    private pacientesService: PacientesService,
    private especialistasService: EspecialistasService)
    {

    }

  ngOnInit()
  {
    this.pacientesService.traerPacientes().then((promise)=>
    {
      promise.subscribe((data)=>
      {
        this.listaUsuarios = data;
      })
    })

    this.especialistasService.traerEspecialistas().then((promise)=>
    {
      promise.subscribe((data)=>
      {
        this.listaEspecialistas = data;
      })
    })
  }

  cambiarAcceso()
  {

  }
}
