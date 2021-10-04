import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { UserService } from '../services/user.service';
// import {Cookie} from 'ng2-cookies/ng2-cookies';
import { UserModel } from '../user.model';
import { createUser } from '../store/user.actions';
import { AppState } from '../store/reducers/index';
import { Store } from '@ngrx/store';
import * as uuid from 'uuid';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  alert:boolean=false;
  createform: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private authService:AuthServiceService,
    private userService:UserService,
    private store: Store<AppState>
  ) { }
  
  
  ngOnInit(): void {
   
    let role = localStorage.getItem("Role")||'';
    if(role!='Admin'){
            this.router.navigate(['/login']);
        }
  //  this.checkToken();
  
    this.createform=this.formBuilder.group({
     name:new FormControl('',[Validators.required]),
     email:new FormControl('',[Validators.required,Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]),
     passwd:new FormControl('',[Validators.required, Validators.minLength(5)]),
    // passwd: [null, Validators.compose([
    //   Validators.minLength(8),
    //   Validators.required])
    // ],
    // passwd_repeat: [null, Validators.compose([
    // Validators.minLength(8),
    // Validators.required])
    // ],
     passwd_repeat:new FormControl('',[Validators.required]),
     phone:new FormControl('',[Validators.required,Validators.pattern(/^[7-9][0-9]{9}$/)]),
     gender:new FormControl('',[Validators.required]),
     role:new FormControl('',[Validators.required])
   });
   
  }
  get f() { return this.createform.controls; }

  submit(): void {
    if(this.createform.valid){
      // let refreshtoken = this.authService.getToken();
    
     console.log(this.createform.getRawValue());
    //  let user={
      
    //    name: this.createform.getRawValue().name,
    //    email: this.createform.getRawValue().email,
    //    passwd: this.createform.getRawValue().passwd,
    //    phone: this.createform.getRawValue().phone,
    //    gender: this.createform.getRawValue().gender,
    //    role: this.createform.getRawValue().role
    //    }
       const user:UserModel={
        //  user_id:uuid.v4(),
        user_id:'',
        name: this.createform.getRawValue().name,
        email: this.createform.getRawValue().email,
        password: this.createform.getRawValue().passwd,
        phone: this.createform.getRawValue().phone,
        gender: this.createform.getRawValue().gender,
        role: this.createform.getRawValue().role
        }
       console.log('ha',user);
      // const user: UserModel = {id: uuid.v4(), name: submittedForm.value.name, description: submittedForm.value.description};
       this.store.dispatch(createUser({user})); 
     //  this.router.navigate(['/adminhome']);

     
       
    //   this.userService.createuser(user).toPromise().then((data:any)=>{ 
    //  //  this.http.post('http://localhost:3000/api/createuser', user,{headers: {"authorization":`Bearer ${accesstoken}`}}).toPromise().then((data:any)=>{
    //     if (data.status === false) {
    //       if (data.code == 403) {
    //           this.renewAccessToken(refreshtoken)
    //               .then(({access: newAccessToken}: any) => {
    //                   this.submit();
    //               })
             
    //       } else if(data.code==400){
    //         this.alert=true;
    //         // alert(data.message);
    //        }
    //     } 
    //     else {
          
    //       if(data.code==200){
    //         // alert("Registered successfully");
          
    //         this.router.navigate(['/adminhome']);
    //       }
         
    //     }
         
    //    })
     }
    }
  
backtoadmindashboard()
{
  this.router.navigate(['/adminhome']);
}
closeAlert()
{
  this.alert=false;
}


}
