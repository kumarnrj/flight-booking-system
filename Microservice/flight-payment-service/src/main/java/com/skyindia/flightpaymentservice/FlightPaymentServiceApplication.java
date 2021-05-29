package com.skyindia.flightpaymentservice;

import com.skyindia.flightpaymentservice.Repository.PaymentRepo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EnableMongoRepositories(basePackageClasses = PaymentRepo.class)
public class FlightPaymentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlightPaymentServiceApplication.class, args);
	}

}
