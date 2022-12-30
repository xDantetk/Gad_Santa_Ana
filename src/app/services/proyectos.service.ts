import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, take} from "rxjs";
import {Proyecto} from "../models/Proyecto";

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private afs: AngularFirestore) {
  }

  getAllProyectos() {
    return this.afs.collection('proyectos').valueChanges().pipe(
      take(1)
    );
  }

  getActiveProyectosByYear(year: number) {
    return this.afs.collection('proyectos', ref => ref
      .where('estado', '==', true)
      .where('anio', '==', year)).valueChanges()
      .pipe(
        take(1)
      );
  }

  getProyecto(id: number) {
    return this.afs.collection('proyectos').doc(id.toString()).get().pipe(
      map(resp => {
        return resp.data() as Proyecto;
      })
    );
  }

  saveProyecto(proyecto: Proyecto) {
    return this.afs.collection('proyectos').doc(proyecto.id.toString()).set(proyecto);
  }
}
