import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 alert:boolean=false;
 registerform: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private http : HttpClient,
    private router: Router,
    private userService: UserService) 
    
  { 
 
  }

  ngOnInit(): void {
    this.registerform=this.formBuilder.group({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      user_password:new FormControl('',[Validators.required]),
      passwd_repeat:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required]),
      gender:new FormControl('',[Validators.required])
    });
    // this.registerform = this.formBuilder.group({
    //   name: '',
    //   email: '',
    //   user_password: '',
    //   phone: ''
    // });
  
  }
  submit(): void {
    //console.log("reached");
    if(this.registerform.valid){

    
   console.log(this.registerform.getRawValue());
    let user={
      name: this.registerform.getRawValue().name,
      email: this.registerform.getRawValue().email,
      user_password: this.registerform.getRawValue().user_password,
      phone: this.registerform.getRawValue().phone,
      gender: this.registerform.getRawValue().gender
      }
      this.userService.register(user).toPromise().then((data:any)=>{ 
      // this.http.post('http://localhost:3000/api/register', user).toPromise().then((data:any)=>{
        if(data.code==200){
          // alert("User registered successfully");
          this.router.navigate(['/login']);
         // alert(data.message);
          
        }
        else{
          // alert("Email id  already exists");
          // alert(data.message);
          this.alert=true;
        }
      })
    }
   /* this.http.post('http://localhost:3000/register', user)   
   .subscribe((data) =>
   
    //this.router.navigate(['/login']
    ));*/
  }
  closeAlert()
  {
    this.alert=false;
    // this.router.navigate(['/login']);
  }

}
