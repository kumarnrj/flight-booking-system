import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingDetails } from 'src/app/Models/BookingDetails';
import { AuthSerivceService } from 'src/app/service/auth-serivce.service';
import   jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import swal from 'sweetalert2';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {

  public bookingList:BookingDetails[] |undefined;

  public iswarning=true;
  public isPill = true;

  constructor(private auth:AuthSerivceService) { }
  
  ngOnInit(): void {
    setTimeout(() => {
    
      this.auth.getAllBookingByCustomerId(localStorage.getItem("id"))
        .subscribe((res:any) => {
          this.bookingList = res;
        })
  }, 1);
  }

  //cancel Order is clicked
  cancelOrder(booking:any){

  swal.fire({
              title: 'Are you sure?',
              text: "You won't get refund if you cancel the booking",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, cancel it!'
            }).then((result) => {
              if (result.isConfirmed) {
                  let bookingId = booking._id;
                  booking.bookingStatus="CANCELED";

                  this.auth.updateOrder(booking,bookingId)
                  .subscribe(res=>{
                    swal.fire('Canceled!','Your bookig has been canceled.','success')
                  })       
               }
            })
  }


  
// download button clicked
  download(booking:any){
    console.log(booking)

    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Ticket Detail', 80, 8);
    doc.setFontSize(15);
    
    doc.text(`Source: ${booking.source}`,25,25);
    doc.text(`Destination: ${booking.destination}`,80,25)
    doc.text(`Arrival Time: ${booking.arrivalTime}`,25,40)
    doc.text(`Departure Time: ${booking.departureTime}`,80,40)
    doc.text(`Date: ${booking.date}`,25,50)
    doc.text(`FlightNo: ${booking.flightNo}`,80,50)
    doc.line(20, 60, 200, 60)
    doc.setFontSize(18);
    doc.setTextColor("black")
    doc.text('Passenger Details', 80, 70);
   
    doc.setFontSize(15)
    if((booking.passengers.length+1)==1){
      doc.text(`Name: ${booking.custmerFirstname} ${booking.customerLastname}`,25,82)
      doc.text(`Contact: ${booking.customerContact}`,80,82)
    }
    else{
      doc.text(`Name: ${booking.custmerFirstname} ${booking.customerLastname}`,25,82)
      doc.text(`Contact: ${booking.customerContact}`,88,82)
      let x1=25;
      let y1=82;
      let x2=88;
      let y2=82;
      for(let i=0;i< (booking.passengers.length);i++){
        doc.text(`Passenger ${(i+1)+1}`,80,y1+10)
        doc.text(`Name: ${booking.passengers[i].firstname} ${booking.passengers[i].lastname}`,x1,y1+20)
        doc.text(`Contact: ${booking.passengers[i].contact}`,x2,y2+20);
        doc.text(`Age: ${booking.passengers[i].age}`,x1,y1+30);
        doc.text(`Gender: ${booking.passengers[i].gender}`,x2,y2+30)
        y1=y1+30;
        y2=y2+30;
      }
      doc.line(20, y1+5, 200, y2+5)
      y1=y1+5;
      y2=y2+5;
      doc.setFontSize(18);
      doc.text('Payment Details', 80, y1+10);
      y1=y1+10;
      doc.setFontSize(15);
      doc.text(`Payment Status: ${booking.paymentStatus}`,x1,y1+10);
      doc.text(`Payment Id: ${booking.paymentId}`,x2+10,y1+10);
      doc.text(`Booking Status:${booking.bookingStatus}`,x1,y1+20);

      doc.text('Digitally Signed By',150,y1+50);
      doc.text('SkyIndia',150,y1+60)
    }
     

     // below line for Download PDF document  
     doc.save('skyIndiaTicket.pdf');
    
  }  
}





