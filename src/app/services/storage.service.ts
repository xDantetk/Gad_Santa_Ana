import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {last, mergeMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) {
  }

  /**
   * upload file to firebase storage
   * @param filePath
   * @param file
   * */
  uploadFile(filePath: string, file: File | Blob): Promise<any> {
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task.snapshotChanges().pipe(
      last(),
      mergeMap(() => fileRef.getDownloadURL())
    ).toPromise();
  }

  removeFile(downloadUrl: string) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

}
