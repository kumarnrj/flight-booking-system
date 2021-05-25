package com.skyindia.flightuserservice;

import com.skyindia.flightuserservice.Repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EnableMongoRepositories(basePackageClasses = UserRepository.class)
public class FlightUserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlightUserServiceApplication.class, args);
	}

}
