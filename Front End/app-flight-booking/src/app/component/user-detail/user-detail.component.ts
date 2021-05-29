import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { userDetails } from 'src/app/Models/UserDetails';
import { AuthSerivceService } from 'src/app/service/auth-serivce.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @ViewChild('frame') public modal: any;

  public personTest="";
  public isUpdateUser = false;
  public role="";
  private isEditButtonPressed = false;
  public isAddButtonPressed = false;
  private currentUserId="";

  public userList: userDetails[] | undefined;


  constructor(private auth: AuthSerivceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  EditForm = this.fb.group({
    firstname:['',Validators.required],
    lastname:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[A-Z])(?!.*\\s).{8,}$")]],
    contact:['',[Validators.required,Validators.pattern('^\\d{10}$')]],
    age:['',[Validators.required]],
    gender:['',[Validators.required,Validators.pattern("^male$|^female|^Male$|^Female|^MALE$|^FEMALE$")]]
    
  });



  ngOnInit() {
    
    
    
    // calling the service to fetch the data from database
    setTimeout(() => {
    
        this.auth.getAllUser()
          .subscribe((res:any) => {
            this.userList = res;
          })
    }, 1);


  }

  // creating form builder to handle the response in the UI

  get firstName() {
    return this.EditForm.get('firstname');
  }

  get lastName() {
    return this.EditForm.get('lastname');
  }

  get email() {
    return this.EditForm.get('email');
  }

  get password() {
    return this.EditForm.get('password');
  }

  get mobile() {
    return this.EditForm.get('contact');
  }

  get age(){
    return this.EditForm.get('age');
  }

  get gender(){
    return this.EditForm.get('gender');
  }


  // remove the data from the list 

  remove(id: any, userId: any) {
    console.log(id);
    this.userList?.splice(id, 1);

    // removing the data from the database
    this.auth.removeUser(userId)
      .subscribe(res => {
        swal.fire("Done", "User Deleted", "success");

      })

  }
 
  
 


  // current person details

  edit(user:any) {
    console.log(user);
    this.isAddButtonPressed = false;
    this.isEditButtonPressed = true;
    this.currentUserId = user._id;
    this.setValueToEditForm(user);
    
    console.log(this.currentUserId)
    this.modal.show();
  }

  // setting values to the form
  setValueToEditForm(currentUser: any) {
    this.EditForm.setValue({
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      email: currentUser.email,
      password: currentUser.password,
      contact: currentUser.contact,
      age:currentUser.age,
      gender:currentUser.gender
     
    })
  }

  // adding a new user
  addUser() {
    this.isEditButtonPressed = false
    this.isAddButtonPressed = true;
    this.EditForm.reset();
    this.modal.show();
  }


  // // On Submitting the form
  onSubmit() {
    if (this.isEditButtonPressed) {
      console.log(this.EditForm.value);
      console.log(this.currentUserId);
      this.isEditButtonPressed = false;
      this.auth.updateUser(this.EditForm.value, this.currentUserId)
        .subscribe(res => {
          this.modal.hide();
          swal.fire("Done", "Updated Successfully", "success");
          this.ngOnInit();

        })
    }
    if (this.isAddButtonPressed) {
      
        this.auth.registerUser(this.EditForm.value)
          .subscribe(res => {
            this.modal.hide();
            swal.fire("Done", "Account Created", "success");
            this.ngOnInit();
            this.isAddButtonPressed=false;
          })
      }
  }

}
