package main.java.model;

import java.util.List;

public class InformationPurchase {
    private List<FlightPassengersInformation> passengers;
    private List<FlightPassengersDetailsFacilities> facilities;
    private List<String> code;

    public List<FlightPassengersInformation> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<FlightPassengersInformation> passengers) {
        this.passengers = passengers;
    }

    public List<FlightPassengersDetailsFacilities> getFacilities() {
        return facilities;
    }

    public void setFacilities(List<FlightPassengersDetailsFacilities> facilities) {
        this.facilities = facilities;
    }

    public List<String> getCode() {
        return code;
    }

    public void setCode(List<String> code) {
        this.code = code;
    }

}
