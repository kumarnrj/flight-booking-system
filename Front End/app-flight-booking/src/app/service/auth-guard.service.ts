import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
