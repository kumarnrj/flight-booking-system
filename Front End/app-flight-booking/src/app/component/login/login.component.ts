import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userDetails } from 'src/app/Models/UserDetails';
import { AuthSerivceService } from 'src/app/service/auth-serivce.service';
import  swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email="";
  public password="";
  private token="";
  errMsg:string | undefined;

  submitted = false;
  isOutline = true;

  private currentUser:userDetails | undefined;

  constructor(private auth:AuthSerivceService,
    private router:Router){}
 
  ngOnInit(): void {
    
    if(localStorage.getItem('count')==="1"){
      localStorage.removeItem('count');
      window.location.reload();
    }
    
  }
  login(){
        this.auth.authenticateUser(this.email,this.password)
        .subscribe((res:any)=>{
          console.log(res);
          swal.fire("Done","Logged In","success");
          this.token = res.jwt;
          this.token=res.jwt;
           localStorage.setItem("token",this.token);
           localStorage.setItem("email",this.email.toString());
              this.auth.getUserData(this.email)
              .subscribe((res:userDetails)=>{
                this.currentUser= res;
                localStorage.setItem("id",this.currentUser._id.toString());
                localStorage.setItem("ROLE",this.currentUser.role.toString());
                sessionStorage.setItem("login","yes");
                if(this.currentUser.role.toString()==="ROLE_ADMIN"){
                  this.router.navigate(['adminDashboard']);
                }
                else{
                  this.router.navigate(['home']);
                }
                
              })
        },err=>{
          swal.fire("Oops","Wrong credentials","error");
        })
  }

}
