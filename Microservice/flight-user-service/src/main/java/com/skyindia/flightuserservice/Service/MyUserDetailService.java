package com.skyindia.flightuserservice.Service;


import com.skyindia.flightuserservice.Model.MyUserDetails;
import com.skyindia.flightuserservice.Model.User;
import com.skyindia.flightuserservice.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailService implements UserDetailsService {

   @Autowired
   UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email)  {

       Optional<User> user= userRepo.findByEmail(email);

       user.orElseThrow(()->new UsernameNotFoundException("Not found "+email));

       return user.map(MyUserDetails::new).get();
    }
}
