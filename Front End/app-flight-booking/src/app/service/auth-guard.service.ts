import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { AuthSerivceService } from './auth-serivce.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedIn implements CanActivate{

  constructor(private auth:AuthSerivceService,private router:Router) { }
  canActivate(): boolean  {
       if(this.auth.isUserLoggedIn()){
           return true;
       }else{
         this.router.navigate(["login"]);
         return false;
       }
         
    
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminLoggedIn implements CanActivate{

  constructor(private auth:AuthSerivceService,private router:Router) { }
  canActivate(): boolean  {
    let role = localStorage.getItem("ROLE");
       if(role==="ROLE_ADMIN"){
           return true;
       }else{
         swal.fire("Oops","Unauthorized Access","info").then(res=>{
          this.router.navigate(["home"]);
         })
         
         return false;
       }
         
    
  }
}

