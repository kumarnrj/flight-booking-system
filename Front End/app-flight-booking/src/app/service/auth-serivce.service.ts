import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingDetails } from '../Models/BookingDetails';
import { flightDetail } from '../Models/FlightDetail';
import { User } from '../Models/User';
import { userDetails } from '../Models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthSerivceService {

  private url="http://localhost:8081/api/";

  constructor(private http:HttpClient) { }


  authenticateUser(email:String,password:String){
    return this.http.post(`${this.url}authenticate`,{
      username:email,
       password:password
    })
  }

  getUserData(email:String):Observable<userDetails>{
    return this.http.get<userDetails>(`${this.url}findByEmail/${email}`)
  }

  // adding the user
   registerUser(user:User){
    
    return this.http.post(`${this.url}addUser`,user);
   }



  //               flight detaisl
  private flighturl="http://localhost:8080/api/"
  
  getFlightDetailsBySource(source:String,destination:String,date:any):Observable<flightDetail[]>{
    return this.http.post<flightDetail[]>(`${this.flighturl}getBySource`,{
      source:source,
      destination:destination,
      date:date
    });
  }

  // get by id
  getFlightDetailsById(id:String|undefined):Observable<flightDetail>{
    return this.http.get<flightDetail>(`${this.flighturl}byId/${id}`);
  }

  // booking service
  private bookingUrl="http://localhost:8082/api/"
  addBooking(flightDetail:BookingDetails){
    
      return this.http.post(`${this.bookingUrl}addBooking`,flightDetail);
  }
  // addBooking(flightDetail:BookingDetails){
  //   console.log(flightDetail)
  // }

 // payment service 
 createPaymentOrder(){} 

}
