

export interface BookingDetails{
    customerId:String,
     custmerFirstname: String,
      customerLastname:String,
      customerContact:String,
      source:string|undefined,
      destination:String|undefined,
       arrivalTime:String|undefined,
      departureTime:String|undefined,
      date:String|undefined,
      paymentStatus:String,
      bookingStatus:String,
     paymentId:String,
     passengers:Passenger[]
     
}

export interface Passenger{
    firstname:String,
    lastname:String,
    contact:String,
    age:String,
    gender:String
}