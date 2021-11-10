package main.java.backend;

import main.java.backend.rabbitmq.DBReceive_Flight;
import main.java.backend.rabbitmq.DBReceive_User;
import main.java.backend.rabbitmq.DBSend;

public class BackEndMain {
    public static DBReceive_User DBReceiveUser = new DBReceive_User();
    public static DBSend DBSend = new DBSend();
     public static DBReceive_Flight DBReceiveFlight = new DBReceive_Flight();

    public static void main(String[] args) throws Exception{
        //User
        DBReceiveUser.loginValidation();
        DBReceiveUser.registerUser();
        DBReceiveUser.forgotPasswordSend();
        DBReceiveUser.forgotPasswordReset();
        DBReceiveUser.getUsers();
        DBReceiveUser.getUsersByUsername();
        DBReceiveUser.updateUser();
        DBReceiveUser.deleteUser();

         //Flight
         DBReceiveFlight.findFlight();
         DBReceiveFlight.pay();
         DBReceiveFlight.checkPayment();
         DBReceiveFlight.bookingList();

    }
}
