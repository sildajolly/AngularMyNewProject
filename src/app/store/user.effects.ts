import { userActionTypes, usersLoaded, updateUser } from './user.actions';
import { UserService } from '.././services/user.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap ,switchMap, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../user.model';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { of } from "rxjs";

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.loadUsers),
      concatMap((action) => this.userService.getAllUsers(action.offset,action.limit)),
      map(users => userActionTypes.usersLoaded({users}))
    )
  );
  // loadUser$ = createEffect(() =>
 
  // this.actions$.pipe(
  //   ofType(userActionTypes.loadUser),
  //   concatMap((action) => this.userService.getUserById(action.userId)),
  //   map(user => userActionTypes.userLoaded({user}))
  // )
  // );
  loadUser$ = createEffect(() =>
 
  this.actions$.pipe(
    ofType(userActionTypes.loadUser),
    concatMap((action) => this.userService.getUserById(action.userId)),
    map(users => userActionTypes.usersLoaded({users}))
  )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.createUser),
      concatMap((action) => this.userService.createuser(action.user)),
      tap(() => this.router.navigateByUrl('/adminhome'))
    ),
    {dispatch: false}
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.deleteUser),
      concatMap((action) => this.userService.deleteuser(action.userId))
    ),
    {dispatch: false}
  );
  updateUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userActionTypes.updateUser),
    switchMap((action) => this.userService.updateuser(action.update.user_id, action.update).pipe(
      map((res: any) => {
        return userActionTypes.updateUserSuccess({
          user: res.data
        });
      }),
      catchError(error => {
        return of(
          userActionTypes.updateUserFail({
            error
          }),
        );
      })
    )
      )
    ),
    {dispatch: false}
  );

//   updateUser$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(userActionTypes.updateUser),
//       concatMap((action) => this.userService.updateuser(action.update.id, action.update.changes))
//     ),
//     {dispatch: false}
//   );


  constructor(private userService: UserService, private actions$: Actions, private router: Router) {}
}