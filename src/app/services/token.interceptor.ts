
import {Injectable} from '@angular/core';

import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpClient
} from '@angular/common/http';
import {AuthServiceService} from '../auth-service.service';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    //alert: boolean = false;
    private refreshingInProgress: boolean;
    private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null!);

    constructor(private authService: AuthServiceService,
                private router: Router,
                private http: HttpClient,) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // const accessToken = this.authService.getToken()|| '{}';
        const accessToken = localStorage.getItem("accesstoken") || '';
        req = this.addAuthorizationHeader(req, accessToken)
        return next.handle(req).pipe(
            catchError(err => {
                // in case of 403 http error
                if (err instanceof HttpErrorResponse && err.status === 403) {
                    // get refresh tokens
                    const refreshToken = this.authService.getToken();
                    // if there are tokens then send access token request
                    console.log(refreshToken)
                    if (refreshToken) {
                        return this.refreshToken(req, next);
                    }
                    // otherwise logout and redirect to login page
                    return this.logoutAndRedirect(err);
                }

                // in case of 404 http error (refresh token failed)
                if (err instanceof HttpErrorResponse && err.status === 404) {
                    // logout and redirect to login page
                    return this.logoutAndRedirect(err);
                }
                // if (err instanceof HttpErrorResponse && err.status === 408) {
                //    this.alert=true;
                // }
                // if error has status neither 404 nor 403 then just return this error
                return throwError(err);
            })
        );
    }

    private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
        if (token) {
            console.log('interceptor running')
            return request.clone({setHeaders: {authorization: `Bearer ${token}`}});
        }

        return request;

    }

    private logoutAndRedirect(err: HttpErrorResponse): Observable<HttpEvent<any>> {
        // this.authService.logoutUser();
        this.router.navigateByUrl('/login');

        return throwError(err);
    }

    private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!this.refreshingInProgress) {
            this.refreshingInProgress = true;
            this.accessTokenSubject.next(null!);

            // requesting new token
          return this.authService.refreshToken().pipe(
                switchMap((res: any) => {
                    this.refreshingInProgress = false;
                    this.accessTokenSubject.next(res.access);
                    // repeat failed request with new token
                    return next.handle(this.addAuthorizationHeader(request, res.access));
                })

            );
         

        } 
      
        else {
            // wait while getting new token
            return this.accessTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => {
                    // repeat failed request with new token
                    return next.handle(this.addAuthorizationHeader(request, token));
                }));
        }
    
    }

    

}
































// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// import { AuthServiceService } from '../auth-service.service';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, filter, switchMap, take } from 'rxjs/operators';


// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor( private authService:AuthServiceService,
//     private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
//     // const accessToken = this.authService.getToken()|| '{}';
//     const accessToken = localStorage.getItem("accesstoken")||'';

//     return next.handle(this.addAuthorizationHeader(req, accessToken));
//   }

//   private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
//     if (token) {
//         console.log('interceptor running')
//       return request.clone({setHeaders: {authorization: `Bearer ${token}`}});
//     }

//     return request;
    
//   }
 
  
// }








