import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/models/especialistas';
import { AuthService } from 'src/app/service/auth.service';
import { EspecialidadesService } from 'src/app/service/especialidades.service';
import { EspecialistasService } from 'src/app/service/especialistas.service';
import { confirmarClave } from 'src/app/validacion/validaciones';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.css']
})
export class EspecialistaComponent implements OnInit
{
  form!: FormGroup;
  siteKey: string;
  listaEspecialidades: any;
  suscripcion!: Subscription;

  constructor(
  private especialistasService: EspecialistasService,
  private toastr: ToastrService,
  private authService: AuthService,
  private especialidadesService: EspecialidadesService)
  {
    this.siteKey = '6LdW-rAmAAAAAEMemeOB8Oz7ARPcetAoxkJxLdpx';
  }

  async ngOnInit()
  {
    this.form = new FormGroup(
    {
      nombre: new FormControl("", [Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(2), Validators.required]),
      apellido: new FormControl("", [Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(2), Validators.required]),
      edad: new FormControl('', [Validators.min(18), Validators.max(100), Validators.required]),
      dni: new FormControl('', [Validators.min(5), Validators.required]),
      clave: new FormControl("", [Validators.minLength(6), Validators.required]),
      repiteClave: new FormControl("", ),
      email: new FormControl("",[Validators.email, Validators.required]),
      recaptcha: new FormControl('', Validators.required)

    }, [Validators.required, confirmarClave()]);

    this.especialidadesService.traerEspecialidades()
    .then((data)=>
    {
      this.listaEspecialidades = data;
    })
  }

  onElegirEspecialidad($event: any)
  {
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    this.listaEspecialidades = this.listaEspecialidades.map((d:any)=>
    {
      if(d.id == id)
      {
        d.select = isChecked;
        return d;
      }
      return d;
    });
    console.log(this.listaEspecialidades);
  }

  guardar()
  {
    if(this.form.valid)
    {

      const especialidades = this.listaEspecialidades.filter((d:any)=>
      {
        if(d.select)
        {
          d.valor = true;
          return d;
        }
      })

      const especialista = new Especialista('0',
      this.nombre!.value,
      this.apellido!.value,
      this.email!.value,
      especialidades,
      this.edad!.value,
      this.dni!.value,
      this.clave!.value,
      ' ',
      'Deshabilitado'
      );
      console.log(especialista);

      this.authService.registro(especialista.mail, especialista.clave)
      .then(()=>
      {
        this.toastr.info('Verifica tu email para poder continuar!.', `Bienvenidooo`,
        {
          tapToDismiss: true,
          progressBar: true,
          progressAnimation:'increasing',
          payload:true,
          positionClass: 'toast-top-right'

        });
        this.authService.enviarEmailVerificacion();
        this.authService.logout();
        this.especialistasService.guardar(especialista);
      })
      .catch((err)=>
        {
          this.toastr.error(`${err}`, `Error.`,
          {
            tapToDismiss: true,
            progressBar: true,
            progressAnimation:'decreasing',
            closeButton: true,
            payload:true,
            positionClass: 'toast-top-right'
          });
        }
      );

    }
    else
    {
      this.toastr.warning('Complete correctamente los campos', `Atención!.`,
      {
        tapToDismiss: true,
        progressBar: true,
        progressAnimation:'decreasing',
        closeButton: true,
        payload:true,
        positionClass: 'toast-top-right'
      });
    }
  }

  async cargoImagen($event: any, imagen: number)
  {
    /*const file = $event.target.files[0];
    const path = 'img' + Date.now() + Math.random() * 10;
    const reference = this.*/
  }

  get nombre()
  {
    return this.form.get('nombre');
  }
  get apellido()
  {
    return this.form.get('apellido');
  }
  get edad()
  {
    return this.form.get('edad');
  }
  get dni()
  {
    return this.form.get('dni');
  }
  get clave()
  {
    return this.form.get('clave');
  }
  get repiteClave()
  {
    return this.form.get('repiteClave');
  }
  get email()
  {
    return this.form.get('email');
  }
  get recaptcha()
  {
    return this.form.get('recaptcha');
  }
}
