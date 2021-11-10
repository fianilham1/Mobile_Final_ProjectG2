package main.java.backend.model;

public class FlightRequest {
    private String fromAirport;
    private String toAirport;
    private String departureDate;
    private String returnDate;
    private String seatClass; //Economy PremiumEconomy Business FirstClass
    private FlightPassengersNumber passengers;
    private boolean includeFlexibleTicket;
    private String sortBy;

    public String getFromAirport() {
        return fromAirport;
    }

    public void setFromAirport(String fromAirport) {
        this.fromAirport = fromAirport;
    }

    public String getToAirport() {
        return toAirport;
    }

    public void setToAirport(String toAirport) {
        this.toAirport = toAirport;
    }

    public String getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }

    public FlightPassengersNumber getPassengers() {
        return passengers;
    }

    public void setPassengers(FlightPassengersNumber passengers) {
        this.passengers = passengers;
    }

    public String getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(String seatClass) {
        this.seatClass = seatClass;
    }

    public boolean getIncludeFlexibleTicket() {
        return includeFlexibleTicket;
    }

    public void setIncludeFlexibleTicket(boolean includeFlexibleTicket) {
        this.includeFlexibleTicket = includeFlexibleTicket;
    }

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }



}
