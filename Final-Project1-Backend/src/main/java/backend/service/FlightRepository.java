package main.java.backend.service;

import main.java.backend.model.*;

import java.util.List;

public interface FlightRepository {
    String findFlight(FlightRequest flightRequest) throws Exception;
    int purchaseFlight(PurchaseFlight purchaseFlight) throws Exception;
    void acceptPaymentAndUpdateStatus(int purchaseId) throws Exception;
    void cancelPayment(int purchaseId) throws Exception;
    void updateAirlineDB(int purchaseId) throws Exception;
    String setVaList(PurchasePayment purchasePayment) throws Exception;
    String checkPayment(int id) throws Exception;
    String pay(PaymentSent paymentSent, PaymentReq paymentReq) throws Exception;
    PaymentReq getPaymentRequirement(int id) throws Exception;
    List<PurchaseFlight> getBookingList(String username) throws Exception;
}