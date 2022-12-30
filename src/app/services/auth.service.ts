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
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        // this.router.navigate(['admin', 'dashboard']);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['admin', 'dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
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
