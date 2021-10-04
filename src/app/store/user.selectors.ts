
import { UserModel } from '.././user.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll,selectIds} from './user.reducers';
import { UserState} from './user.reducers';
 import { Dictionary } from '@ngrx/entity';

// export const userFeatureSelector1 = createFeatureSelector<UserState>('user');
export const userFeatureSelector = createFeatureSelector<UserState>('users');
export const getAllUsers = createSelector(
  userFeatureSelector,
  selectAll

);

export const areUsersLoaded = createSelector(
  userFeatureSelector,
  state => state.usersLoaded
);

// export const getUserbyId = createSelector(
//   selectBrandEntities,
//   (user:any, user_id:any) => user[user_id],
// )
export const getUserbyId = createSelector(
//  userFeatureSelector1,
  userFeatureSelector,
  selectAll,

);



// export const areUserLoaded = createSelector(
//   // userFeatureSelector1,
//   userFeatureSelector,
//   state => state.userLoaded
// );