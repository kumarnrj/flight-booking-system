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
 
   // getting all user data 
   getAllUser(){
     return this.http.get(`${this.url}allUser`);
   }

   // delete a user 
   removeUser(userId:String){
     return this.http.delete(`${this.url}deleteUser/${userId}`);
   }

   // update a user
   updateUser(user:userDetails,userId:String){
     return this.http.put(`${this.url}updateUser/${userId}`,user);
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

  //                             booking service
  private bookingUrl="http://localhost:8082/api/"
  addBooking(flightDetail:BookingDetails){
    
      return this.http.post(`${this.bookingUrl}addBooking`,flightDetail);
  }
  
  // getting all the data

  getAllBooking(){
    return this.http.get(`${this.bookingUrl}allbooking`)
  }

 // payment service 
 private paymentUrl ="http://localhost:8083/api/"
 createPaymentOrder(amount:any,customerOId:String|undefined){
  return this.http.post(`${this.paymentUrl}create_order`,{
    amount:amount,
    custOId:customerOId
   })
 } 

 // updating the payment order
updatePaymentStatus(payment_id: string, order_id: string, status: string){
  return this.http.post(`${this.paymentUrl}update_order`, {
   payment_id: payment_id,
   order_id: order_id,
   status: status
 })}

// updating the payment status in booking 
updatePaymentStatusInBooking(payment_id:String,status:String,custorderId:String|undefined){
  return this.http.put(`${this.bookingUrl}updatePaymentStatus`,{
    payment_id:payment_id,
    paymentStatus:status,
    orderId:custorderId
  });

}


// important funtion
isUserLoggedIn(){
  return !!localStorage.getItem("token");
}

}
