package main.java.backend.model;

public class FlightPassengersDetails {
    private String name;
    private String birthDate;
    private String nationality;
    private String personClass;
    private FlightPassengersDetailsFacilities departureDetails;
    private FlightPassengersDetailsFacilities returnDetails;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getPersonClass() {
        return personClass;
    }

    public void setPersonClass(String personClass) {
        this.personClass = personClass;
    }

    public FlightPassengersDetailsFacilities getDepartureDetails() {
        return departureDetails;
    }

    public void setDepartureDetails(FlightPassengersDetailsFacilities departureDetails) {
        this.departureDetails = departureDetails;
    }

    public FlightPassengersDetailsFacilities getReturnDetails() {
        return returnDetails;
    }

    public void setReturnDetails(FlightPassengersDetailsFacilities returnDetails) {
        this.returnDetails = returnDetails;
    }


}
