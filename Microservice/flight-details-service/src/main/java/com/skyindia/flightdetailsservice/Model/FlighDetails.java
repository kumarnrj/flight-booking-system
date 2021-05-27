package com.skyindia.flightdetailsservice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "flightDetails")
public class FlighDetails {

    @Id
    private String _id;

    private String source;
    private String destination;
    private String date;
    private String arrivalTime;
    private String departureTime;
    private String flightNo;
    private String duration;
    private String price;

    public FlighDetails(){}

    public FlighDetails(String _id, String source, String destination, String date, String arrivalTime, String departureTime, String flightNo, String duration, String price) {
        this._id = _id;
        this.source = source;
        this.destination = destination;
        this.date = date;
        this.arrivalTime = arrivalTime;
        this.departureTime = departureTime;
        this.flightNo = flightNo;
        this.duration = duration;
        this.price = price;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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

    public String getFlightNo() {
        return flightNo;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "FlighDetails{" +
                "_id='" + _id + '\'' +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", date='" + date + '\'' +
                ", arrivalTime='" + arrivalTime + '\'' +
                ", departureTime='" + departureTime + '\'' +
                ", flightNo='" + flightNo + '\'' +
                ", duration='" + duration + '\'' +
                ", price='" + price + '\'' +
                '}';
    }
}
