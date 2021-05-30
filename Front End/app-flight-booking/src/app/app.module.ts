import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { FlightSearchComponent } from './component/flight-search/flight-search.component'
import {DatePipe} from '@angular/common';
import { FlightDetailsComponent } from './component/flight-details/flight-details.component';
import { BookFlightComponent } from './component/book-flight/book-flight.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { BookingDetailComponent } from './component/booking-detail/booking-detail.component';
import { UpdateFlightComponent } from './component/update-flight/update-flight.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { MyBookingComponent } from './component/my-booking/my-booking.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    FlightSearchComponent,
    FlightDetailsComponent,
    BookFlightComponent,
    AdminDashboardComponent,
    UserDetailComponent,
    BookingDetailComponent,
    UpdateFlightComponent,
    ProfileComponent,
    UserDashboardComponent,
    MyBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
