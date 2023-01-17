import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {first} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public router: Router) {
    /*this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        // this.router.navigate(['admin', 'dashboard']);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });*/
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      let infoUser: User;

      // @ts-ignore
      const resp = await this.getUserByUid(result.user.uid);
      // @ts-ignore
      infoUser = resp.data();

      if (infoUser.estado) {
        localStorage.setItem('user', btoa(JSON.stringify(infoUser)));
        this.router.navigate(['admin', 'dashboard'])
      } else {
        alert("Usuario inactivo")
      }
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        alert('La contraseña no es válida o el usuario no tiene una contraseña');
      }
      if (error.code === 'auth/user-not-found') {
        alert('No hay registro de usuario correspondiente a este email. El usuario pudo haber sido eliminado');
      }
      if (error.code === 'auth/invalid-email') {
        alert('El email no tiene un formato válido.');
      }
      if (error.code === 'auth/too-many-requests') {
        alert('Atención, Demasiados intentos de inicio de sesión fallidos.');
      }
    }
  }

  /**
   * return the user info by uid
   * @param uid
   * */
  public getUserByUid(uid: string) {
    const result = this.afs.collection('users').doc(`${uid}`).get().toPromise();
    return result;
  }

  createUser(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password);
  }

  /**
   * return if user is authenticated or not
   * */
  async getAuthStatus() {
    let stateAuthentication = false;
    const currentUser = await this.afAuth.authState.pipe(first()).toPromise();

    if (currentUser) {
      stateAuthentication = true;
    } else {
      stateAuthentication = false;
    }

    return stateAuthentication;
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
