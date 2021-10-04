import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authenticated = false;
  constructor(
    private http: HttpClient,
    private authService:AuthServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {

    Emitters.authEmitter.subscribe(
      (auth:boolean)=>{
        this.authenticated=auth;

      }
    );
  
  }
  logout(){
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  
  }

}
