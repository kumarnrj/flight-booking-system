package com.skyindia.flightuserservice.Service;

import com.skyindia.flightuserservice.Model.User;
import com.skyindia.flightuserservice.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> getAllUser(){
        return userRepository.findAll();
    }

    public User getUserById(String id){
        Optional<User> user=userRepository.findById(id);
        return  user.get();
    }

    public  User getUserByEmail(String email){
        Optional<User> user = userRepository.findByEmail(email);
        return  user.get();


    }

    public User addUser(User user){

        try{
            userRepository.findByEmail(user.getEmail()).get().getEmail();
            return  null;
        } catch (NoSuchElementException e){
            return userRepository.insert(user);
        }

    }

    public User updateUser(User user,String userId){
        if(userRepository.existsById(userId)) {
            User existingUser = userRepository.findById(userId).get();
            user.set_id(existingUser.get_id());
            user.setPassword(existingUser.getPassword());
            if (user.getFirstname() == null) {
                user.setFirstname(existingUser.getFirstname());
            }
            if (user.getLastname() == null) {
                user.setLastname(existingUser.getLastname());
            }
            if (user.getEmail() == null) {
                user.setEmail(existingUser.getEmail());
            }
            if(user.getContact()==null){
                user.setContact(existingUser.getContact());
            }

            if(user.getAge()==0){
                user.setAge(existingUser.getAge());
            }

            if(user.getGender()==null){
                user.setGender(existingUser.getGender());
            }

            if(user.getRole().equals(existingUser.getRole())==false){
                user.setRole(existingUser.getRole());
            }

            return userRepository.save(user);
        }
        else{
           return  null;
        }


    }


    public  boolean deleteUser(String userId){
        if(userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }else{
            return  false;
        }
    }



}
