import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private firestore: Firestore) { }

  coleccionPacientes: CollectionReference<DocumentData> =
  collection(this.firestore, 'pacientes');

  async traerPacientes()
  {
    const observable = collectionData(this.coleccionPacientes);

    return observable;
  }

  guardar(repart: Paciente)
  {
    const documento = doc(this.coleccionPacientes);
    const id = documento.id;
    return setDoc(documento,
      {
        id: id,
        nombre: repart.nombre,
        apellido: repart.apellido,
        edad: repart.edad,
        dni: repart.dni,
        obraSocial: repart.obraSocial,
        mail: repart.mail,
        clave: repart.clave,
        imagenUno: repart.imagenUno,
        imagenDos: repart.imagenDos
      });
  }

  async traerEmail(email: string)
  {
    const q = query(collection(this.firestore, 'pacientes'), where('mail','==',email));
    const querySnapshot = await getDocs(q);
    const resultado = new Array<any>();

    querySnapshot.forEach((doc)=>
      {
        resultado.push(doc.data());
      });
    return resultado;
  }
}
