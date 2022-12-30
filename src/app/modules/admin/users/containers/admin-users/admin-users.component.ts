import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../../../../../models/User";
import {UsersService} from "../../../../../services/users.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";
import {setLoadingSpinner} from "../../../../../store/shared/shared.actions";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  subs!: Subscription;
  users: User[] = [];

  constructor(private _userService: UsersService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.subs = this._userService.getAllUsers().subscribe(users => {
      this.users = users as User[];
      this.store.dispatch(setLoadingSpinner({status: false}));
    })
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
