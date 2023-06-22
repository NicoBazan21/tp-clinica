import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Especialista } from '../models/especialistas';

@Injectable({
  providedIn: 'root'
})

export class EspecialistasService {

  constructor(private firestore: Firestore) { }

  coleccionEspecialistas: CollectionReference<DocumentData> = collection(
    this.firestore, 'especialistas'
    );

  async traerEspecialistas()
  {
    const observable = collectionData(this.coleccionEspecialistas);

    return observable;
  }

  guardar(repart: Especialista)
  {
    const documento = doc(this.coleccionEspecialistas);
    const id = documento.id;
    return setDoc(documento,
      {
        id: id,
        nombre: repart.nombre,
        apellido: repart.apellido,
        edad: repart.edad,
        dni: repart.dni,
        especialidades: repart.especialidades,
        mail: repart.mail,
        clave: repart.clave,
        imagenUno: repart.imagenUno
      });
  }

  async traerEmail(email: string)
  {
    const q = query(collection(this.firestore, 'especialistas'), where('mail','==',email));
    const querySnapshot = await getDocs(q);
    const resultado = new Array<any>();

    querySnapshot.forEach((doc)=>
      {
        resultado.push(doc.data());
      });
    return resultado;
  }
}
