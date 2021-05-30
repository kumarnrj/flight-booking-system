import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingDetails } from 'src/app/Models/BookingDetails';
import { AuthSerivceService } from 'src/app/service/auth-serivce.service';
import   jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {

  public bookingList:BookingDetails[] |undefined;

  constructor(private auth:AuthSerivceService) { }
  
  ngOnInit(): void {
    setTimeout(() => {
    
      this.auth.getAllBooking()
        .subscribe((res:any) => {
          this.bookingList = res;
        })
  }, 1);
  }

  cancelOrder(booking:any){}

  head = [['ID', 'NAME', 'DESIGNATION', 'DEPARTMENT']]

  download(booking:any){
    console.log(booking)

    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Ticket Detail', 80, 8);
    doc.setFontSize(15);
    doc.setTextColor(100);
    doc.text(`Source: ${booking.source}`,25,25);
    doc.text(`Destination: ${booking.destination}`,80,25)
    doc.text(`Arrival Time: ${booking.arrivalTime}`,25,40)
    doc.text(`Departure Time: ${booking.departureTime}`,80,40)
    doc.text(`Date: ${booking.date}`,25,50)
    doc.text(`Price: ${booking.price}`,80,50)
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
        doc.text(`Name: ${booking.passengers[i].firstname} ${booking.passengers[i].lastname}`,x1,y1+10)
        doc.text(`Contact: ${booking.passengers[i].contact}`,x2,y2+10)
      }
    }
     // below line for Open PDF document in new tab
     doc.output('dataurlnewwindow')

     // below line for Download PDF document  
     doc.save('myteamdetail.pdf');
    
  }  
}





