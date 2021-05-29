import { Component, OnInit } from '@angular/core';
import { BookingDetails } from 'src/app/Models/BookingDetails';
import { AuthSerivceService } from 'src/app/service/auth-serivce.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

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

}
