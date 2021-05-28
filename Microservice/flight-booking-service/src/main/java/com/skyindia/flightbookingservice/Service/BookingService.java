package com.skyindia.flightbookingservice.Service;

import com.skyindia.flightbookingservice.BookingController.BookingController;
import com.skyindia.flightbookingservice.Model.FlightBookingDetails;
import com.skyindia.flightbookingservice.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    BookingRepository repository;


    public List<FlightBookingDetails> getAllBooking() {
        return repository.findAll();
    }

    public FlightBookingDetails getBookingByBookingId(String bookingId) {
        return  repository.findById(bookingId).get();
    }

    public List<FlightBookingDetails> getBookingByCustomerId(String customerId) {
        return  repository.findByCustomerId(customerId);
    }

    public FlightBookingDetails addBooking(FlightBookingDetails flightBookingDetails) {
        return repository.save(flightBookingDetails);
    }

    public FlightBookingDetails updateBooking(FlightBookingDetails flightBookingDetails) {
         return  repository.save(flightBookingDetails);

    }
}
