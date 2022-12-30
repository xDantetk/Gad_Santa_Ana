import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {take} from "rxjs";
import {Mensaje} from "../models/Mensaje";

@Injectable({
  providedIn: 'root'
})
export class BandejaService {

  constructor(private afs: AngularFirestore) {
  }

  getAllMessages() {
    return this.afs.collection('bandeja').valueChanges().pipe(
      take(1)
    );
  }

  saveMessage(mensaje: Mensaje) {
    mensaje.id = Date.now();
    return this.afs.collection('bandeja').doc(mensaje.id.toString()).set(mensaje);
  }
}
