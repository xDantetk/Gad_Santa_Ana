import {Injectable} from '@angular/core';
import {map, take} from "rxjs";
import {SitioTuristico} from "../models/SitioTuristico";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class SitiosTuristicosService {

  constructor(private afs: AngularFirestore) {
  }

  getAllSitios() {
    return this.afs.collection('sitios-turisticos').valueChanges().pipe(
      take(1)
    );
  }

  getSitio(id: number) {
    return this.afs.collection('sitios-turisticos').doc(id.toString()).get().pipe(
      map(resp => {
        return resp.data() as SitioTuristico;
      })
    );
  }

  saveSitio(sitio: SitioTuristico) {
    return this.afs.collection('sitios-turisticos').doc(sitio.id.toString()).set(sitio);
  }

}
