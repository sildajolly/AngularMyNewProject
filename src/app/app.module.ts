import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { NavDashboardComponent } from './nav-dashboard/nav-dashboard.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { MatRadioModule} from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EdituserComponent } from './edituser/edituser.component';
import {MatSelectModule} from '@angular/material/select';
import { RequestResetComponent } from './password/request-reset/request-reset.component';
import { ResponseResetComponent } from './password/response-reset/response-reset.component';
import { ChartComponent } from './chart/chart.component';
import { DxPieChartModule } from 'devextreme-angular';
import { AuthServiceService } from './auth-service.service';
import { TokenInterceptor } from './services/token.interceptor';

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../../environments/environment';
import { environment } from '.././environments/environment';
import { UserResolver } from '../app/user/user.resolver';
import { SingleUserResolver } from '../app/user/singleuser.resolver';
import { EffectsModule } from '@ngrx/effects';
import { UserModule } from '../app/user/user.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { userReducer } from '../app/store/user.reducers';
import { UserEffects } from '../app/store/user.effects';
import { EditsingleuserComponent } from './editsingleuser/editsingleuser.component';
import { clearState } from '../app/store/user.reducers';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
//import { OrderByPipe } from '../../node_modules/ng-orderby-pipe';
import { MatTableModule } from '@angular/material/table';
import {NgxPaginationModule} from 'ngx-pagination';
import { AuthGuard } from './services/auth.guard';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

const routes = [
  {
    path: 'adminhome',
    component: AdmindashboardComponent,
    resolve: {
      users: UserResolver
    }
  },
  {
    path: 'userhome/:userid',
    component: UserdashboardComponent,
    resolve: {
      users: SingleUserResolver
    }
  },
  {path: 'createuser', component: CreateuserComponent},
  {path: '**', redirectTo: 'adminhome'}
];
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    AdmindashboardComponent,
    UserdashboardComponent,
    NavDashboardComponent,
    CreateuserComponent,
    EdituserComponent,
    RequestResetComponent,
    ResponseResetComponent,
    ChartComponent,
    EditsingleuserComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSortModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatTableModule,
    
   // FontAwesomeModule,
    NgbModule,
    MatSelectModule,
    DxPieChartModule,
    CommonModule,
    UserModule,
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {  metaReducers: [clearState],runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
    } }),
    // StoreModule.forRoot(reducers, { metaReducers , runtimeChecks}),
   // !environment.production ? StoreDevtoolsModule.instrument() : [],
      StoreDevtoolsModule.instrument({maxAge: 25}),
  
  ],
  providers: [AuthServiceService,UserResolver,SingleUserResolver,AuthGuard,
  {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true

  }
],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
