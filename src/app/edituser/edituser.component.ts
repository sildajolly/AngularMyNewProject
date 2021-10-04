import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../user.model';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { Emitters } from '../emitters/emitters';
import { UserService } from '../services/user.service';
// import {Cookie} from 'ng2-cookies/ng2-cookies';

import { userActionTypes } from './../store/user.actions';
import { AppState } from './../store/reducers/index';
import { select, Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  userToBeUpdated: UserModel;
  alert:boolean=false;
  user:  Observable<UserModel[]>;
  editForm: FormGroup;
 // userModelObj : UserModel= new UserModel();
  //user:any=[];

  constructor(
    // public modal : NgbActiveModal,
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private _router: Router,
    private _route:ActivatedRoute,
    private authService:AuthServiceService,
    private userService:UserService,
    private store: Store<AppState>) { }
  
  ngOnInit(): void {
  
  //  this.checkToken();
   this.editForm = new FormGroup({
    
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    gender: new FormControl(),
    role: new FormControl(),
    user_id: new FormControl()
   
 });
    const id=this._route.snapshot.params['id'];
    console.log(id);
    this.getUser(id);
 
  }



 
  
  getUser(id: number){
   
    
    
    let userid=this._route.snapshot.params['id'];
    console.log('idd',userid);
    //no need to put bearer in header bcz interceptor is used
    this.userService.getuser(userid).toPromise().then((data:any)=>{ 
    // this.http.get(`http://localhost:3000/api/getUserById/${id}`).toPromise().then((data:any)=>{
      console.log('passedValues', data);
   
        this.user=data.Item;
        console.log('oo',this.user)
        Emitters.authEmitter.emit(true);
        if(data.status==false){
          Emitters.authEmitter.emit(false);
         }
         const userdata=data.Item;
        // const userdata=data;
        this.initForm(userdata || {});
        console.log('Single User',this.user);
   
     
  
    });
  
  
  }
  private initForm(userdata:any) {
    console.log("ee",userdata);
    console.log("ee",userdata.name);
    this.editForm = this.formBuilder.group({
      name:[userdata.name,Validators.required],
      email: [userdata.email,Validators.required],
      phone: [userdata.phone,Validators.required],
      gender: [userdata.gender,Validators.required],
      role: [userdata.role,Validators.required],
      user_id: [userdata.user_id,Validators.required]
    });
    // this.editForm = this.formBuilder.group({
    //   name:[userdata[0].name,Validators.required],
    //   email: [userdata[0].email,Validators.required],
    //   phone: [userdata[0].phone,Validators.required],
    //   gender: [userdata[0].gender,Validators.required],
    //   role: [userdata[0].role,Validators.required],
    //   user_id: [userdata[0].user_id,Validators.required]
    // });
   
  }
    
  // getUser(id: number){
   
  //   let role = localStorage.getItem("Role")||'';
  //   if(role!='Admin'){
  //           this._router.navigate(['/login']);
  //       }
  //   let userid=this._route.snapshot.params['id'];
  //   console.log('idd',userid);
  //   this.store.select('users')
  //   .subscribe((data) => {
  //      const user = data.entities
  //      console.log("uuu",user)

  //   Object.keys(user).forEach((userItem)=>{
  //     console.log("v",user[userItem])
  //     if(user[userItem]!.user_id==userid){
  //       console.log('t')
      
  //       const userdata=user[userItem]
  //       console.log('oh',userdata)
  //       this.initForm(userdata || {});
  //     }
      
  //   })
  // });
 
  
  
  // }
  // private initForm(userdata:any) {
  //   console.log("ee",userdata);
  
  //   this.editForm = this.formBuilder.group({
  //     name:[userdata.name,Validators.required],
  //     email: [userdata.email,Validators.required],
  //     phone: [userdata.phone,Validators.required],
  //     gender: [userdata.gender,Validators.required],
  //     role: [userdata.role,Validators.required],
  //     user_id: [userdata.user_id,Validators.required]
  //   });
   
  // }
 

  updateUser(): void {
   
    if(this.editForm.valid){

      // let refreshtoken = this.authService.getToken();
      console.log(this.editForm.getRawValue());
      console.log('w',this.editForm.value)
      //  let user={
      //    name: this.editForm.getRawValue().name,
      //    email: this.editForm.getRawValue().email,
      //    phone: this.editForm.getRawValue().phone,
      //    gender: this.editForm.getRawValue().gender,
      //    role: this.editForm.getRawValue().role,
      //    user_id:this.editForm.getRawValue().user_id
         
      //    }
      //    console.log('ha',user);
     const update={
        name: this.editForm.getRawValue().name,
        email: this.editForm.getRawValue().email,
        phone: this.editForm.getRawValue().phone,
        gender: this.editForm.getRawValue().gender,
        role: this.editForm.getRawValue().role,
        user_id:this.editForm.getRawValue().user_id,
        password:'nil'
        
        }
        console.log('ha',update);
        //  const update: Update<UserModel> = {
        //   id: this.userToBeUpdated.user_id,
        //   changes: {
        //     ...this.userToBeUpdated,
        //     ...this.editForm.value
        //   }
        // };
    
         this.store.dispatch(userActionTypes.updateUser({update}));
      
         this.alert=true;
        //  this._router.navigate(['/adminhome']);



         //no need to put bearer in header bcz interceptor is used
        //  this.userService.updateuser(user).toPromise().then((data:any)=>{ 
        // //  this.http.post('http://localhost:3000/api/updateUser/', user,{headers: {"authorization":`Bearer ${accesstoken}`}}).toPromise().then((data:any)=>{
        //   if (data.status === false) {
        //     if (data.code == 403) {
        //       console.log('renew in update')
        //       //invalid token
        //         this.renewAccessToken(refreshtoken)
        //             .then(({access: newAccessToken}: any) => {
        //               this.updateUser();
        //             })
               
        //     }
        //   }else{
        //     if(data.code==200){
            
        //       this.alert=true;
        //       // alert(data.message);
        //       //  this._router.navigate(['/adminhome']);
        //      }
        //   }
            
        //     //  else{
              
        //     //    alert(data.message);
        //     //  }
          
         
        //  })
       }
}
backtoadmindashboard()
{
  this._router.navigate(['/adminhome']);
}
closeAlert()
  {
    this.alert=false;
  
  }
adminhome(){
  this._router.navigate(['/adminhome']);
}

}
