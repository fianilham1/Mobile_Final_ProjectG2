package main.java.backend.rabbitmq;

import com.google.gson.Gson;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import main.java.backend.model.*;
import main.java.backend.service.FlightRepositoryImpl;
import main.java.backend.service.PaymentService;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class DBReceive_Flight {

//    @Autowired
//    CustomerRepository customerRepository;

    public static DBSend DBSend = new DBSend();

    public void findFlight() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        final Connection connection = factory.newConnection();
        final Channel channel = connection.createChannel();
        channel.queueDeclare("flightsRequest", true, false, false, null);
        System.out.println(" [*] Waiting for messages from rest api");
        channel.basicQos(1);

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [x] Received '" + message + "'");
            try {
                FlightRequest flightRequest = new Gson().fromJson(message, FlightRequest.class);
                FlightRepositoryImpl flightService = new FlightRepositoryImpl();
                String flightsAvailable = flightService.findFlight(flightRequest); //Already JSON
                if(flightsAvailable==null){
                    DBSend.sendToApi("No Flights Available","flightsRequestFromDB");
                }else{
                    DBSend.sendToApi(flightsAvailable,"flightsRequestFromDB");
                }

            } catch (Exception e) {
                System.out.println("Error in receiver DB : "+e);
            } finally {
                System.out.println(" [x] Done");
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            }
        };
        channel.basicConsume("flightsRequest", false, deliverCallback, consumerTag -> {
        });
    }

    public void purchaseFlight() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        final Connection connection = factory.newConnection();
        final Channel channel = connection.createChannel();
        channel.queueDeclare("purchaseFlight", true, false, false, null);
        System.out.println(" [*] Waiting for messages from rest api");
        channel.basicQos(1);

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [x] Received '" + message + "'");
            try {
                PurchaseFlight purchaseFlight = new Gson().fromJson(message, PurchaseFlight.class);
                FlightRepositoryImpl flightService = new FlightRepositoryImpl();
                PaymentService paymentService = new PaymentService();

                int id = flightService.purchaseFlight(purchaseFlight);
                PaymentService pay = new PaymentService();
                String prefix = Integer.toString(id);
                String virtualAccountNumber = pay.getVirtualAccountNumber(prefix);

                PurchasePayment purchasePayment = new PurchasePayment();
                purchasePayment.setPurchaseId(id);
                List<ThirdPartyPayment> paymentMethodList = new ArrayList<>();
                ThirdPartyPayment bank1 = new ThirdPartyPayment();
                bank1.setName("BNI");
                bank1.setVirtualAccountNumber("009"+virtualAccountNumber);
                paymentMethodList.add(bank1);
                ThirdPartyPayment bank2 = new ThirdPartyPayment();
                bank2.setName("BCA");
                bank2.setVirtualAccountNumber("014"+virtualAccountNumber);
                paymentMethodList.add(bank2);
                ThirdPartyPayment bank3 = new ThirdPartyPayment();
                bank3.setName("BRI");
                bank3.setVirtualAccountNumber("002"+virtualAccountNumber);
                paymentMethodList.add(bank3);
                ThirdPartyPayment bank4 = new ThirdPartyPayment();
                bank4.setName("Mandiri");
                bank4.setVirtualAccountNumber("008"+virtualAccountNumber);
                paymentMethodList.add(bank4);
                purchasePayment.setThirdPartyPaymentList(paymentMethodList);

                flightService.setVaList(purchasePayment);

                DBSend.sendToApi(new Gson().toJson(purchasePayment),"purchaseFlightFromDB");

                paymentService.timerPayment(5, paymentMethodList, Integer.toString(id)); //active

            } catch (Exception e) {
                System.out.println("Error in receiver DB : "+e);
            } finally {
                System.out.println(" [x] Done");
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            }
        };
        channel.basicConsume("purchaseFlight", false, deliverCallback, consumerTag -> {
        });
    }

    public void checkPayment() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        final Connection connection = factory.newConnection();
        final Channel channel = connection.createChannel();
        channel.queueDeclare("checkPayment", true, false, false, null);
        System.out.println(" [*] Waiting for messages from rest api");
        channel.basicQos(1);

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [x] Received '" + message + "'");
            try {
                FlightRepositoryImpl flightService = new FlightRepositoryImpl();
                String statusPayment = flightService.checkPayment(Integer.parseInt(message));

                DBSend.sendToApi(statusPayment,"checkPaymentFromDB");

            } catch (Exception e) {
                System.out.println("Error in receiver DB : "+e);
            } finally {
                System.out.println(" [x] Done");
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            }
        };
        channel.basicConsume("checkPayment", false, deliverCallback, consumerTag -> {
        });
    }

    public void pay() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        final Connection connection = factory.newConnection();
        final Channel channel = connection.createChannel();
        channel.queueDeclare("paymentSim", true, false, false, null);
        System.out.println(" [*] Waiting for messages from rest api");
        channel.basicQos(1);

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [x] Received '" + message + "'");
            try {
                PaymentSent paymentSent = new Gson().fromJson(message, PaymentSent.class);
                FlightRepositoryImpl flightService = new FlightRepositoryImpl();

                PaymentReq paymentReq = flightService.getPaymentRequirement(paymentSent.getPurchaseId());
                String paymentStatus = flightService.pay(paymentSent, paymentReq);
                DBSend.sendToApi(paymentStatus,"paymentSimFromDB");

            } catch (Exception e) {
                try{
                    DBSend.sendToApi("Payment Is Invalid","paymentSimFromDB");
                }catch(Exception err){}
                System.out.println("Error in receiver DB : "+e);
            } finally {
                System.out.println(" [x] Done");
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            }
        };
        channel.basicConsume("paymentSim", false, deliverCallback, consumerTag -> {
        });
    }

    public void bookingList() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        final Connection connection = factory.newConnection();
        final Channel channel = connection.createChannel();
        channel.queueDeclare("bookingListByUsername", true, false, false, null);
        System.out.println(" [*] Waiting for messages from rest api");
        channel.basicQos(1);

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [x] Received '" + message + "'");
            try {
                FlightRepositoryImpl flightService = new FlightRepositoryImpl();
                List<PurchaseFlight> purchaseFlightList = flightService.getBookingList(message);

                DBSend.sendToApi(new Gson().toJson(purchaseFlightList),"bookingListByUsernameFromDB");

            } catch (Exception e) {
                System.out.println("Error in receiver DB : "+e);
            } finally {
                System.out.println(" [x] Done");
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            }
        };
        channel.basicConsume("bookingListByUsername", false, deliverCallback, consumerTag -> {
        });
    }

}
