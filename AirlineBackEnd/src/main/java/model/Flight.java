package main.java.model;


public class Flight {

    //private int flightId;
    private String airlineName;
    private String code;
    private String fromAirport;
    private String toAirport;
    private String departureDate;
    private String departureDateTime;
    private String arrivalDateTime;
    private String seatClass; //Economy PremiumEconomy Business FirstClass
    private Double price;
    private boolean entertainment;
    private boolean wifi;
    private boolean powerOrUSBPort;
    private boolean meals;
    private String aircraftType;
    private String seatLayout;
    private String seatPitch;
    private int numberTransit;
    private String transitLocation;
    private String transitDuration;
    private int numberBaggageAvailable;
    private String baggageData;
    private int numberSeatAvailable;
    private String seatRegularZone;
    private String seatGreenZone;
    private String seatSold;

    public Flight() {}

//    public int getFlightId() {
//        return flightId;
//    }
//
//    public void setFlightId(int flightId) {
//        this.flightId = flightId;
//    }

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

    public String getDepartureDateTime() {
        return departureDateTime;
    }

    public void setDepartureDateTime(String departureDateTime) {
        this.departureDateTime = departureDateTime;
    }

    public String getArrivalDateTime() {
        return arrivalDateTime;
    }

    public void setArrivalDateTime(String arrivalDateTime) {
        this.arrivalDateTime = arrivalDateTime;
    }

    public String getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(String seatClass) {
        this.seatClass = seatClass;
    }

    // #############################################

    public String getAirlineName() {
        return airlineName;
    }

    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public boolean getEntertainment(){return entertainment;}

    public void setEntertainment(boolean entertainment) {
        this.entertainment = entertainment;
    }

    public boolean getWifi(){return wifi;}

    public void setWifi(boolean wifi) {
        this.wifi = wifi;
    }

    public boolean getPowerOrUSBPort(){return powerOrUSBPort;}

    public void setPowerOrUSBPort(boolean powerOrUSBPort) {
        this.powerOrUSBPort = powerOrUSBPort;
    }

    public boolean getMeals(){return meals;}

    public void setMeals(boolean meals) {
        this.meals = meals;
    }

    public String getAircraftType() {
        return aircraftType;
    }

    public void setAircraftType(String aircraftType) {
        this.aircraftType = aircraftType;
    }

    public String getSeatLayout() {
        return seatLayout;
    }

    public void setSeatLayout(String seatLayout) {
        this.seatLayout = seatLayout;
    }

    public String getSeatPitch() {
        return seatPitch;
    }

    public void setSeatPitch(String seatPitch) {
        this.seatPitch = seatPitch;
    }

    public int getNumberTransit() {
        return numberTransit;
    }

    public void setNumberTransit(int numberTransit) {
        this.numberTransit = numberTransit;
    }

    public String getTransitLocation() {
        return transitLocation;
    }

    public void setTransitLocation(String transitLocation) {
        this.transitLocation = transitLocation;
    }

    public String getTransitDuration() {
        return transitDuration;
    }

    public void setTransitDuration(String transitDuration) {
        this.transitDuration = transitDuration;
    }

    public int getNumberBaggageAvailable() {
        return numberBaggageAvailable;
    }

    public void setNumberBaggageAvailable(int numberBaggageAvailable) {
        this.numberBaggageAvailable = numberBaggageAvailable;
    }

    public String getBaggageData() {
        return baggageData;
    }

    public void setBaggageData(String baggageData) {
        this.baggageData = baggageData;
    }

    public int getNumberSeatAvailable() {
        return numberSeatAvailable;
    }

    public void setNumberSeatAvailable(int numberSeatAvailable) {
        this.numberSeatAvailable = numberSeatAvailable;
    }

    public String getSeatRegularZone() {
        return seatRegularZone;
    }

    public void setSeatRegularZone(String seatRegularZone) {
        this.seatRegularZone = seatRegularZone;
    }

    public String getSeatGreenZone() {
        return seatGreenZone;
    }

    public void setSeatGreenZone(String seatGreenZone) {
        this.seatGreenZone = seatGreenZone;
    }

    public String getSeatSold() {
        return seatSold;
    }

    public void setSeatSold(String seatSold) {
        this.seatSold = seatSold;
    }


    //    @Override
//    public String toString() {
//        return "User [id=" + getId()
//                + ", name=" + getName()
//                + ", username=" + getUsername()
//				+ ", password=" + getPassword()
//                + "]";
//    }

}
