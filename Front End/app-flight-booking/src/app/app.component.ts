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

constructor(private auth:AuthSerivceService,private router:Router){}

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("ROLE");
    this.router.navigate(['login']);
  }
}
