package main.java.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import main.java.backend.model.*;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Reader;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.*;


public class FlightRepositoryImpl implements FlightRepository {

    public static final Logger logger = LoggerFactory.getLogger(FlightRepositoryImpl.class);

    // one instance, reuse
    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();

    @Override
    public String findFlight(FlightRequest flightRequest) throws Exception{

        System.out.println("Send Http GET request of flights");
//        FlightRequest flightReq = new FlightRequest();
//        flightReq.setFromAirport("Surabaya(SUB)");
//        flightReq.setToAirport("Balikpapan(BPN)");
//        flightReq.setDepartureDate("2021-07-06");
//        flightReq.setReturnDate("2021-07-17");
//        flightReq.setSortBy("EarliestDeparture");
        String ListFLightsAvailable = sendGet(flightRequest); //JSON Format
        if(ListFLightsAvailable==null){
            return null;
        }

        return ListFLightsAvailable;

    }

    @Override
    public int purchaseFlight(PurchaseFlight purchaseFlight) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigPurchase.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        session.insert("PurchaseFlight.insertPurchase", purchaseFlight);
        System.out.println(purchaseFlight.getVirtualAccountOfPayment());

        int id = session.selectOne("PurchaseFlight.getId", "");
        purchaseFlight.setPurchaseId(id);
        int amountOfFlight = purchaseFlight.getFlightList().size(); //to check if departure only / not

        //contact
        Map<Object, Object> params = new HashMap<>();
        params.put("1",id);
        params.put("2",purchaseFlight.getContactDetails().getContactDetailsName());
        params.put("3",purchaseFlight.getContactDetails().getContactDetailsEmail());
        params.put("4",purchaseFlight.getContactDetails().getContactDetailsMobile());
        session.insert("PurchaseFlight.insertContact", params);

        //passengers
        String baggageOrderedDeparture = "";
        String baggageOrderedReturn = "";
        String seatNumberOrderedDeparture = "";
        String seatNumberOrderedReturn = "";
        for(int i=0;i<purchaseFlight.getTotalPassengers();i++){ //for all passengers
            //passengers
            params = new HashMap<>();
            params.put("1",id);
            params.put("2",purchaseFlight.getFlightPassengersList().get(i).getName());
            params.put("3",purchaseFlight.getFlightPassengersList().get(i).getBirthDate());
            params.put("4",purchaseFlight.getFlightPassengersList().get(i).getNationality());
            params.put("5",purchaseFlight.getFlightPassengersList().get(i).getPersonClass());
            session.insert("PurchaseFlight.insertPassengers", params);

            if(!purchaseFlight.getFlightPassengersList().get(i).getPersonClass().equals("infant")){
                //facilities
                //departure
                int idPassengers = session.selectOne("PurchaseFlight.getIdPassengers", "");
                params = new HashMap<>();
                params.put("1",idPassengers);
                params.put("2",id);
                params.put("3",purchaseFlight.getFlightPassengersList().get(i).getDepartureDetails().getBaggage());
                params.put("4",purchaseFlight.getFlightPassengersList().get(i).getDepartureDetails().getSeatNumber());
                params.put("5",purchaseFlight.getFlightPassengersList().get(i).getDepartureDetails().getSeatNumberType());
                params.put("6",purchaseFlight.getFlightList().get(0).getCode());
                session.insert("PurchaseFlight.insertFacilities", params);

                //Below are for data flight list > store all baggage and all numberseat
                baggageOrderedDeparture += purchaseFlight.getFlightPassengersList().get(i).getDepartureDetails().getBaggage()+",";
                seatNumberOrderedDeparture += purchaseFlight.getFlightPassengersList().get(i).getDepartureDetails().getSeatNumber()+",";
                System.out.println("CEK1 "+amountOfFlight);
                logger.info("Cek : {}",amountOfFlight);
                if(amountOfFlight>1){
                    //return
                    params = new HashMap<>();
                    params.put("1",idPassengers);
                    params.put("2",id);
                    params.put("3",purchaseFlight.getFlightPassengersList().get(i).getReturnDetails().getBaggage());
                    params.put("4",purchaseFlight.getFlightPassengersList().get(i).getReturnDetails().getSeatNumber());
                    params.put("5",purchaseFlight.getFlightPassengersList().get(i).getReturnDetails().getSeatNumberType());
                    params.put("6",purchaseFlight.getFlightList().get(1).getCode());
                    session.insert("PurchaseFlight.insertFacilities", params);
                    baggageOrderedReturn += purchaseFlight.getFlightPassengersList().get(i).getReturnDetails().getBaggage()+",";
                    seatNumberOrderedReturn += purchaseFlight.getFlightPassengersList().get(i).getReturnDetails().getSeatNumber()+",";

                }

            }

           }

        System.out.println("CEK2 MASUK G?");
        //flight list
        for(int i=0;i<purchaseFlight.getFlightList().size();i++){
            NewFlightFormat flight = purchaseFlight.getFlightList().get(i);
            params = new HashMap<>();
            params.put("1",id);
            params.put("2",flight.getAirlineName());
            params.put("3",flight.getCode());
            params.put("4",flight.getFromAirport());
            params.put("5",flight.getToAirport());
            params.put("6",flight.getDepartureDate());
            params.put("7",flight.getDepartureDateTime());
            params.put("8",flight.getArrivalDateTime());
            params.put("9",flight.getDurationFlight());
            params.put("10",flight.getSeatClass());
            params.put("11",flight.getEntertainment());
            params.put("12",flight.getWifi());
            params.put("13",flight.getPowerOrUSBPort());
            params.put("14",flight.getMeals());
            params.put("15",flight.getAircraftType());
            params.put("16",flight.getSeatLayout());
            params.put("17",flight.getSeatPitch());
            params.put("18",flight.getNumberTransit());
            params.put("19",flight.getTransitLocation());
            params.put("20",flight.getTransitDuration());
            params.put("21",flight.getPrice());
            if(i==0){ //departure
                params.put("22",removeLastChar(baggageOrderedDeparture));
                params.put("23",removeLastChar(seatNumberOrderedDeparture));
            }else{ //return
                params.put("22",removeLastChar(baggageOrderedReturn));
                params.put("23",removeLastChar(seatNumberOrderedReturn));
            }
            session.insert("PurchaseFlight.insertFlight", params);
        }

        //insurance
        params = new HashMap<>();
        params.put("1",id);
        params.put("2",purchaseFlight.getFlightInsurances().getTravelInsurance());
        params.put("3",purchaseFlight.getFlightInsurances().getCovid19Insurance());
        params.put("4",purchaseFlight.getFlightInsurances().getFlightDelayInsurance());
        params.put("5",purchaseFlight.getFlightInsurances().getBaggageLossProtection());
        session.insert("PurchaseFlight.insertInsurance", params);

        System.out.println("flight booking inserted successfully");
        session.commit();
        session.close();

        return id;
    }

    @Override
    public String setVaList(PurchasePayment purchasePayment) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigPurchase.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        String vaList = "";
        for (ThirdPartyPayment bank : purchasePayment.getThirdPartyPaymentList()){
            vaList += bank.getVirtualAccountNumber()+"/";
        }

        Map<Object, Object> params = new HashMap<>();
        params.put("purchaseId",purchasePayment.getPurchaseId());
        params.put("vaList",vaList);
        session.insert("PurchaseFlight.setVaList", params);

        session.commit();
        session.close();

        return vaList;
    }

    @Override
    public PaymentReq getPaymentRequirement(int id) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigPurchase.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        String vaList = session.selectOne("PurchaseFlight.getVaList", id);
        Double price = session.selectOne("PurchaseFlight.getPrice", id);
        PaymentReq paymentReq = new PaymentReq();
        paymentReq.setPrice(price);
        paymentReq.setVaList(Arrays.asList(vaList.split("/")));
        System.out.println("list va list "+Arrays.asList(vaList.split("/")).size());

        System.out.println("get VA Number List with "+id+" successfully");
        session.commit();
        session.close();

        return paymentReq;
    }

    @Override
    public List<PurchaseFlight> getBookingList(String username) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigPurchase.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        List<Integer> purchaseIdList = session.selectList("PurchaseFlight.getPurchaseIdByUsername", username);
        List<PurchaseFlight> purchaseFlightList = new ArrayList<>();
        for(int purchaseId : purchaseIdList){
            PurchaseFlight purchaseFlight = session.selectOne("PurchaseFlight.getPurchaseById", purchaseId);
            ContactDetails contactDetails = session.selectOne("PurchaseFlight.getContactById", purchaseId);
            List<NewFlightFormat> flightsList = session.selectList("PurchaseFlight.getFlightListById", purchaseId);
            List<FlightPassengersDetails> flightPassengersList = session.selectList("PurchaseFlight.getPassengersById", purchaseId);
            for (FlightPassengersDetails passenger : flightPassengersList) {
                List<FlightPassengersDetailsFacilities> flightFacilitiesList = session.selectList("PurchaseFlight.getFacilitiesById", passenger.getPassengersId());
                FlightPassengersDetailsFacilities departureDetails = flightFacilitiesList.get(0);
                passenger.setDepartureDetails(departureDetails);

                if (flightsList.size() > 1) { //return flight exist
                    FlightPassengersDetailsFacilities returnDetails = flightFacilitiesList.get(1);
                    passenger.setReturnDetails(returnDetails);
                }
            }
            FlightInsurances flightInsurances = session.selectOne("PurchaseFlight.getInsurancesById", purchaseId);

            purchaseFlight.setContactDetails(contactDetails);
            purchaseFlight.setFlightList(flightsList);
            purchaseFlight.setFlightPassengersList(flightPassengersList);
            purchaseFlight.setFlightInsurances(flightInsurances);
            purchaseFlightList.add(purchaseFlight);
        }

        System.out.println("get Booking List with "+username+" successfully");
        session.commit();
        session.close();

        return purchaseFlightList;
    }

    @Override
    public String checkPayment(int id) throws Exception{

        Reader reader = Resources.getResourceAsReader("SqlMapConfigPurchase.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        String statusPayment = session.selectOne("PurchaseFlight.getStatusPayment", id);
        System.out.println("statusPayment "+statusPayment);
        session.commit();
        session.close();

        return statusPayment;
    }

    @Override
    public String pay(PaymentSent paymentSent, PaymentReq paymentReq) throws Exception{

        Reader reader = Resources.getResourceAsReader("SqlMapConfigBank.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();
        String vaOfPayment = null;
        System.out.println("paymentReq.getVaList() size : "+paymentReq.getVaList().size());
        //Check first the virtual account number and total price based on this virtual acc number
        for ( String va : paymentReq.getVaList() ){
            System.out.println("check va in list : "+va);
            System.out.println("check va sent : "+paymentSent.getVa());
            System.out.println("check price req  : "+paymentReq.getPrice());
            System.out.println("check price sent : "+paymentSent.getPrice());
            System.out.println(" ");
            if(paymentSent.getVa().equals(va) && paymentSent.getPrice().equals(paymentReq.getPrice())){
                System.out.println("CORRECT >>>>");
                vaOfPayment = va;
                break;
            }
        }

        if(vaOfPayment != null){
            Map<Object, Object> params = new HashMap<>();
            params.put("id",paymentSent.getPurchaseId());
            params.put("price",paymentSent.getPrice());
            params.put("va",vaOfPayment);
            session.insert("Bank.insert", params);

            System.out.println("PAYMENT to Virtual Account : "+paymentSent.getVa()+" is Successful");
            session.commit();
            session.close();
            return "Payment Is Successful";
        }

        session.commit();
        session.close();
        System.out.println("PAYMENT to Virtual Account : "+paymentSent.getVa()+" is FAILED");
        return "Payment Is Invalid";
    }

    @Override
    public void acceptPaymentAndUpdateStatus(int purchaseId) throws Exception{

        System.out.println("Pay Successful");
        Reader reader = Resources.getResourceAsReader("SqlMapConfigPurchase.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        //Update payment status
        Map<Object, Object> params = new HashMap<>();
        params.put("purchaseId",purchaseId);
        params.put("paymentStatus","Successful");
        session.update("PurchaseFlight.updatePaymentStatus",params);
        //System.out.println("Record updated successfully");

        session.commit();
        session.close();
    }

    @Override
    public void cancelPayment(int purchaseId) throws Exception{

        System.out.println("Purchase Cancel");
        Reader reader = Resources.getResourceAsReader("SqlMapConfigPurchase.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        Map<Object, Object> params = new HashMap<>();
        params.put("1",purchaseId);
        params.put("2",purchaseId);
        params.put("3",purchaseId);
        params.put("4",purchaseId);
        params.put("5",purchaseId);
        params.put("6",purchaseId);
        session.delete("PurchaseFlight.deletePurchase",purchaseId);
        //System.out.println("Record updated successfully");

        session.commit();
        session.close();
    }

    @Override
    public void updateAirlineDB(int purchaseId) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigPurchase.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        List<FlightPassengersInformation> flightPassengersInformations = session.selectList("PurchaseFlight.getPassengersInformation", purchaseId);
        List<FlightPassengersDetailsFacilities> facilitiesOrdered = session.selectList("PurchaseFlight.getFacilities", purchaseId);
        List<String> CodeFlightOrdered = session.selectList("PurchaseFlight.getCode", purchaseId);

        session.commit();
        session.close();

        sendPost(flightPassengersInformations, facilitiesOrdered, CodeFlightOrdered); //JSON Format
    }

    private String sendGet(FlightRequest flightReq) throws Exception {

        HttpRequest request = null;
        if(flightReq.getReturnDate().isEmpty()){ //departure flight only
            System.out.println("ONE WAY");
            request = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create("http://localhost:8888/airline/find"))
                    .header("from-airport",flightReq.getFromAirport())
                    .header("to-airport", flightReq.getToAirport())
                    .header("departure-date",flightReq.getDepartureDate())
                    .header("seat-class",flightReq.getSeatClass())
                    .header("sort-by",flightReq.getSortBy())
                    .build();
        }else{ //departure flight and return flight
            System.out.println("ROUND TRIP");
            request = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create("http://localhost:8888/airline/find"))
                    .header("from-airport",flightReq.getFromAirport())
                    .header("to-airport", flightReq.getToAirport())
                    .header("departure-date",flightReq.getDepartureDate())
                    .header("return-date",flightReq.getReturnDate())
                    .header("seat-class",flightReq.getSeatClass())
                    .header("sort-by",flightReq.getSortBy())
                    .build();
        }

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        // print status code
        System.out.println(response.statusCode());

        // print response body
        System.out.println(response.body());

        return response.body();
    }

    private void sendPost(List<FlightPassengersInformation> flightPassengersInformations, List<FlightPassengersDetailsFacilities> facilitiesOrdered, List<String> CodeFlightOrdered) throws Exception {

        // form parameters
        var data = new HashMap<>();
        data.put("passengers", flightPassengersInformations);
        data.put("facilities", facilitiesOrdered);
        data.put("code", CodeFlightOrdered);

        var objectMapper = new ObjectMapper();
        String requestBody = objectMapper
                .writeValueAsString(data);

        HttpRequest request = HttpRequest.newBuilder()
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .uri(URI.create("http://localhost:8888/airline/update"))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        // print status code
        System.out.println(response.statusCode());

        // print response body
        System.out.println(response.body());

    }

    private static HttpRequest.BodyPublisher buildFormDataFromMap(Map<Object, Object> data) {
        var builder = new StringBuilder();
        for (Map.Entry<Object, Object> entry : data.entrySet()) {
            if (builder.length() > 0) {
                builder.append("&");
            }
            builder.append(URLEncoder.encode(entry.getKey().toString(), StandardCharsets.UTF_8));
            builder.append("=");
            builder.append(URLEncoder.encode(entry.getValue().toString(), StandardCharsets.UTF_8));
        }
        System.out.println(builder.toString());
        return HttpRequest.BodyPublishers.ofString(builder.toString());
    }

    public static String removeLastChar(String s) {
        if (s == null || s.length() == 0) {
            return s;
        }
        return s.substring(0, s.length()-1);
    }

}
