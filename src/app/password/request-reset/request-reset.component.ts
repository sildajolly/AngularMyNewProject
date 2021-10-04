import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  requestform: FormGroup; 
  alert:boolean=false;
  alert1:boolean=false;
  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router:Router
  ) { } 

  ngOnInit(): void {
    this.requestform=this.formBuilder.group({
      email:new FormControl('',[Validators.required,Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])
  
    });
  }
  submit():void{
    if(this.requestform.valid){
    
     const user = this.requestform.getRawValue();
      console.log('ha',user);
      this.http.post('http://localhost:3000/api/sendPasswordResetLink', user).toPromise().then((data:any)=>{
        console.log('passedValues', data);
        this.requestform.reset();
        if(data.status==true){
          this.alert1=true;
        }
        else if (data.status == false) {
          this.alert=true;
        }
       
      // this.handleResponse(data);
        
    });
    }
      

  }
  closeAlert()
    {
       this.alert=false;
      //  this.requestform.getRawValue().email=null;
  // this.router.navigate(['/login']);
    }
    closeAlert1()
    {
       this.alert1=false;
    }
  // handleResponse(res: any){
  //   // this.requestform.email= null;
   
  //   this.requestform.getRawValue().email=null
  // }

}
