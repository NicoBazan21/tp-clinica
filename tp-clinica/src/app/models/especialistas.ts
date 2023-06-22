export class Especialista
{
  id: string;
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  mail: string;
  especialidades: string[];
  acceso: string;
  clave: string;
  imagenUno: string;

  constructor(id: string,
    nombre: string,
    apellido: string,
    mail: string,
    especialidades: string[],
    edad: number,
    dni: number,
    clave: string,
    imagenUno: string,
    acceso: string)
  {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.mail = mail;
    this.especialidades = especialidades;
    this.edad = edad;
    this.dni = dni;
    this.clave = clave;
    this.imagenUno = imagenUno;
    this.acceso = acceso;
  }
}
