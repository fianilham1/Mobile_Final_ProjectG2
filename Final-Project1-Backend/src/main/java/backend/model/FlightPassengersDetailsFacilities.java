package main.java.backend.model;

public class FlightPassengersDetailsFacilities {
    private int baggage;
    private String seatNumber;
    private String seatNumberType;
    private String code;

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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
