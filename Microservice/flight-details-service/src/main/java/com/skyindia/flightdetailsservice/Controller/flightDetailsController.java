package com.skyindia.flightdetailsservice.Controller;


import com.skyindia.flightdetailsservice.Model.FlighDetails;
import com.skyindia.flightdetailsservice.Service.FlightDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

}
