package com.skyindia.flightdetailsservice.Service;


import com.skyindia.flightdetailsservice.Model.FlighDetails;
import com.skyindia.flightdetailsservice.Repository.FlightDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightDetailsService {

    @Autowired
    FlightDetailsRepo flightDetailsRepo;

    public List<FlighDetails> getAllFlights(){
        return  flightDetailsRepo.findAll();
    }

    public List<FlighDetails> getFlightBySource(String source){
        return  flightDetailsRepo.findBySource(source);
    }

    public FlighDetails addFlight(FlighDetails newFlightDetail){
        return  flightDetailsRepo.save(newFlightDetail);
    }

    public boolean deleteFlight(FlighDetails flighDetails){
        flightDetailsRepo.delete(flighDetails);
        if(flightDetailsRepo.existsById(flighDetails.get_id())){
            return false;
        }
        else{
            return  true;
        }
    }

    public FlighDetails getFlighById(String flighId) {
        return flightDetailsRepo.findById(flighId).get();
    }
}
