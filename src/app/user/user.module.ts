import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from '.././services/user.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from '../store/user.reducers';
import { FormsModule } from '@angular/forms';
import { UserEffects } from '../store/user.effects';
// import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';

@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    //creates a dedicated slice (users) in the application state for the users module and attaches the reducers to it.
    StoreModule.forFeature('users', userReducer),
 
    //registers the effects in the user module state.
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [UserService],
  bootstrap: [],
  // exports: [AdmindashboardComponent ]
})
export class UserModule { }
