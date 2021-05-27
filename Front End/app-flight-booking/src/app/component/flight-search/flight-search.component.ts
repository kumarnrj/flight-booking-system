import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MinLengthValidator } from '@angular/forms';
import { flightDetail } from 'src/app/Models/FlightDetail';
import { AuthSerivceService } from 'src/app/service/auth-serivce.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {

  submitted=false;
  public source="";
  public destination="";
  public date2="";
  public SourceList = ["DELHI","MUMBAI","KOLKATA","CHENNAI","BANGALORE","NEWYORK","LONDON","SYDNEY","DUBAI","BANGKOK"];
  public DistinationList=["DELHI","MUMBAI","KOLKATA","CHENNAI","BANGALORE","NEWYORK","LONDON","SYDNEY","DUBAI","BANGKOK"];
  public searchClicked=false;

  public flighDetailsList:flightDetail[] | undefined;
  
  public min = this.datepipe.transform(new Date().toLocaleDateString(),"yyyy-MM-dd");
 
 private today = new Date();
private dd = this.today.getDate() >10?this.today.getDate():'0'+this.today.getDate();
private mm =(this.today.getMonth()+1) >9 ?this.today.getMonth():'0'+(this.today.getMonth()+2); //January is 0!
private yyyy =this. today.getFullYear();
 
  public max=this.yyyy+"-"+this.mm+"-"+this.dd ;
  
  constructor(private datepipe:DatePipe,private auth:AuthSerivceService) { }

  ngOnInit(): void {
   
console.log(this.max);
    console.log(this.min)
    
  }

  // searching the flight
  search(){
    this.searchClicked = true;
    console.log(this.source,this.destination,this.date2);
    let date = this.datepipe.transform(this.date2,"dd-MM-yyyy");
 
    this.auth.getFlightDetailsBySource(this.source,this.destination,date)
    .subscribe((res:flightDetail[])=>{
      this.flighDetailsList = res;
      if(this.flighDetailsList.length===0){
           swal.fire("Sorry","No Flights available ","info");
           this.searchClicked=false;
      }
    })
  }

  // booking a flight
  bookTicket(flight:flightDetail){

  }
}
