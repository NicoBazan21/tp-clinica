import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  admin: Boolean = false;
  constructor(private firestore: Firestore) { }

  coleccionEspecialistas: CollectionReference<DocumentData> = collection(
    this.firestore, 'administradores'
    );

  async traerEmail(email: string)
  {
    const q = query(collection(this.firestore, 'administradores'), where('mail','==',email));
    const querySnapshot = await getDocs(q);
    const resultado = new Array<any>();

    querySnapshot.forEach((doc)=>
      {
        resultado.push(doc.data());
      });
    return resultado;
  }

}
