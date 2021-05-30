import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("login")=="yes"){
      console.log("inside");
      window.location.reload();
      sessionStorage.removeItem("login");
    }
  }

  bookNow(){
  this.router.navigate(['flight-search']);
  }

}
