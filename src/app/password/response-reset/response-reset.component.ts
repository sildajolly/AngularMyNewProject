import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  responseform: FormGroup;
  alert:boolean=false; 
  
  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
 
  
    const userid= this.route.snapshot.queryParamMap.get('id');
    const token= this.route.snapshot.queryParamMap.get('token');
    console.log('ID',userid);
    console.log('TOKEN',token);

    this.responseform=this.formBuilder.group({
     
      // passwd:new FormControl('',[Validators.required]),
      // passwd_repeat:new FormControl('',[Validators.required])
      passwd:new FormControl('',Validators.compose([
        Validators.minLength(5),
        Validators.required,
      ])),
      passwd_repeat:new FormControl('',[Validators.required])

    });
  }
  submit():void{
    
  
    if(this.responseform.valid){
      // let user={
      //   userid:this.route.snapshot.queryParamMap.get('id') ,
      //   password: this.responseform.getRawValue().passwd
    
      // }
      const user = this.responseform.getRawValue();
      //fetch queryparameters
      const userid= this.route.snapshot.queryParamMap.get('id');
      const token= this.route.snapshot.queryParamMap.get('token');
      console.log('ha',user);
      this.http.post(`http://localhost:3000/api/resetPassword/${userid}/${token}`, user).toPromise().then((data:any)=>{
      console.log('passedValues', data);
      if(data.status==true){
        this.alert=true;
      }

    });
      

  }
}
closeAlert()
    {
       this.alert=false;
    }
loginpage(){
      this.router.navigate(['/login']);
    }
}
