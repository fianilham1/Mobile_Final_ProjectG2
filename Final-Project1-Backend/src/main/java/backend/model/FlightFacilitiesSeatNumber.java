package main.java.backend.model;

import java.util.List;

public class FlightFacilitiesSeatNumber {
    private List<FlightPassengersInformation> departureflight;
    private List<FlightPassengersInformation> returnflight;

    public List<FlightPassengersInformation> getDepartureflight() {
        return departureflight;
    }

    public void setDepartureflight(List<FlightPassengersInformation> departureflight) {
        this.departureflight = departureflight;
    }

    public List<FlightPassengersInformation> getReturnflight() {
        return returnflight;
    }

    public void setReturnflight(List<FlightPassengersInformation> returnflight) {
        this.returnflight = returnflight;
    }
}
