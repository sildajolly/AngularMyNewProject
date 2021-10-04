import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Emitters } from '../emitters/emitters';
import { UserService } from '../services/user.service';
// import {Cookie} from 'ng2-cookies/ng2-cookies';
import { getAllUsers,getUserbyId } from './../store/user.selectors';
import { userActionTypes } from './../store/user.actions';
import { AppState } from './../store/reducers/index';
import { select, Store } from '@ngrx/store';
import { loadUsers } from './../store/user.actions';
import { UserModel } from '../user.model';
import { Observable } from 'rxjs';
import * as fromUser from "../store/user.reducers";
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  userr:any;
  user:UserModel | undefined;
  // userItem: any;
  flag: boolean;
  //userdata: UserModel | undefined;
  // user$:Observable<UserModel>;

  userdata:any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthServiceService,
    private userService:UserService,
    private store: Store<AppState>


  ) { }

  ngOnInit(): void {
    let role = localStorage.getItem("Role")||'';
    if(role=='User'){
             this.getUserById();
             
           
        }else if(role=='Admin') {
          this.router.navigate(['/login']);
      
        }
    
    // this.checkToken();
  }
 



  // async checkToken() {
  //   // let accesstoken = Cookie.get('accesstoken');
  //   // let refreshtoken = Cookie.get('refreshtoken');
  //   let accesstoken =localStorage.getItem("accesstoken")||''; 
  //   let refreshtoken = localStorage.getItem("refreshtoken")||''; 
  //   let role = localStorage.getItem("Role")||''; 
  //   accesstoken = await this.isAccessValid(accesstoken, refreshtoken);
  //   if (accesstoken && role=='User') {
  //       this.getUserById();
  //   } else {
  //       this.router.navigate(['/login']);
  //   }
  // }


  // async isAccessValid(accesstoken: string, refreshtoken: string) {
  //   if (!refreshtoken) return null;
  //   if (!accesstoken) {
  //       const result: any = await this.renewAccessToken(refreshtoken);
  //       return result['access'];
  //   }
  //   return accesstoken;
  // } 
  // renewAccessToken(refreshtoken: string) {
  //   // const id = Cookie.get('userId');
  //   let id = localStorage.getItem("userId")||'';
  //   // let accessToken = null;
  //   let user = {
  //       refreshtoken: refreshtoken,
  //       userid: id

  //   }

  //   return new Promise((resolve, reject) => {
  //       this.http.post('http://localhost:3000/api/renewAccessToken', user)
  //           .toPromise().then((res:any) => {
            
  //             localStorage.setItem('accesstoken', res['access']);
  //               resolve(res);
  //           })
  //           .catch(err => reject(err))
  //   })
  // }

  getUserById(){

    // let role = localStorage.getItem("Role")||'';
    //     if(role!='User'){
    //             this.router.navigate(['/login']);
    //         }

     
            
    let userId=this.route.snapshot.params['userid'];
    console.log(userId);

    // this.store.select('users')
    //   .subscribe((data) => {
    //      const user = data.entities
    //      console.log("uuu",user)

    //   Object.keys(user).forEach((userItem)=>{
    //     console.log("iii",user[userItem])
    //     if(user[userItem]!.user_id==id){
    //       console.log('t')
    //       this.flag=true;
    //       this.userdata=user[userItem]
    //       console.log('p',this.userdata)
    //     }
        
    //   })
      

    // });
//...........................................
   



    if (this.store) {
      this.userdata = this.store.select(getUserbyId);
     
      
      // this.userdata =  this.store.dispatch(userActionTypes.loadUser({userId}));
      console.log('op',this.userdata)
      this.userdata.subscribe((data: any) => {
        console.log(data);

        this.userdata=data;
        console.log('vvvv',this.userdata);
        if (!data) {
          this.store.dispatch(userActionTypes.loadUser({userId}));
        }
      });
    }

  
     
  
    // this.userdata= this.store.dispatch(userActionTypes.loadUser({userId}))
    // console.log('r',this.userdata)
  
  
  
  }
  editUser(id: any) {
    let userid =id;
   // let userid=this.route.snapshot.params['userid'];
    console.log('b',userid);
    this.router.navigate(['/editSingleUser', userid]);
}
  
}

