import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
 
  
  public isoutline = true;

  constructor(private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("login")=="yes"){
      console.log("inside");
      window.location.reload();
      sessionStorage.removeItem("login");
    }
  }

 


  myProfile(){
    this.router.navigate(["myaccount/profile"]);
  }

  //clicked on view user
  viewUser(){
   this.router.navigate(['user-detail'])
  }

//clicked on show booking 
  booking(){
    this.router.navigate(['booking-detail'])
  }

  //clicked on add flight
  updateFlight(){
    this.router.navigate(['update-flight'])
  }

 





}
