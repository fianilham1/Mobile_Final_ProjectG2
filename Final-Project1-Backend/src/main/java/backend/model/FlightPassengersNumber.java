package main.java.backend.model;

public class FlightPassengersNumber {
    private int adult; //100% take seat
    private int child; //80% take seat
    private int infant; //10% no seat

    public int getAdult() {
        return adult;
    }

    public void setAdult(int adult) {
        this.adult = adult;
    }

    public int getChild() {
        return child;
    }

    public void setChild(int child) {
        this.child = child;
    }

    public int getInfant() {
        return infant;
    }

    public void setInfant(int infant) {
        this.infant = infant;
    }
}
