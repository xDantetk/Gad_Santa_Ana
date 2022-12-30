import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, take} from "rxjs";
import {Emprendimiento} from "../models/Emprendimiento";

@Injectable({
  providedIn: 'root'
})
export class EmprendimientosService {

  constructor(private afs: AngularFirestore) {
  }

  getAllEmprendimientos() {
    return this.afs.collection('emprendimientos').valueChanges().pipe(
      take(1)
    );
  }

  getEmprendimientoByCategory(category: string) {
    return this.afs.collection('emprendimientos', ref => ref
      .where('categoria', '==', category)).valueChanges()
      .pipe(
        take(1)
      );
  }
  getEmprendimiento(id: number) {
    return this.afs.collection('emprendimientos').doc(id.toString()).get().pipe(
      map(resp => {
        return resp.data() as Emprendimiento;
      })
    );
  }

  saveEmpredimiento(emp: Emprendimiento) {
    return this.afs.collection('emprendimientos').doc(emp.id.toString()).set(emp);
  }
}
