import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthSerivceService } from 'src/app/service/auth-serivce.service';
import { PasswordValidator } from '../password.validator';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formSubmitted=false;
  isOutline=true;


  constructor(private fb:FormBuilder,private auth:AuthSerivceService
    ,private router:Router) { }

  ngOnInit(): void {
  }

   // Creating form builder for validation of form
   registrationForm = this.fb.group({
    firstname:['',Validators.required],
    lastname:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[A-Z])(?!.*\\s).{8,}$")]],
    repassword:[''],
    contact:['',[Validators.required,Validators.pattern('^\\d{10}$')]],
    age:['',[Validators.required]],
    gender:['',[Validators.required,Validators.pattern("^male$|^female|^Male$|^Female|^MALE$|^FEMALE$")]]
    
  },{validator:PasswordValidator})

 get firstName(){
   return this.registrationForm.get('firstname');
 }

 get lastName(){
  return this.registrationForm.get('lastname');
 }

 get email(){
  return this.registrationForm.get('email');
 }

 get password(){
   return this.registrationForm.get('password');
 }

 get confirmPassword(){
   return this.registrationForm.get('repassword')
 }

 get mobile(){
  return this.registrationForm.get('contact');
 }

 get age(){
   return this.registrationForm.get('age');
 }
 
 get gender(){
   return this.registrationForm.get('gender');
 }

 

// on submitting the form
onSubmit(){
  this.auth.registerUser(this.registrationForm.value)
  .subscribe(res=>{
    swal.fire("Done","Registered Successfully","success");
    this.router.navigate(["login"]);
  
  },(err:any)=>{
    if(err.status===400){
      swal.fire("Oops","Email Already Present","warning")
    }else
      swal.fire("Oops","Something Wrong Try Again","error")
    
  })
}

}
