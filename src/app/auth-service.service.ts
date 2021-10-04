import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
// import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppState } from '../app/store/reducers/index';
import { select, Store } from '@ngrx/store';
import { logoutAction } from '../app/store/user.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user$ = new BehaviorSubject(null);
  constructor(private http: HttpClient,
    private store: Store<AppState>,
    private router: Router,
  ) { 
   
  }

  login(data: any){
    console.log('ref', data);

    localStorage.setItem('refreshtoken', data.reftoken);
    localStorage.setItem('accesstoken', data.acctoken);
    localStorage.setItem('userId', data.userid);
    localStorage.setItem('Role', data.role);
    localStorage.setItem('loginStatus', 'true');



    // return this.http.post('http://localhost:3000/api/login', data);
  
  }
  // getToken()
  // {
   
  //   // return Cookie.get('accesstoken');
  //   let token = Cookie.get('accesstoken');
  //   let reftoken = Cookie.get('refreshtoken');
  //   return [token,reftoken];

  // }
   getToken()
  {
   
   
   return localStorage.getItem("refreshtoken")||''; 
    

  }
  
  
  logoutUser(){
    //logout api call
    this.store.dispatch(logoutAction());
    let refresh= localStorage.getItem("refreshtoken")||''; 
    this.http.delete(`http://localhost:3000/api/logout/${refresh}`).toPromise().then((data: any) => {
      localStorage.removeItem('accesstoken');
      localStorage.removeItem('refreshtoken');
      localStorage.removeItem('userId');
      localStorage.removeItem('Role');
      localStorage.setItem('loginStatus', 'false');
     })
    
    

    // return localStorage.removeItem('refreshtoken');
  }
  refreshToken(): Observable<{accessToken: string; refreshToken: string}> {
    const refreshToken = this.getToken();
    let id = localStorage.getItem("userId")||'';
    let user = {
      refreshtoken: refreshToken,
      userid: id

    }
    return this.http.post<{accessToken: string; refreshToken: string}>(
      `http://localhost:3000/api/renewAccessToken`, user).pipe(
       tap((response:any)=> {
        localStorage.setItem('accesstoken', response.access);
        // this.setToken('token', response.accessToken);
        // this.setToken('refreshToken', response.refreshToken);
       })
     );
  //   this.http.post('http://localhost:3000/api/renewAccessToken', user).toPromise().then((res:any) => {
  //     localStorage.setItem('accesstoken', res['access']);
  // })
    
   }
 
   


  
}


