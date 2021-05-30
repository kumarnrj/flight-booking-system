import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

 // varible 
public isoutline=true;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  myProfile(){
     this.router.navigate(['myaccount/profile']);
  }

  booking(){
    this.router.navigate(['my-orders']);
  }

  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("ROLE");
    localStorage.setItem('count','1');
    this.ngOnInit();
    this.router.navigate(['login']);
  }
}
