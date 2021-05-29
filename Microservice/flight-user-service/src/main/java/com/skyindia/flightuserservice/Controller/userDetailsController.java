package com.skyindia.flightuserservice.Controller;


import com.skyindia.flightuserservice.Model.AuthenticationRequest;
import com.skyindia.flightuserservice.Model.AuthenticationResponse;
import com.skyindia.flightuserservice.Model.Response;
import com.skyindia.flightuserservice.Model.User;
import com.skyindia.flightuserservice.Service.MyUserDetailService;
import com.skyindia.flightuserservice.Service.UserService;
import com.skyindia.flightuserservice.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class userDetailsController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailService myUserDetailService;

    @Autowired
    private JwtUtil jwtTokenUtil;


    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest ) throws Exception {

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),authenticationRequest.getPassword())
            );

        }catch (BadCredentialsException e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }



        final UserDetails userDetails = myUserDetailService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt= jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));

    }


    @GetMapping("/allUser")
    public ResponseEntity<List<User>> getAllUser(){
        return ResponseEntity.ok().body(userService.getAllUser());
    }


    /**
     * returns a user details based on the user id.
     */
    @GetMapping("/userId/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") String userId ){

        return ResponseEntity.ok().body(userService.getUserById(userId));
        // return  userService.getUserById(userId);
    }

    /**
     *Returns true if the user with the email is exists in the database
     * else returns false
     */
    @GetMapping("/findByEmail/{email}")
    public User getUserByEmail(@PathVariable String email){
        return  userService.getUserByEmail(email);
    }

    /**
     *
     *  adds the user into the database
     */

    @PostMapping("/addUser")
    public ResponseEntity<?> Adduser(@RequestBody User user ){


        User user1 = userService.addUser(user);
        System.out.println(user.getPassword());
        if(user1==null){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already Present");
        }
        else{

            return  ResponseEntity.ok().body(user1);     }
    }

    @PutMapping("/updateUser/{userId}")
    public User updateUser(@RequestBody User user, @PathVariable("userId") String userId){
        System.out.println(user);
        User user1= userService.updateUser(user,userId);
        return user1;

    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") String userId){
        boolean isUserDeleted = userService.deleteUser(userId);
        if(isUserDeleted)
            return ResponseEntity.ok(new Response("Deleted successfully"));
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response("User Not found"));
    }



}
