package main.java.backend.model;

import java.util.List;

public class PurchaseFlight {
    private int purchaseId;
    private String username;
    private ContactDetails contactDetails;
    private List<NewFlightFormat> flightList;
    private int totalPassengers;
    private List<FlightPassengersDetails> flightPassengersList;
    private FlightInsurances flightInsurances;
    private Double totalPrice;
    private PurchaseFlightPrice priceDetails;
    private String statusPayment;
    private String virtualAccountOfPayment;

    public int getPurchaseId() {
        return purchaseId;
    }

    public void setPurchaseId(int purchaseId) {
        this.purchaseId = purchaseId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ContactDetails getContactDetails() {
        return contactDetails;
    }

    public void setContactDetails(ContactDetails contactDetails) {
        this.contactDetails = contactDetails;
    }

    public List<NewFlightFormat> getFlightList() {
        return flightList;
    }

    public void setFlightList(List<NewFlightFormat> flightList) {
        this.flightList = flightList;
    }

    public int getTotalPassengers() {
        return totalPassengers;
    }

    public void setTotalPassengers(int totalPassengers) {
        this.totalPassengers = totalPassengers;
    }

    public List<FlightPassengersDetails> getFlightPassengersList() {
        return flightPassengersList;
    }

    public void setFlightPassengersList(List<FlightPassengersDetails> flightPassengersList) {
        this.flightPassengersList = flightPassengersList;
    }

    public FlightInsurances getFlightInsurances() {
        return flightInsurances;
    }

    public void setFlightInsurances(FlightInsurances flightInsurances) {
        this.flightInsurances = flightInsurances;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public PurchaseFlightPrice getPriceDetails() {
        return priceDetails;
    }

    public void setPriceDetails(PurchaseFlightPrice priceDetails) {
        this.priceDetails = priceDetails;
    }

    public String getStatusPayment() {
        return statusPayment;
    }

    public void setStatusPayment(String statusPayment) {
        this.statusPayment = statusPayment;
    }

    public String getVirtualAccountOfPayment() {
        return virtualAccountOfPayment;
    }

    public void setVirtualAccountOfPayment(String virtualAccountOfPayment) {
        this.virtualAccountOfPayment = virtualAccountOfPayment;
    }

}
