import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, take} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs: AngularFirestore) {
  }

  getAllUsers() {
    return this.afs.collection('users').valueChanges().pipe(
      take(1)
    );
  }

  getUser(uid: string) {
    return this.afs.collection('users').doc(uid).get().pipe(
      map(resp => {
        return resp.data() as User;
      })
    );
  }

  saveUser(user: User) {
    return this.afs.collection('users').doc(user.uid).set(user);
  }

}
