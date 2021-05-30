import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userDetails } from 'src/app/Models/UserDetails';
import { AuthSerivceService } from 'src/app/service/auth-serivce.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // variables
  public LoggedInUser:userDetails|undefined;
  private userId:String|undefined;

  public NameFields = true;
  public EmailField = true;
  public MobileField = true;
  public addressField = true;


  //constructor
 constructor(private auth:AuthSerivceService,private fb:FormBuilder,
  private router:Router){}



 ngOnInit(): void {
  setTimeout(()=>{
    this.auth.getUserData(localStorage.getItem("email"))
    .subscribe(res => {
      this.LoggedInUser = res;
      this.userId = res._id;
      console.log(this.LoggedInUser)
      this.setValueToEditForm();
    })
  },1)
 }

// form group


 EditForm = new FormGroup({
  firstname: new FormControl({ value: '', disabled: true }, Validators.required),
  lastname: new FormControl({ value: '', disabled: true }, Validators.required),
  email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
  contact: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern('^\\d{10}$')]),
  age: new FormControl({ value: '', disabled: true }, Validators.required),
  gender:new FormControl({value:'',disabled:true},[Validators.required,Validators.pattern("^male$|^female|^Male$|^Female|^MALE$|^FEMALE$")])
});

// setting value to the form group 
setValueToEditForm() {
  this.EditForm.setValue({
    firstname: this.LoggedInUser?.firstname,
    lastname: this.LoggedInUser?.lastname,
    email: this.LoggedInUser?.email,
    contact: this.LoggedInUser?.contact,
    age:this.LoggedInUser?.age,
    gender:this.LoggedInUser?.gender
  })
}


onCancel(){
  this.EditForm.reset();
 this.setValueToEditForm();
 this.EditForm.get('firstname')?.disable();
    this.EditForm.get('lastname')?.disable();
    this.EditForm.get('email')?.disable();
    this.EditForm.get('contact')?.disable();
    this.EditForm.get('age')?.disable();
    this.EditForm.get('gender')?.disable();
}

// submitting the form 
onSubmit(){
 this.NameFields=true;
  this.auth.updateUser(this.EditForm.value, this.userId)
  .subscribe(res => {
    swal.fire("Done", "Updated Successfully", "success");
    this.ngOnInit();
    this.EditForm.reset();
    this.EditForm.get('firstname')?.disable();
    this.EditForm.get('lastname')?.disable();
    this.EditForm.get('email')?.disable();
    this.EditForm.get('contact')?.disable();
    this.EditForm.get('age')?.disable();
    this.EditForm.get('gender')?.disable();
     
  })
}

// edit the information
onPersonalInfo(){
  this.NameFields = false;
    this.EditForm.get('firstname')?.enable();
    this.EditForm.get('lastname')?.enable();
    this.EditForm.get('email')?.enable();
    this.EditForm.get('contact')?.enable();
    this.EditForm.get('age')?.enable();
    this.EditForm.get('gender')?.enable();
    
}
onPersonalInfoCan(){
  this.NameFields = true;
  
 this.EditForm.reset();
 this.setValueToEditForm();
 this.EditForm.get('firstname')?.disable();
    this.EditForm.get('lastname')?.disable();
    this.EditForm.get('email')?.disable();
    this.EditForm.get('contact')?.disable();
    this.EditForm.get('age')?.disable();
    this.EditForm.get('gender')?.disable();
 
}

dashboard(){
  let role=localStorage.getItem('ROLE');
  if(role==="ROLE_USER"){
    this.router.navigate(["userDashboard"])
  }
 else if(role==="ROLE_ADMIN"){
    this.router.navigate(["adminDashboard"])
  }else{
    this.router.navigate(["hhg"]);
  }
}

 // getter for handling the form UI
 // creating form builder to handle the response in the UI

 get firstname() {
  return this.EditForm.get('firstname');
}

get lastname() {
  return this.EditForm.get('lastname');
}

get email() {
  return this.EditForm.get('email');
}


get contact() {
  return this.EditForm.get('contact');
}

get age() {
  return this.EditForm.get('age')
}
get gender() {
  return this.EditForm.get('gender')
}

}
