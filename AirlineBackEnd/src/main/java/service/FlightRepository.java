package main.java.service;

import main.java.model.Flight;

import java.util.List;

public interface FlightRepository {
    public List<Flight> findFlightFromDB(Flight flight, String sortBy) throws Exception;
    public Flight flightOrderedList(String code) throws Exception;
    public void update(int totalPassengers, int totalBaggage, String seatRegularZone, String seatGreenZone, String seatSold, String code) throws Exception;
    public String getSeatRegularZone(String code) throws Exception;
    public String getSeatGreenZone(String code) throws Exception;
    public String getSeatSold(String code) throws Exception;

}