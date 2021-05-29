import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { BookFlightComponent } from './component/book-flight/book-flight.component';
import { BookingDetailComponent } from './component/booking-detail/booking-detail.component';
import { FlightSearchComponent } from './component/flight-search/flight-search.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { SignupComponent } from './component/signup/signup.component';
import { UpdateFlightComponent } from './component/update-flight/update-flight.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import {UserLoggedIn} from './service/auth-guard.service'
const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'flight-search',component:FlightSearchComponent},
  {path:'flight-book',component:BookFlightComponent,canActivate:[UserLoggedIn]},
  {path:'adminDashboard',component:AdminDashboardComponent},
  {path:'user-detail',component:UserDetailComponent},
  {path:'booking-detail',component:BookingDetailComponent},
  {path:'update-flight',component:UpdateFlightComponent},
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
