import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrls: ['./nav-dashboard.component.css']
})
export class NavDashboardComponent implements OnInit {

  constructor(
    private authService:AuthServiceService,
    private router:Router
  ) { 
  
  }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  
  }
}
