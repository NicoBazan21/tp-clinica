import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { AuthService } from 'src/app/service/auth.service';
import { PacientesService } from 'src/app/service/pacientes.service';
import { confirmarClave } from 'src/app/validacion/validaciones';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})

export class PacienteComponent implements OnInit
{
  form!: FormGroup;
  siteKey: string;
  resultado = new Array<any>();

  constructor(private pacientesService: PacientesService, private toastr: ToastrService,
  private authService: AuthService) {
    this.siteKey = '6LdW-rAmAAAAAEMemeOB8Oz7ARPcetAoxkJxLdpx';
  }

  ngOnInit(): void
  {
    this.form = new FormGroup(
    {
      nombre: new FormControl("", [Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(2), Validators.required]),
      apellido: new FormControl("", [Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(2), Validators.required]),
      edad: new FormControl('', [Validators.min(18), Validators.max(100), Validators.required]),
      dni: new FormControl('', [Validators.min(5), Validators.required]),
      obraSocial: new FormControl("", [Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(2), Validators.required]),
      clave: new FormControl("", [Validators.minLength(6), Validators.required]),
      repiteClave: new FormControl("", ),
      email: new FormControl("",[Validators.email, Validators.required]),
      recaptcha: new FormControl('', Validators.required)

     }, [Validators.required, confirmarClave()]);
  }


  guardar()
  {
    /*this.pacientesService.traerEmail('mami@gmail.com').then((query)=>
    {
      query.forEach((doc)=>
      {
        this.resultado.push(doc.data());
      });
      console.log(this.resultado);
    });*/

    if(this.form.valid)
    {
      const paciente = new Paciente('0',
      this.nombre!.value,
      this.apellido!.value,
      this.email!.value,
      this.obraSocial!.value,
      this.edad!.value,
      this.dni!.value,
      this.clave!.value,
      ' ',
      ' '
      );

      this.authService.registro(paciente.mail, paciente.clave)
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
        this.pacientesService.guardar(paciente);
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
  get obraSocial()
  {
    return this.form.get('obraSocial');
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
