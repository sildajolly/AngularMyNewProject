import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { RequestResetComponent } from './password/request-reset/request-reset.component';
import { ResponseResetComponent } from './password/response-reset/response-reset.component';
import { ChartComponent } from './chart/chart.component';
import { UserResolver } from './user/user.resolver';
import { EditsingleuserComponent } from './editsingleuser/editsingleuser.component';
 import { SingleUserResolver } from './user/singleuser.resolver';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  // {path:'',component:HomeComponent,canActivate: [AuthGuard]},
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  //{path:'userhome/:userid',component:UserdashboardComponent},
  {path:'userhome/:userid',component:UserdashboardComponent,resolve: {users: SingleUserResolver}},
  {path:'adminhome',component:AdmindashboardComponent },
  {path:'createuser',component:CreateuserComponent},
  {path:'edituser/:id',component:EdituserComponent},
  {path: 'request-reset',component:RequestResetComponent},
  {path: 'resetPassword',component:ResponseResetComponent},
  {path: 'chart',component:ChartComponent},
  {path: 'editSingleUser/:id',component:EditsingleuserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
