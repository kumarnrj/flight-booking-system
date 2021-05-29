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

    public FlighDetails updateFlight(FlighDetails flighDetails, String flightId) {
        if(flightDetailsRepo.existsById(flightId)) {
            FlighDetails existingFlight = flightDetailsRepo.findById(flightId).get();
            flighDetails.set_id(existingFlight.get_id());

            if (flighDetails.getSource() == null) {
                flighDetails.setSource(existingFlight.getSource());
            }
            if (flighDetails.getDestination() == null) {
                flighDetails.setDestination(existingFlight.getDestination());
            }
            if (flighDetails.getArrivalTime() == null) {
                flighDetails.setArrivalTime(existingFlight.getArrivalTime());
            }
            if(flighDetails.getDepartureTime()==null){
               flighDetails.setDepartureTime(existingFlight.getDepartureTime());
            }

            if(flighDetails.getFlightNo()==null){
                flighDetails.setFlightNo(existingFlight.getFlightNo());
            }

            if(flighDetails.getDate()==null){
               flighDetails.setDate(existingFlight.getDate());
            }

            if(flighDetails.getPrice()==null){
               flighDetails.setPrice(existingFlight.getPrice());
            }
            if(flighDetails.getDuration()==null){
                flighDetails.setDuration(existingFlight.getDuration());
            }

            return flightDetailsRepo.save(flighDetails);
        }
        else{
            return  null;
        }

    }

    public boolean deleteUser(String flightId) {
        if(flightDetailsRepo.existsById(flightId)) {
            flightDetailsRepo.deleteById(flightId);
            return true;
        }else{
            return  false;
        }
    }
}
