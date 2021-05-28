package com.skyindia.flightbookingservice.Repository;

import com.skyindia.flightbookingservice.Model.FlightBookingDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends MongoRepository<FlightBookingDetails,String> {

    List<FlightBookingDetails> findByCustomerId(String id);
}
