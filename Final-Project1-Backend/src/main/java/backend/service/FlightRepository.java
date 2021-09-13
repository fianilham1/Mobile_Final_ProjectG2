package main.java.backend.service;

import main.java.backend.model.FlightRequest;
import main.java.backend.model.PurchaseFlight;

import java.util.List;

public interface FlightRepository {
    public String findFlight(FlightRequest flightRequest) throws Exception;
    public int purchaseFlight(PurchaseFlight purchaseFlight) throws Exception;
    public void acceptPaymentAndUpdateStatus(String virtualAcc, int purchaseId) throws Exception;
    public void cancelPayment(int purchaseId) throws Exception;
    public void updateAirlineDB(int purchaseId) throws Exception;

}