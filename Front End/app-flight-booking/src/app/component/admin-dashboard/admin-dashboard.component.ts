import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
 
  public isoutline = true;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  myProfile(){}

  viewUser(){
   this.router.navigate(['user-detail'])
  }

  booking(){
    this.router.navigate(['booking-detail'])
  }
}
