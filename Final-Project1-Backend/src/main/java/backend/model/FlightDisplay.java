package main.java.backend.model;

import java.util.List;

public class FlightDisplay {
    private List<NewFlightFormat> departureflight;
    private List<NewFlightFormat> returnflight;

    public List<NewFlightFormat> getDepartureflight() {
        return departureflight;
    }

    public void setDepartureflight(List<NewFlightFormat> departureflight) {
        this.departureflight = departureflight;
    }

    public List<NewFlightFormat> getReturnflight() {
        return returnflight;
    }

    public void setReturnflight(List<NewFlightFormat> returnflight) {
        this.returnflight = returnflight;
    }

}
