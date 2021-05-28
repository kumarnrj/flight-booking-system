import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookingDetails } from 'src/app/Models/BookingDetails';
import { flightDetail } from 'src/app/Models/FlightDetail';
import { AuthSerivceService } from 'src/app/service/auth-serivce.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss']
})
export class BookFlightComponent implements OnInit {
  formSubmitted =false;
  isOutline=true;

  firstClicked=false;
  
  public paymentStarted=false;

  public flighDetail:flightDetail|undefined;
// payment info
public total=0;
private price =0;
private flightId:String |undefined;

// booking id 
private bookingId:String|undefined;
  //constructor
  constructor(private fb:FormBuilder,private route:ActivatedRoute,
    private auth:AuthSerivceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.flightId= params.get("id")?.toString();
      console.log(this.flightId);
    })
    
    this.auth.getFlightDetailsById(this.flightId)
    .subscribe((res:flightDetail)=>{
      this.flighDetail = res;
      
    let price:any = this.flighDetail?.price;
    console.log(price)
    this.price = price;
    this.total = price * (this.registrationForm.value.passengers.length+1);
     console.log(this.total)
    })
  
  }

  // Creating form builder for validation of form
  registrationForm = this.fb.group({
    firstname:['',Validators.required],
    lastname:['',Validators.required],
    contact:['',[Validators.required,Validators.pattern('^\\d{10}$')]],
    age:['',[Validators.required]],
    gender:['',[Validators.required,Validators.pattern("^male$|^female|^Male$|^Female|^MALE$|^FEMALE$")]],
    passengers:this.fb.array([
      
    ])
  })



// add passender click event
addPassengerGroupClick(){
  this.firstClicked=true;
  (<FormArray> this.registrationForm.get("passengers")).push(this.addPassengerGroup());
}

// creating passenger group
addPassengerGroup():FormGroup{
  return this.fb.group({
    firstname:['',Validators.required],
    lastname:['',Validators.required],
    contact:['',[Validators.required,Validators.pattern('^\\d{10}$')]],
    age:['',[Validators.required]],
    gender:['',[Validators.required,Validators.pattern("^male$|^female|^Male$|^Female|^MALE$|^FEMALE$")]]
  })
}

// submitting the form
onSubmit(){
  this.paymentStarted=true;
  this.total = this.price * (this.registrationForm.value.passengers.length+1);
  console.log(this.registrationForm.value)
   
 

  let bookingDetail:BookingDetails={
    customerId:"",
    custmerFirstname:"",
    customerLastname:"",
    customerContact:"",
    source:"",
    destination:"",
    arrivalTime:"",
    departureTime:"",
    date:"",
    bookingStatus:"",
    paymentId:'',
    paymentStatus:'"',
    passengers:[]

  };

  bookingDetail.custmerFirstname = this.registrationForm.value.firstname;
  bookingDetail.customerLastname = this.registrationForm.value.lastname;
  bookingDetail.customerContact = this.registrationForm.value.contact;
  bookingDetail.source = this.flighDetail?.source;
  bookingDetail.destination = this.flighDetail?.destination;
  bookingDetail.arrivalTime = this.flighDetail?.arrivalTime;
  bookingDetail.departureTime=this.flighDetail?.departureTime;
  bookingDetail.date = this.flighDetail?.date;
  bookingDetail.bookingStatus="",
  bookingDetail.paymentId="",
  bookingDetail.paymentStatus="PENDING",
  bookingDetail.passengers= this.registrationForm.value.passengers
 
  console.log(bookingDetail)
  this.auth.addBooking(bookingDetail)
  .subscribe((res:any)=>{
     this.bookingId = res._id;
  })

}


// removing 
remove(i:any){
  (<FormArray> this.registrationForm.get("passengers")).removeAt(i);
}

// payment start
paymentStart(){
  console.log("payment started ", this.total)
   console.log(this.bookingId);

  // this.auth.createPaymentOrder(this.amount,this.custorderId).subscribe((res:any) => {
  //   if (res.status === "created") {
  //     let options = {
  //       "key": "rzp_test_X1lxqLWC24TOBN", // Enter the Key ID generated from the Dashboard
  //       "amount": res.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //       "currency": "INR",
  //       "name": "Car Wash",
  //       "description": "Booking Transaction",
  //       "image": "https://example.com/your_logo",
  //       "order_id": res.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //       handler: this.paymentHandler.bind(this),
  //       modal: {
  //         ondismiss: (() => {
  //           this.zone.run(() => {
  //             swal.fire("Oops","Payment Failed Redirecting to booking page","error");
  //             this.router.navigate(["booking"]);
  //           })
  //         })
  //       },
  //       "prefill": {
  //         "name": "",
  //         "email": "",
  //         "contact": ""
  //       },
  //       "notes": {
  //         "address": "Razorpay Corporate Office"
  //       },
  //       "theme": {
  //         "color": "#3399cc"
  //       }
  //     };
     
      
  //     this.rzp = new this.winRef.nativeWindow['Razorpay'](options);

  //    this. rzp.on('payment.failed', function (res) {
  //       console.log(res.error.code);
  //       console.log(res.error.description);
  //       console.log(res.error.source);
  //       console.log(res.error.step);
  //       console.log(res.error.reason);
  //       console.log(res.error.metadata.order_id);
  //       console.log(res.error.metadata.payment_id);
  //       swal.fire("Oops","Payment Failed Redirecting to booking page","error");

  //     });
  //     this.rzp.open();
  //   }
  // })


}
paymentCancel(){}




// getter for the registration form 
get passenger(){
  return  (<FormArray>this.registrationForm.get('passengers'));
}
 get firstName(){
   return this.registrationForm.get('firstname');
 }

 get lastName(){
  return this.registrationForm.get('lastname');
 }
 get mobile(){
  return this.registrationForm.get('contact');
 }

 get age(){
   return this.registrationForm.get('age');
 }
 
 get gender(){
   return this.registrationForm.get('gender');
 }

 

}
