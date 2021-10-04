import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  getChartData():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/getAdminUserCount`);
  }
  generateReport():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/generateReport`, {responseType: 'blob'});
  }
  login(user:object):Observable<object>{
    return this.http.post(`${this.baseUrl}/api/login`,user);
  }
  register(user:object):Observable<object>{
    return this.http.post(`${this.baseUrl}/api/register`,user);
  }

  // getAllUsers(): Observable<UserModel[]> {
  //   console.log('service running');
  //   return this.http.get<UserModel[]>(`${this.baseUrl}/api/getAllUsers`);
  // }
  getAllUsers(pageNo: number, limit: number) {
    console.log('service running');
    return this.http.get<UserModel[]>(`${this.baseUrl}/api/getAllUsers/${pageNo}/${limit}`);
  }
  getUserById(id:string):Observable<any>{
    console.log('service2 running');
    //no need to put bearer in header bcz interceptor is used
      return this.http.get(`${this.baseUrl}/api/getUserById/${id}`);
    }
  createuser(user:object):Observable<object>{
    //no need to put bearer in header bcz interceptor is used
    return this.http.post(`${this.baseUrl}/api/createuser`,user);
  }
  // createuser(user: UserModel): Observable<UserModel> {
  //   return this.http.post<UserModel>(`${this.baseUrl}/api/createuser`,user);
  // }
  deleteuser(userid:string):Observable<any>{
   //no need to put bearer in header bcz interceptor is used
    return this.http.delete(`${this.baseUrl}/api/deleteUser/${userid}`);
  }
  
  // deleteuser(userid: string): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/api/deleteUser/${userid}` + userId);
  // }
  getuser(id:string):Observable<any>{
  //no need to put bearer in header bcz interceptor is used
    return this.http.get(`${this.baseUrl}/api/getSingleUser/${id}`);
  }
//  updateuser(user:object):Observable<object>{
//    //no need to put bearer in header bcz interceptor is used
//     return this.http.post(`${this.baseUrl}/api/updateUser/`, user);
//   }
 updateuser(id: string,update:UserModel){
  console.log('service running');
   //no need to put bearer in header bcz interceptor is used
    return this.http.post(`${this.baseUrl}/api/updateUser/${id}`, update);
  }

}
