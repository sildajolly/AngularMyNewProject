import { UserModel } from '.././user.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on ,Action,ActionReducer, State} from '@ngrx/store';
import { userActionTypes, usersLoaded } from './user.actions';
import { LOGOUT } from '../store/user.actions';

//use EntityState to declare the interface for our users state.
export interface UserState extends EntityState<UserModel> {
// userLoaded: boolean;
 usersLoaded: boolean;


}

//create adapter to get some helper functions to set initial state.
export const adapter: EntityAdapter<UserModel> = createEntityAdapter<UserModel>({
  selectId: (user: UserModel) => user.user_id
 
  
})

export const initialState= adapter.getInitialState({

    usersLoaded: false
  //  userLoaded: false
   
});
//Logout
export function clearState(reducer:any) {
  console.log('logout running')
  return function (state:any, action:any) {

    if (action.type === LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const userReducer = createReducer(
  initialState,

  on(userActionTypes.usersLoaded, (state, action) => {
      console.log('reducer running');
      //addAll
      // console.log('state',state);
      // console.log('action',action);
      console.log('g',action.users)
    return adapter.setAll(
      action.users,
      {...state, usersLoaded: true}
    );
    
  }),

//   on(userActionTypes.userLoaded, (state, action) => {
//     console.log('reducer running2');
//     //addAll
//       console.log('state',state);
//       console.log('action',action)
//     return adapter.addOne(
//     action.user,
//     {...state,
//       // selectedUserId:action.user.user_id,
//       userLoaded: true}
//   );
// }),

  on(userActionTypes.createUser, (state, action) => {
    // console.log('state',state);
    // console.log('action',action);
    return adapter.addOne(action.user, state);
  }),

  on(userActionTypes.deleteUser, (state, action) => {
    return adapter.removeOne(action.userId, state);
  }),

  // on(userActionTypes.updateUser, (state, action) => {
  //   return adapter.updateOne(action.update, state);
  // })
  on(userActionTypes.updateUser, (state, { update }) => {
    console.log('reducer running');
    console.log('state',state)
    console.log(update)
    console.log(update.user_id)
    return adapter.updateOne({ id: update.user_id, changes: update }, state);
  }),
  on(userActionTypes.updateUserFail, (state, { error }) => {
    return {
      ...state,
      error
    };
  })

);

export const { selectAll, selectIds } = adapter.getSelectors();
// export const userFeatureSelector1 = createFeatureSelector<UserState>('user');
// export const getUserId = createSelector(
//   userFeatureSelector1,
//   (state:UserState) => state.selectedUserId
//   // selectAll
// );
// export const getUserById = createSelector(
//   userFeatureSelector1,
//   state=>state.entities[state.selectedUserId]
//   // selectAll
// );

// export const areUserLoaded = createSelector(
//   userFeatureSelector1,

//   state => state.userLoaded
// );
