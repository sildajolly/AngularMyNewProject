import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { UserService } from '../services/user.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alert:boolean=false;
  loginform: FormGroup;    //type of form group
  showErrorMessage = false;
  message: string;
  constructor(
    private formBuilder : FormBuilder,
    private http:HttpClient,
    private router: Router,
    private authService:AuthServiceService,
    private userService:UserService

  ) { }

  ngOnInit(): void {
  //  const loginStatus = localStorage.getItem('loginStatus')||'';
  //   if(loginStatus=='true'){
  //     console.log('loggedin');
  //     let role = localStorage.getItem("Role")||'';
  //     let id=localStorage.getItem('userId');
  //     if(role=='Admin'){
  //       this.router.navigate(['/adminhome']);  
  //     }else if(role=='User'){
  //       this.router.navigate(['/userhome',id]); 
  //     }else{
  //       this.router.navigate(['/login']);
  //     }

  //   }else{
  //     console.log('Loggedout')
  //     this.router.navigate(['/login']);

  //   }




    this.loginform=this.formBuilder.group({
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
   
    });
    // this.loginform = this.formBuilder.group({
    //   email: '',
    //   password:''
    // });
  }
  submit(): void { 
  if(this.loginform.valid){
  console.log(this.loginform.getRawValue());
  
  
  let user={
    email: this.loginform.getRawValue().email,
    password: this.loginform.getRawValue().password

  }
   this.userService.login(user).toPromise().then((data:any)=>{ 
  //  this.http.post('http://localhost:3000/api/login', user).toPromise().then((data:any)=>{
   console.log('passedValues', data);
  
  //  console.log('reftoken',data.reftoken);
  //  console.log('token', data.acctoken);
  // console.log('test',data.usersToReturn)
 
   let user={
     acctoken:data.accesstoken,
     reftoken:data.refreshtoken,
     userid:data.Id,
     role:data.role
   }
   if(user){
    this.authService.login(user);
   }
   else{
    this.alert=true;
   }
 
    
    if(data.status==true && data.role == 'Admin'){
      this.router.navigate(['/adminhome']);
      
    }
    else if (data.status === true && data.role == 'User') {
      const userid = data.userid;
      this.router.navigate(['/userhome',userid]);
     
    } 
    else if (data.status === false) {
      this.alert=true;
    }
  })
  
  }
}

closeAlert()
{
  this.alert=false;
  // this.router.navigate(['/login']);
}
  


}
