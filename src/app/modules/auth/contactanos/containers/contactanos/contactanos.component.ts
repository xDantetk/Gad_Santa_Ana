import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Mensaje} from "../../../../../models/Mensaje";
import {BandejaService} from "../../../../../services/bandeja.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss']
})
export class ContactanosComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(private _fb: FormBuilder,
              private _bandejaService: BandejaService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get getNameControl() {
    return this.contactForm.get('name');
  }

  get getEmailControl() {
    return this.contactForm.get('email');
  }

  get getPhoneControl() {
    return this.contactForm.get('phone');
  }

  get getMessageControl() {
    return this.contactForm.get('message');
  }

  sendEmail() {
    if (!this.contactForm.valid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const messageToSave: Mensaje = {
      ...this.contactForm.value,
      date: new Date().toLocaleString()
    }

    this._bandejaService.saveMessage(messageToSave).then(resp => {
      Swal.fire({
        title: 'Exito',
        text: 'Mensaje enviado correctamente',
        icon: 'success'
      });
      this.contactForm.reset();
    }, error => {
      Swal.fire({
        title: 'Ok',
        text: 'Error al enviar el mensaje',
        icon: 'error'
      });
    })
  }


}
