import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSerivceService } from './service/auth-serivce.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-flight-booking';
  public loggedIn=true;
constructor(private auth:AuthSerivceService,private router:Router){}

ngOnInit(){
  this.loggedIn = this.auth.isUserLoggedIn();
  
}




  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("ROLE");
    this.ngOnInit();
    this.router.navigate(['login']);
  }

  myAccount(){
    if(localStorage.getItem("ROLE")==='ROLE_USER'){
      this.router.navigate(['userDashboard']);
    }else{
      this.router.navigate(['adminDashboard'])
    }
  }
}
