package main.java.backend.model;

public class FlightInsurances {
    private boolean travelInsurance;
    private boolean covid19Insurance;
    private boolean flightDelayInsurance;
    private boolean baggageLossProtection;

    public boolean getTravelInsurance() {
        return travelInsurance;
    }

    public void setTravelInsurance(boolean travelInsurance) {
        this.travelInsurance = travelInsurance;
    }

    public boolean getCovid19Insurance() {
        return covid19Insurance;
    }

    public void setCovid19Insurance(boolean covid19Insurance) {
        this.covid19Insurance = covid19Insurance;
    }

    public boolean getFlightDelayInsurance() {
        return flightDelayInsurance;
    }

    public void setFlightDelayInsurance(boolean flightDelayInsurance) {
        this.flightDelayInsurance = flightDelayInsurance;
    }

    public boolean getBaggageLossProtection() {
        return baggageLossProtection;
    }

    public void setBaggageLossProtection(boolean baggageLossProtection) {
        this.baggageLossProtection = baggageLossProtection;
    }


}
