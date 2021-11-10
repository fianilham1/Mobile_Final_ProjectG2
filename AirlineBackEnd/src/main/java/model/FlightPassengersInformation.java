package main.java.model;

public class FlightPassengersInformation {
    private String name;
    private String birthDate;
    private String nationality;
    private String personClass;
    private int baggage;
    private String seatNumber;
    private String seatNumberType;

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

    public int getBaggage() {
        return baggage;
    }

    public void setBaggage(int baggage) {
        this.baggage = baggage;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getSeatNumberType() {
        return seatNumberType;
    }

    public void setSeatNumberType(String seatNumberType) {
        this.seatNumberType = seatNumberType;
    }
}
