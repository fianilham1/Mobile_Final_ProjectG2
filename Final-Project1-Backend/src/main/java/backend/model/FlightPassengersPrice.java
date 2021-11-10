package main.java.backend.model;

public class FlightPassengersPrice {
    private Double adult; //100% take seat
    private Double child; //80% take seat
    private Double infant; //10% no seat

    public Double getAdult() {
        return adult;
    }

    public void setAdult(Double adult) {
        this.adult = adult;
    }

    public Double getChild() {
        return child;
    }

    public void setChild(Double child) {
        this.child = child;
    }

    public Double getInfant() {
        return infant;
    }

    public void setInfant(Double infant) {
        this.infant = infant;
    }
}
