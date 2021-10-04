
import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthServiceService} from '../auth-service.service';
import {EdituserComponent} from '../edituser/edituser.component';
import {Emitters} from '../emitters/emitters';
import {UserService} from '../services/user.service';
import {UserModel} from '../user.model';
import { Observable } from 'rxjs';
import { getAllUsers } from './../store/user.selectors';
import { userActionTypes } from './../store/user.actions';
import { AppState } from './../store/reducers/index';

import { select, Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { loadUsers } from './../store/user.actions';
import {map,filter} from 'rxjs/operators';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import * as fromReducer from '../store/user.reducers';
// import {Cookie} from 'ng2-cookies/ng2-cookies';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-admindashboard',
    templateUrl: './admindashboard.component.html',
    styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
    
   public users$: Observable<UserModel[]>;
    alert: boolean = false;
    usersdata: any = [];
    newWindow: Window | null;
    searchvalue:any;
    users: any= [];
    sortDir = 1;//1= 'ASE' -1= DSC
  /* pagination */
    p:number = 1;
    limit: number = 3;
    total: number;
    constructor(
        private http: HttpClient,
        private modalService: NgbModal,
        private router: Router,
        private authService: AuthServiceService,
        private userService: UserService,
        private store: Store<AppState>
       
        
    ) {
       
    }

    columns = ["User Id", "Name", "Email", "Phone Number", "Gender", "Role"];

    ngOnInit(): void {
      
        // this.checkToken();
        // this.getAllUsers();
        
        let role = localStorage.getItem("Role")||'';
        if(role=='Admin'){
          this.reLoadPage(this.p);
               
            }else if(role=='User') {
              this.router.navigate(['/login']);
            }
        
    }

    reLoadPage(p:number) {

        //  if (this.store) {
        //     this.users = this.store.select(getAllUsers);
        //     this.users.subscribe((result: any) => {
           
        //       console.log('a',result);
        //       this.users=result;
        //       // this.total=result.total[0].total;
        //       console.log(this.users)
             
        //     });
        //   }
     
    
        // if (this.store) {
        //     this.users = this.store.select(getAllUsers);
        //     this.users.subscribe((result: any) => {
           
        //       console.log('a',result);
        //       this.users=result;
        //       // this.total=result.total[0].total;
           
        //       // if (!data) {
              
        //       //   this.store.dispatch(loadUsers({limit,offset}));
        //       // }
        //     });
        //   }
          let pageNo=p;
          //let offset = (p - 1) * this.limit;
          this.userService.getAllUsers(pageNo, this.limit).subscribe(
          (result:any)=> {
            console.log('y',result)
            //this.users=result;
            this.users= result.data;
            this.total = result.total;
          //  this.total = result.total[0].total;
          
      })

  
    
    }
    //This method call on click page no.
    getPage(pageNo: number) {
      this.p = pageNo;
      this.reLoadPage(this.p);
    }

    editUser(user: UserModel) {
        let userid = user.user_id;
        this.router.navigate(['/edituser', userid]);
    }

    deleteUser(user: any) {
      
      
      //   let userId = user.user_id;
      //   this.store.dispatch(userActionTypes.deleteUser({userId}));
      //   this.alert = true;
      //  // this.reLoadPage(this.p);
      //  this.router.navigate(['/adminhome']);

          
        let userid = user.user_id;
        // no need to put bearer in header bcz interceptor is used
        this.userService.deleteuser(userid).toPromise().then((data: any) => {
         if(data.code==200){
                this.alert = true;
                console.log('bbbbb',this.p)
                this.reLoadPage(this.p);
         }
        });
    }

    closeAlert() {
        this.alert = false;
    }

    generateReport() {
        // this.http.get('http://localhost:3000/api/generateReport', {responseType: 'blob'}).toPromise().then((data: any) => {
            this.userService.generateReport().toPromise().then((data:any)=>{ 
            //blob convert file in a readable form
            var file = new Blob([data], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        });
    }
    Search(){
              if(this.searchvalue==''){
                //   this.ngOnInit();
                     this.reLoadPage(this.p); 
              }else{
               //console.log('value',this.searchvalue);
                    //   this.users= this.users.filter((res:any)=>{
                    //   return res.name.toLocaleLowerCase().match(this.searchvalue.toLocaleLowerCase());
                    //   })
                     
                        this.users= this.users.filter((res:any)=>{
                        let value = (res.name.toLocaleLowerCase().match(this.searchvalue.toLocaleLowerCase())) || (res.email.toLocaleLowerCase().match(this.searchvalue.toLocaleLowerCase())) || (res.gender.toLocaleLowerCase().match(this.searchvalue.toLocaleLowerCase())) || (res.role.toLocaleLowerCase().match(this.searchvalue.toLocaleLowerCase()));
                        return value;
                      })
                      
                
              }
    }
    
    onSortClick(event:any) {
        let target = event.currentTarget,
          userList = target.classList;
    
        if (userList.contains('fa-chevron-up')) {
          userList.remove('fa-chevron-up');
          userList.add('fa-chevron-down');
          this.sortDir=-1;
        } else {
          userList.add('fa-chevron-up');
          userList.remove('fa-chevron-down');
          this.sortDir=1;
        }
        this.sort('name');
      }
    sort(name: string){
        this.users.sort((a:any,b:any)=>{
            a= a[name].toLowerCase();
            b= b[name].toLowerCase();
            return a.localeCompare(b) * this.sortDir;
          });
      
        // this.key = name;
        // this.reverse = this.reverse;
    }
  
}