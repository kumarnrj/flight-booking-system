package com.skyindia.flightdetailsservice;

import com.skyindia.flightdetailsservice.Repository.FlightDetailsRepo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EnableMongoRepositories(basePackageClasses = FlightDetailsRepo.class)
public class FlightDetailsServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlightDetailsServiceApplication.class, args);
	}

}
