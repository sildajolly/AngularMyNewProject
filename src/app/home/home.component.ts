import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const loginStatus = localStorage.getItem('loginStatus')||'';
    if(loginStatus=='true'){
      console.log('loggedin');
      let role = localStorage.getItem("Role")||'';
      let id=localStorage.getItem('userId');
      if(role=='Admin'){
        this.router.navigate(['/adminhome']);  
      }else if(role=='User'){
        this.router.navigate(['/userhome',id]); 
      }else{
        this.router.navigate(['/login']);
      }

    }else{
      console.log('Loggedout')
      this.router.navigate(['/login']);

    }

  }

}
