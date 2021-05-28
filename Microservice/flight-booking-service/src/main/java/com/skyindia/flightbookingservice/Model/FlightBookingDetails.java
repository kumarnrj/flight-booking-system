package com.skyindia.flightbookingservice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "FlightBookingDetails")
public class FlightBookingDetails {
    @Id
    private String _id;

    private String customerId;
    private String custmerFirstname;
    private String customerLastname;
    private String customerContact;
    private String source;
    private String destination;
    private String  arrivalTime;
    private String departureTime;
    private  String date;
    private String paymentStatus;
    private String bookingStatus;
    private String paymentId;
    private List<Passenger> passengers;

    public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }

    public FlightBookingDetails() { }


    public FlightBookingDetails(String _id, String customerId, String custmerFirstname, String customerLastname, String customerContact, String source, String destination, String arrivalTime, String departureTime, String date, String paymentStatus, String bookingStatus, String paymentId, List<Passenger> passengers) {
        this._id = _id;
        this.customerId = customerId;
        this.custmerFirstname = custmerFirstname;
        this.customerLastname = customerLastname;
        this.customerContact = customerContact;
        this.source = source;
        this.destination = destination;
        this.arrivalTime = arrivalTime;
        this.departureTime = departureTime;
        this.date = date;
        this.paymentStatus = paymentStatus;
        this.bookingStatus = bookingStatus;
        this.paymentId = paymentId;
        this.passengers = passengers;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCustmerFirstname() {
        return custmerFirstname;
    }

    public void setCustmerFirstname(String custmerFirstname) {
        this.custmerFirstname = custmerFirstname;
    }

    public String getCustomerLastname() {
        return customerLastname;
    }

    public void setCustomerLastname(String customerLastname) {
        this.customerLastname = customerLastname;
    }

    public String getCustomerContact() {
        return customerContact;
    }

    public void setCustomerContact(String customerContact) {
        this.customerContact = customerContact;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }


    @Override
    public String toString() {
        return "FlightBookingDetails{" +
                "_id='" + _id + '\'' +
                ", customerId='" + customerId + '\'' +
                ", custmerFirstname='" + custmerFirstname + '\'' +
                ", customerLastname='" + customerLastname + '\'' +
                ", customerContact='" + customerContact + '\'' +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", arrivalTime='" + arrivalTime + '\'' +
                ", departureTime='" + departureTime + '\'' +
                ", date='" + date + '\'' +
                ", paymentStatus='" + paymentStatus + '\'' +
                ", bookingStatus='" + bookingStatus + '\'' +
                ", paymentId='" + paymentId + '\'' +
                ", passengers=" + passengers +
                '}';
    }
}
