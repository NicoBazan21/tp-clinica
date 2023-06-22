import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Especialidad } from '../models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor(private firestore: Firestore) { }

  coleccionEspecialidades: CollectionReference<DocumentData> = collection(
    this.firestore, 'especialidades'
    );

  async traerEspecialidades()
  {
    return new Promise((resolve,rejected)=>
    {
      const observable = collectionData(this.coleccionEspecialidades).subscribe((data)=>
      {
        resolve(data);
      });
    })
  }

  guardar(repart: Especialidad)
  {
    const documento = doc(this.coleccionEspecialidades);
    const id = documento.id;
    return setDoc(documento,
      {
        id: id,
        especialidad: repart.especialidad,
        valor: repart.valor
      });
  }
}
