package com.skyindia.flightdetailsservice.Repository;

import com.skyindia.flightdetailsservice.Model.FlighDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FlightDetailsRepo extends MongoRepository<FlighDetails,String> {


    List<FlighDetails> findBySource(String source);
}
