import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromUser from "../user.reducers";
import { UserModel } from 'src/app/user.model';
import { environment } from '../../../environments/environment';

//AppState interface
export interface AppState {

users:fromUser.UserState;
//user:fromUser.UserState;

}

export const reducers: ActionReducerMap<AppState> = {
  users:fromUser.userReducer,
  //user:fromUser.userReducer

};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
