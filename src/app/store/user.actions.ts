import { UserModel } from '.././user.model';
import { TotalModel } from '../services/total.model';
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';

export const LOGOUT = '[App] Logout';
export const logoutAction = createAction('[App] Logout');

export const loadUsers = createAction(
  '[Users List] Load Users via Service',
   props<{offset:number,limit: number,}>()
);

export const usersLoaded = createAction(
  '[Users Effect] Users Loaded Successfully',
  props<{users: UserModel[]}>()
);
// export const usersLoaded = createAction(
//   '[Users Effect] Users Loaded Successfully',
//   props<{users: UserModel[],total:TotalModel}>()
// );

export const loadUser = createAction(
  '[User List] Load User via Service',
   props<{userId: string}>()
);
// export const userLoaded = createAction(
//   '[User Effect] User Loaded Successfully',
//   props<{user: UserModel}>()
// );

export const createUser = createAction(
  '[Create User Component] Create User',
  //  props<{user: any}>()
  props<{user: UserModel}>()
);

export const deleteUser= createAction(
  '[Users List Operations] Delete User',
  props<{userId: string}>()
);

// export const updateUser = createAction(
//   '[Users List Operations] Update User',
//   props<{update: Update<UserModel>}>()
// );
export const updateUser = createAction(
  "[User] Update User",
  props<{ update: UserModel }>()
);

export const updateUserSuccess = createAction(
  "[User] Update User Success",
  props<{ user: UserModel }>()
);

export const updateUserFail = createAction(
  "[User] Update User Fail",
  props<{ error: Error | any }>()
);

export const userActionTypes = {
    loadUsers,
    loadUser,
    // userLoaded,
    usersLoaded,
    createUser,
    deleteUser,
    updateUser,
    updateUserSuccess,
    updateUserFail
    

};