import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService,
              private router: Router) { }

  canActivate():boolean{
    let role = localStorage.getItem("Role")||'';
    if(role='Admin'){
         this.router.navigate(['/adminhome']);    
         return true;
      //   console.log('wwww')
      // let id=localStorage.getItem('userId')
      // this.router.navigate(['/userhome',id]);    
      //    return true;
    }
    else if(role='User'){
      console.log('wwww')
      let id=localStorage.getItem('userId')
      this.router.navigate(['/userhome',id]);    
         return true;
    }
    else {
    
         this.router.navigate(['/login']);
         return false;
      }
  }
   
}