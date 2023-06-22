import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit
{
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;

  constructor(private toastrService: ToastrService) {}

  ngOnInit()
  {
    this.toastrService.overlayContainer = this.toastContainer;
  }

  onMouseEnter(nombre: string)
  {
    this.toastrService.info(nombre, '',
    {
      positionClass: 'toast-bottom-center',
      easeTime: 100,
      timeOut: 1000
    });
  }

  onMouseLeave()
  {
    this.toastrService.clear();
  }
}
