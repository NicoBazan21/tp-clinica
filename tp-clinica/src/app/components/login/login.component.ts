import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  siteKey: string;
  form!: FormGroup;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router)
  {
    this.siteKey = '6LdW-rAmAAAAAEMemeOB8Oz7ARPcetAoxkJxLdpx';
  }

  ngOnInit()
  {
    this.form = new FormGroup(
      {
        clave: new FormControl("", [Validators.minLength(4), Validators.required]),
        email: new FormControl("",[Validators.email, Validators.required]),
        recaptcha: new FormControl('',)

       }, [Validators.required]);
  }

  guardar()
  {
    if(this.form.valid)
    {
      this.authService.login(this.email!.value, this.clave!.value)
      .then((log)=>
      {
        if(log.user.emailVerified)
        {
          this.toastr.success('Bienvenido!.', `Iniciando sesion...`,
          {
            tapToDismiss: true,
            progressBar: true,
            progressAnimation:'increasing',
            payload:true,
            positionClass: 'toast-top-right'
          });

          this.router.navigate(['/clinica']);
        }
        else
        {
          this.toastr.warning('Su email no ha sido verificado todavía...\n Se ha enviado un nuevo email de verificacion', `Atención!`,
          {
            tapToDismiss: true,
            progressBar: true,
            progressAnimation:'increasing',
            payload:true,
            positionClass: 'toast-top-right'
          });
          this.authService.enviarEmailVerificacion();
        }
      })
      .catch(()=>
      {
        this.toastr.error('Credenciales incorrectas!.', `Error!`,
          {
            tapToDismiss: true,
            progressBar: true,
            progressAnimation:'increasing',
            payload:true,
            positionClass: 'toast-top-right'

          });
      })
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

  cargoImagen($event: any, number: number)
  {

  }

  get clave()
  {
    return this.form.get('clave');
  }
  get email()
  {
    return this.form.get('email');
  }
}
