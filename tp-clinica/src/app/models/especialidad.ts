export class Especialidad
{
  id:string;
  especialidad: string;
  valor: boolean;

  constructor(id: string ,especialidad: string, valor: boolean)
  {
    this.id = id;
    this.especialidad = especialidad;
    this.valor = valor;
  }
}
