package main.java.restapi.service;

import main.java.backend.model.Flight;
import main.java.backend.model.FlightDisplay;
import main.java.backend.model.FlightRequest;
import main.java.backend.model.NewFlightFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class FlightService {

    private List<NewFlightFormat> list = new ArrayList<>();

    public FlightDisplay changeFormat(List<Flight> flightList, FlightRequest flightRequest) throws ParseException {
//        private String airlineName;
//        private String code;
//        private String fromAirport;
//        private String toAirport;
//        private String departureDate;
//        private String departureDateTime;
//        private String arrivalDateTime;
//        private String seatClass; //Economy PremiumEconomy Business FirstClass
//        private int price;
//        private boolean entertainment;
//        private boolean wifi;
//        private boolean powerOrUSBPort;
//        private boolean meals;
//        private String aircraftType;
//        private String seatLayout;
//        private String seatPitch;
//        private int numberTransit;
//        private String transitLocation;
//        private String transitDuration;
//        private ArrayList<Integer> baggageData;
//        private ArrayList<String> seatRegularZone;
//        private ArrayList<String> seatGreenZone;
//        private ArrayList<String> seatSold;

        List<NewFlightFormat> listDeparture = new ArrayList<>();
        List<NewFlightFormat> listReturn = new ArrayList<>();
        FlightDisplay flightDisplay = new FlightDisplay();

        for(Flight flight:flightList){
            NewFlightFormat newFlightFormat = new NewFlightFormat();

            newFlightFormat.setAirlineName(flight.getAirlineName());
            newFlightFormat.setCode(flight.getCode());
            newFlightFormat.setFromAirport(flight.getFromAirport());
            newFlightFormat.setToAirport(flight.getToAirport());
            newFlightFormat.setDepartureDate(flight.getDepartureDate());
            newFlightFormat.setDepartureDateTime(flight.getDepartureDateTime());
            newFlightFormat.setArrivalDateTime(flight.getArrivalDateTime());

            //calculate duration of flight
            String[] DateTimeArr = new String[30];
            DateTimeArr = flight.getDepartureDateTime().split("\\s");
            String departuretime = DateTimeArr[1];
            DateTimeArr = flight.getArrivalDateTime().split("\\s");
            String returntime = DateTimeArr[1];
            SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
            Date date1 = format.parse(departuretime);
            Date date2 = format.parse(returntime);
            long difference = date2.getTime() - date1.getTime();
            long diffSeconds = difference / 1000 % 60;
            long diffMinutes = difference / (60 * 1000) % 60;
            long diffHours = difference / (60 * 60 * 1000) % 24;
            long diffDays = difference / (24 * 60 * 60 * 1000);
            String duration = Long.toString(diffHours)+"h "+Long.toString(diffMinutes)+"m";
            newFlightFormat.setDurationFlight(duration);

            newFlightFormat.setSeatClass(flight.getSeatClass());
            newFlightFormat.setPrice(flight.getPrice());
            newFlightFormat.setEntertainment(flight.getEntertainment());
            newFlightFormat.setWifi(flight.getWifi());
            newFlightFormat.setPowerOrUSBPort(flight.getPowerOrUSBPort());
            newFlightFormat.setMeals(flight.getMeals());
            newFlightFormat.setAircraftType(flight.getAircraftType());
            newFlightFormat.setSeatLayout(flight.getSeatLayout());
            newFlightFormat.setSeatPitch(flight.getSeatPitch());
            newFlightFormat.setNumberTransit(flight.getNumberTransit());
            newFlightFormat.setTransitLocation(flight.getTransitLocation());
            newFlightFormat.setTransitDuration(flight.getTransitDuration());

            ArrayList<Integer> baggageList = new ArrayList<>();
            //change attribut format from string to Arraylist<Integer>
            String[] baggageArr = new String[30];
            baggageArr = flight.getBaggageData().split("/");
            for(String baggageValue : baggageArr){
                baggageList.add(Integer.parseInt(baggageValue));
            }
            newFlightFormat.setBaggageData(baggageList);

            ArrayList<String> seatRegularZoneList = new ArrayList<>();
            //change attribut format from string to Arraylist<String>
            String[] seatRegularZoneArr = new String[30];
            seatRegularZoneArr = flight.getSeatRegularZone().split("/");
            Collections.addAll(seatRegularZoneList, seatRegularZoneArr);
            newFlightFormat.setSeatRegularZone(seatRegularZoneList);

            ArrayList<String> seatGreenZoneList = new ArrayList<>();
            //change attribut format from string to Arraylist<String>
            String[] seatGreenZoneArr = new String[30];
            seatGreenZoneArr = flight.getSeatGreenZone().split("/");
            Collections.addAll(seatGreenZoneList, seatGreenZoneArr);
            newFlightFormat.setSeatGreenZone(seatGreenZoneList);

            ArrayList<String> seatSoldList = new ArrayList<>();
            //change attribut format from string to Arraylist<String>
            String[] seatSoldArr = new String[30];
            seatSoldArr = flight.getSeatSold().split("/");
            Collections.addAll(seatSoldList, seatSoldArr);
            newFlightFormat.setSeatSold(seatSoldList);

            //categorize all flight list to departure/return flight
            if(newFlightFormat.getDepartureDate().equals(flightRequest.getDepartureDate())){
                listDeparture.add(newFlightFormat);
            }else if(newFlightFormat.getDepartureDate().equals(flightRequest.getReturnDate())){
                listReturn.add(newFlightFormat);
            }
        }

        list.addAll(listDeparture);
        flightDisplay.setDepartureflight(listDeparture);
        list.addAll(listReturn);
        flightDisplay.setReturnflight(listReturn);

        return flightDisplay;
    }

    public List<NewFlightFormat> getList(){
        return list;
    }


}
