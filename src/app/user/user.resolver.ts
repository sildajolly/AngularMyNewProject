import { areUsersLoaded } from '.././store/user.selectors';
import { loadUsers, usersLoaded } from '.././store/user.actions';
import { AppState } from '.././store/reducers/index';
import { UserModel } from '../user.model';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
   let limit = 3;
   let offset=0;
    return this.store
    .pipe(
        select(areUsersLoaded),
        tap((usersLoaded) => {
          if (!usersLoaded) {
              console.log('aaaaa');
              console.log('limit in store',limit)
        //  this.store.dispatch(loadUsers())
         
           this.store.dispatch(loadUsers({offset,limit}));
          }

        }),
        filter(usersLoaded => usersLoaded),
        first()//return frst element of a set
    );
  }
}



