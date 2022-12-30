import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../../../services/users.service";
import {User} from "../../../../../models/User";
import {AuthService} from "../../../../../services/auth.service";
import Swal from "sweetalert2";
import {setLoadingSpinner} from "../../../../../store/shared/shared.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  sub!: Subscription;
  userForm!: FormGroup;
  isEdit = false;

  constructor(private route: ActivatedRoute,
              private _usersService: UsersService,
              private _authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private store: Store<AppState>) {
    this.initUserForm();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(({id}) => {
      if (id) {
        this.store.dispatch(setLoadingSpinner({status: true}));
        this.isEdit = true;
        this.getUserByUid(id);
      }
    })
  }

  getUserByUid(uid: string) {
    this._usersService.getUser(uid).subscribe((user: User) => {
      this.userForm.patchValue({
        uid: user.uid,
        name: user.name,
        email: user.email,
        password: user.password,
        rol: user.rol
      });
      this.store.dispatch(setLoadingSpinner({status: false}));
    });
  }

  initUserForm() {
    this.userForm = this.fb.group({
      uid: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rol: ['', Validators.required]
    });
  }

  get getNameControl() {
    return this.userForm.get('name');
  }

  get getEmailControl() {
    return this.userForm.get('email');
  }

  get getPasswordControl() {
    return this.userForm.get('password');
  }

  get getRolControl() {
    return this.userForm.get('rol');
  }

  saveForm() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const {email, password} = this.userForm.value;

    Swal.fire({
      title: 'Atención',
      text: 'Seguro que desea cambiar la información',
      icon: 'info',
      showCancelButton: true,
      showConfirmButton: true
    }).then(result => {
      if (result.isConfirmed) {
        if (this.isEdit) {
          const userToSave: User = {
            ...this.userForm.value
          };

          this._usersService.saveUser(userToSave).then(() => {
            this.router.navigateByUrl('/admin/users');
          });
        } else {
          this._authService.createUser(email, password).then(resp => {
            if (resp.user) {
              const user: User = {
                uid: resp.user.uid,
                name: this.userForm.value['name'],
                password: this.userForm.value['password'],
                email: this.userForm.value['email'],
                rol: this.userForm.value['rol']
              };

              this._usersService.saveUser(user).then(() => {
                this.router.navigateByUrl('/admin/users');
              });
            }
          })
        }

      }
    });
  }

}
