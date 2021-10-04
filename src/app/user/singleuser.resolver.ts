import { areUsersLoaded } from '.././store/user.selectors';
// import { loadUser, userLoaded ,loadUsers} from '.././store/user.actions';
import { loadUser,loadUsers} from '.././store/user.actions';
import { AppState } from '.././store/reducers/index';
import { UserModel } from '../user.model';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import { userActionTypes } from './../store/user.actions';
import { ActivatedRoute ,ParamMap} from '@angular/router';
 
@Injectable()
export class SingleUserResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>,
    private route: ActivatedRoute,
    ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  
   let userId=route.params['userid'];
  
             
 
    return this.store
    .pipe(
        select(areUsersLoaded),
        tap((userLoaded) => {
          if (!userLoaded) {
              console.log('yy');
             
              console.log('id',userId)
          
              this.store.dispatch(loadUser({userId}));
  
              
          }

        }),
        filter(usersLoaded => usersLoaded),
        first()//return frst element of a set
    );
  }
}




