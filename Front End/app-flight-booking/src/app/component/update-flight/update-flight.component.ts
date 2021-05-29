import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { flightDetail } from 'src/app/Models/FlightDetail';
import { AuthSerivceService } from 'src/app/service/auth-serivce.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.scss']
})
export class UpdateFlightComponent implements OnInit {

  @ViewChild('frame') public modal: any;

  public personTest="";
  public isUpdateUser = false;
  public role="";
  private isEditButtonPressed = false;
  public isAddButtonPressed = false;
  private currentFlightId="";

  public flightList: flightDetail[] | undefined;


  constructor(private auth: AuthSerivceService,
    private fb: FormBuilder,
    private router: Router
  ) { }


  EditForm = this.fb.group({
    flightNo:['',Validators.required],
    source:['',Validators.required],
    destination:['',Validators.required],
    arrivalTime:['',Validators.required],
    departureTime:['',Validators.required],
    date:['',Validators.required],
    price:['',Validators.required],
    duration:['',Validators.required]
    
  });



  ngOnInit() {
    
    
    
    // calling the service to fetch the data from database
    setTimeout(() => {
    
        this.auth.getAllFlight()
          .subscribe((res:any) => {
            this.flightList = res;
          })
    }, 1);


  }

  // creating form builder to handle the response in the UI

  get flightNo() {
    return this.EditForm.get('flightNo');
  }

  get source() {
    return this.EditForm.get('source');
  }

  get destination() {
    return this.EditForm.get('destination');
  }

  get arrivalTime() {
    return this.EditForm.get('arrivalTime');
  }

  get departureTime() {
    return this.EditForm.get('departureTime');
  }

  get date(){
    return this.EditForm.get('date');
  }

  get price(){
    return this.EditForm.get('price');
  }

  get duration(){
    return this.EditForm.get('duration')
  }


  // remove the data from the list 

  remove(id: any, userId: any) {
    console.log(id);
    this.flightList?.splice(id, 1);

    // removing the data from the database
    this.auth.removeFlight(userId)
      .subscribe(res => {
        swal.fire("Done", "Flight Deleted", "success");

      })

  }
 
  
 


  // current person details

  edit(flight:any) {
    console.log(flight);
    this.isAddButtonPressed = false;
    this.isEditButtonPressed = true;
    this.currentFlightId = flight._id;
    this.setValueToEditForm(flight);
    
    console.log(this.currentFlightId)
    this.modal.show();
  }

  // setting values to the form
  setValueToEditForm(currentFlight: any) {
    this.EditForm.setValue({
      flightNo: currentFlight.flightNo,
      source: currentFlight.source,
      destination: currentFlight.destination,
      arrivalTime: currentFlight.arrivalTime,
      departureTime: currentFlight.departureTime,
      date:currentFlight.date,
      price:currentFlight.price,
      duration:currentFlight.duration
     
    })
  }

  // adding a new user
  addFlight() {
    this.isEditButtonPressed = false
    this.isAddButtonPressed = true;
    this.EditForm.reset();
    this.modal.show();
  }


  // // On Submitting the form
  onSubmit() {
    if (this.isEditButtonPressed) {
      console.log(this.EditForm.value);
      console.log(this.currentFlightId);
      this.isEditButtonPressed = false;
      this.auth.updateFlight(this.EditForm.value, this.currentFlightId)
        .subscribe(res => {
          this.modal.hide();
          swal.fire("Done", "Updated Successfully", "success");
          this.ngOnInit();

        })
    }
    if (this.isAddButtonPressed) {
      
        this.auth.addFlight(this.EditForm.value)
          .subscribe(res => {
            this.modal.hide();
            swal.fire("Done", "Flight Added", "success");
            this.ngOnInit();
            this.isAddButtonPressed=false;
          })
      }
  }

}
