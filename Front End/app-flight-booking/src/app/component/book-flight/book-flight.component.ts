import { Component, NgZone,OnInit } from '@angular/core';
import { FormBuilder, Validators,FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BookingDetails } from 'src/app/Models/BookingDetails';
import { flightDetail } from 'src/app/Models/FlightDetail';
import { AuthSerivceService } from 'src/app/service/auth-serivce.service';
import { ICustomWindow, WindowRefService } from 'src/app/service/window-ref.service';
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
private _window:ICustomWindow;
public rzp:any;

// booking id 
private bookingId:String|undefined;
  //constructor
  constructor(private fb:FormBuilder,private route:ActivatedRoute,
    private auth:AuthSerivceService,
    private zone:NgZone,
    private winRef:WindowRefService,
    private router:Router) {
      this._window = this.winRef.nativeWindow;
     }

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
   
 
// creating empyt object
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
    flightNo:'',
    paymentStatus:'"',
    
    passengers:[]

  };
// adding value to the booking details object
  bookingDetail.customerId = localStorage.getItem("id");
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
  bookingDetail.flightNo= this.flighDetail?.flightNo;
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

  this.auth.createPaymentOrder(this.total,this.bookingId).subscribe((res:any) => {
    if (res.status === "created") {
      let options = {
        "key": "rzp_test_LlIH2IiYZuqvQS", // Enter the Key ID generated from the Dashboard
        "amount": res.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Car Wash",
        "description": "Booking Transaction",
        "image": "assets/logo.jpg",
        "order_id": res.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: this.paymentHandler.bind(this),
        modal: {
          ondismiss: (() => {
            this.zone.run(() => {
              swal.fire("Oops","Payment Failed Redirecting to booking page","error");
              this.router.navigate(["flight-search"]);
            })
          })
        },
        "prefill": {
          "name": "",
          "email": "",
          "contact": ""
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
     
      
      this.rzp = new (this.winRef.nativeWindow as { [key: string]: any })['Razorpay'](options);

     this. rzp.on('payment.failed', function (res:any) {
        console.log(res.error.code);
        console.log(res.error.description);
        console.log(res.error.source);
        console.log(res.error.step);
        console.log(res.error.reason);
        console.log(res.error.metadata.order_id);
        console.log(res.error.metadata.payment_id);
        swal.fire("Oops","Payment Failed Redirecting to booking page","error");

      });
      this.rzp.open();
    }
  })
}

// payment handler
paymentHandler(res: any) {
  this.zone.run(() => {
    console.log("inside payment handler");
    this.updatePaymentOnServer(res.razorpay_payment_id, res.razorpay_order_id, "PAID")
  });
}

  
// update the payment in database
  updatePaymentOnServer(payment_id: string, order_id: string, status: string) {
   
    this.auth.updatePaymentStatus(payment_id,order_id,status).subscribe((res) => {
     
     
      this.auth.updatePaymentStatusInBooking(payment_id,status,this.bookingId)
      .subscribe(res=>{
        console.log(res)
      })
      
      swal.fire("Done", "Payment Successful", "success").then(res=>{
        this.router.navigate(["home"]);
      });
    },err => {
      swal.fire("Failed", "Payment not recieved if amount debuted refund will be initiated within 2 working days", "error")
    })
  }

paymentCancel(){
 
      swal.fire(
        'Canceled!',
        'Your payment has been canceled.',
        'success'
      ).then(res=>{
        this.router.navigate(["flight-search"])
      });
}





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
