package com.skyindia.flightdetailsservice.Controller;


import com.skyindia.flightdetailsservice.Model.FlighDetails;
import com.skyindia.flightdetailsservice.Model.Responce;
import com.skyindia.flightdetailsservice.Service.FlightDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.cors.reactive.PreFlightRequestWebFilter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class flightDetailsController {


    @Autowired
    FlightDetailsService flightDetailsService;

    @GetMapping("/allFlight")
    public List<FlighDetails> getAllFlightDetails(){
        return  flightDetailsService.getAllFlights();
    }


    @GetMapping("/byId/{flightId}")
    public FlighDetails getFlightById(@PathVariable("flightId") String flighId){
        return  flightDetailsService.getFlighById(flighId);
    }

    @PostMapping("/getBySource")
    public List<FlighDetails> getFlightsBySource(@RequestBody Map<String,Object> request){
        String source = request.get("source").toString().toLowerCase();
        String destination = request.get("destination").toString().toLowerCase();
        String date = request.get("date").toString();

        List<FlighDetails> list = new ArrayList<>();

        list = flightDetailsService.getFlightBySource(source).stream().filter(flight->destination.equals(flight.getDestination().toLowerCase()) &&
                date.equals(flight.getDate())).collect(Collectors.toList());

        return  list;

    }

    @PostMapping("/addFlight")
    public FlighDetails addFlight(@RequestBody FlighDetails flighDetails){
        flighDetails.setDestination(flighDetails.getDestination().toLowerCase());
        flighDetails.setSource(flighDetails.getSource().toLowerCase());
        return flightDetailsService.addFlight(flighDetails);
    }

    @PutMapping("/updateFlight/{flightId}")
    public FlighDetails updateFlight(@RequestBody FlighDetails flighDetails,@PathVariable("flightId") String flightId){
        FlighDetails updateFlight = flightDetailsService.updateFlight(flighDetails,flightId);
        return  updateFlight;
    }

    @DeleteMapping("/deleteFlight/{flightId}")
    public ResponseEntity<?> deleteFlight(@PathVariable("flightId") String flightId){
        boolean isFlightDeleted = flightDetailsService.deleteUser(flightId);
        if(isFlightDeleted)
            return ResponseEntity.ok(new Responce("Deleted successfully"));
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Responce("User Not found"));
    }

}
