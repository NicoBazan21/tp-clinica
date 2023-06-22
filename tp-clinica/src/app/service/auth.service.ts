import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { getAuth, sendEmailVerification } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sesion!: any;

  constructor(private auth: Auth)
  {
  }

  async enviarEmailVerificacion()
  {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser!);
  }

  registro(email:string , pass: string)
  {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  login(email: string, pass: string)
  {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  async logout()
  {
    await signOut(this.auth);
    console.log("Ya desloguee");
  }

  obtenerSesion()
  {
    return getAuth();
  }

  suscribirSesion()
  {
    return authState(this.auth);
  }

}
