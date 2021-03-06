package com.skyindia.flightbookingservice.BookingController;

import com.skyindia.flightbookingservice.Model.FlightBookingDetails;
import com.skyindia.flightbookingservice.Model.Response;
import com.skyindia.flightbookingservice.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.datatransfer.FlavorListener;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService service;


    @GetMapping("/allbooking")
    public ResponseEntity<?> getAllBooking(){

        List<FlightBookingDetails> bookinglist = service.getAllBooking();
        return  ResponseEntity.ok(bookinglist);
    }

    @GetMapping("/findById/{bookingId}")
    public ResponseEntity<?> getBookingDetailsByBookingId(@PathVariable("bookingId") String bookingId){
        FlightBookingDetails flightBookingDetails = service.getBookingByBookingId(bookingId);
        if(flightBookingDetails!=null){
            return  ResponseEntity.ok(flightBookingDetails);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response("not found"));
        }
    }

    @GetMapping("/findByCustomerId/{customerId}")
    public  ResponseEntity<?> getBookingDetailsByCustomerId(@PathVariable("customerId") String customerId){

       List<FlightBookingDetails> list=  service.getBookingByCustomerId(customerId);
       return ResponseEntity.ok(list);
    }

    @PostMapping("/addBooking")
    public ResponseEntity<?> addBooking(@RequestBody FlightBookingDetails flightBookingDetails){
        System.out.println(flightBookingDetails);
        flightBookingDetails.setBookingStatus("PENDING");
        FlightBookingDetails flightBookingDetails1 = service.addBooking(flightBookingDetails);
        return ResponseEntity.ok(flightBookingDetails);
    }

    @PutMapping("/updateBooking/{orderId}")
    public ResponseEntity<?> updateBooking(@RequestBody FlightBookingDetails flightBookingDetails,@PathVariable("orderId") String orderId){
        FlightBookingDetails flightBookingDetails1 = service.updateBooking(flightBookingDetails,orderId);
        return ResponseEntity.ok(flightBookingDetails);
    }

    @PutMapping("/updatePaymentStatus")
    public ResponseEntity<?> updatePaymentStatus(@RequestBody Map<String,Object> orderDetails){
        String paymentStatus=orderDetails.get("paymentStatus").toString();
        String paymentId= orderDetails.get("payment_id").toString();
        String orderId = orderDetails.get("orderId").toString();
        FlightBookingDetails updatedFlightDetail = service.updatePaymentStatus(paymentId,paymentStatus,orderId);
        return ResponseEntity.ok(updatedFlightDetail);
    }


}
