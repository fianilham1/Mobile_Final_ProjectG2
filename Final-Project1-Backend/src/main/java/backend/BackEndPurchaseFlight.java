package main.java.backend;

import main.java.backend.rabbitmq.DBReceive_Flight;

public class BackEndPurchaseFlight {
    public static DBReceive_Flight DBReceiveFlight = new DBReceive_Flight();

    public static void main(String[] args) throws Exception{
         //Flight
         DBReceiveFlight.purchaseFlight();

    }
}
