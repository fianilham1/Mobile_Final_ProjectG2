package main.java.restapi.util;

public class Payment {
    private String virtualAccountNumber;
    private String durationPayment="10 Minutes";

    public Payment(String virtualAccountNumber){
        this.virtualAccountNumber = virtualAccountNumber;
    }

    public String getVirtualAccountNumber() {
        return virtualAccountNumber;
    }

}
