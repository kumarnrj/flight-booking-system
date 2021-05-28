package com.skyindia.flightbookingservice.Model;

public class Passenger {
    private String firstname;
    private String lastname;
    private String contact;
    private String age;
    private String gender;

    public Passenger() {
    }

    public Passenger(String firstname, String lastname, String contact, String age, String gender) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.contact = contact;
        this.age = age;
        this.gender = gender;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "Passenger{" +
                "Firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", contact='" + contact + '\'' +
                ", age='" + age + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
