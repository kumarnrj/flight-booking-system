package com.skyindia.flightpaymentservice.Repository;


import com.skyindia.flightpaymentservice.Model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepo extends MongoRepository<Payment,String> {

}
