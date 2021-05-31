import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { BookFlightComponent } from './component/book-flight/book-flight.component';
import { BookingDetailComponent } from './component/booking-detail/booking-detail.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { FlightSearchComponent } from './component/flight-search/flight-search.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { MyBookingComponent } from './component/my-booking/my-booking.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SignupComponent } from './component/signup/signup.component';
import { UpdateFlightComponent } from './component/update-flight/update-flight.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import {UserLoggedIn,AdminLoggedIn} from './service/auth-guard.service'
const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'flight-search',component:FlightSearchComponent},
  {path:'flight-book',component:BookFlightComponent,canActivate:[UserLoggedIn]},
  {path:'adminDashboard',component:AdminDashboardComponent,canActivate:[AdminLoggedIn]},
  {path:'user-detail',component:UserDetailComponent,canActivate:[AdminLoggedIn]},
  {path:'booking-detail',component:BookingDetailComponent,canActivate:[AdminLoggedIn]},
  {path:'update-flight',component:UpdateFlightComponent,canActivate:[AdminLoggedIn]},
  {path:'myaccount/profile',component:ProfileComponent,canActivate:[UserLoggedIn]},
  {path:'userDashboard',component:UserDashboardComponent,canActivate:[UserLoggedIn]},
  {path:'my-orders',component:MyBookingComponent,canActivate:[UserLoggedIn]},
  {path:'contact-us',component:ContactUsComponent},
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
