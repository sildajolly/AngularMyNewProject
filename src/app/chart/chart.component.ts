import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { roles } from 'roles';
import { DxPieChartModule } from 'devextreme-angular';
import { UserService } from '../services/user.service';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
//assign features of roles model to this variable
  usersCount: roles[];   //datasource

  constructor(
    private http:HttpClient,
    private router:Router,
    private userService:UserService,
    private authService:AuthServiceService
  ) { }


  ngOnInit(): void {
    this.checkToken();
    // this.getChartData();
  
  }
   checkToken(){
    const token =  this.authService.getToken();
    console.log('check',token);
    if(token)
    {
      this.getChartData();
    } 
    else{

      this.router.navigate(['/login']);
    }
  }
  getChartData(){
    this.userService.getChartData().toPromise().then((data:any)=>{ 
    // this.http.get('http://localhost:3000/api/getAdminUserCount').toPromise().then((data:any)=>{
     console.log('user_count', data.usercount);
     console.log('admin_count', data.admincount);
     let role_count : roles[] = [{
      userrole : "Admin",
      percentage : data.admincount
     },
     {
      userrole : "User",
      percentage : data.usercount
     }

     ]
     this.usersCount = role_count;
  //   this.userdata  = [
  //     { user: "User", count: data.usercount},
  //     { user: "Admin", count: data.admincount}
     
  // ];
  
    });
  }

}

