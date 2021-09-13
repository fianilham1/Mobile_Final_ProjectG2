package main.java.backend.model;

public class FlightFacilities {
    private FlightFacilitiesBaggage baggage;
    private FlightFacilitiesSeatNumber seatNumber;
    private boolean freeProtection;

    public FlightFacilitiesBaggage getBaggage() {
        return baggage;
    }

    public void setBaggage(FlightFacilitiesBaggage baggage) {
        this.baggage = baggage;
    }

    public FlightFacilitiesSeatNumber getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(FlightFacilitiesSeatNumber seatNumber) {
        this.seatNumber = seatNumber;
    }

    public boolean getFreeProtection() {
        return freeProtection;
    }

    public void setFreeProtection(boolean freeProtection) {
        this.freeProtection = freeProtection;
    }
}
