package main.java.backend.model;

public class PurchaseFlightPrice {
    private FlightPassengersNumber passengersNumber;
    private FlightPassengersPrice passengersPrice;

    public FlightPassengersNumber getPassengersNumber() {
        return passengersNumber;
    }

    public void setPassengersNumber(FlightPassengersNumber passengersNumber) {
        this.passengersNumber = passengersNumber;
    }

    public FlightPassengersPrice getPassengersPrice() {
        return passengersPrice;
    }

    public void setPassengersPrice(FlightPassengersPrice passengersPrice) {
        this.passengersPrice = passengersPrice;
    }

}
