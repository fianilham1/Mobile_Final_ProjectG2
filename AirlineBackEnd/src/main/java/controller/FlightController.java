package main.java.controller;


import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import main.java.model.Flight;
import main.java.model.FlightPassengersDetailsFacilities;
import main.java.model.FlightPassengersInformation;
import main.java.model.InformationPurchase;
import main.java.service.FlightRepositoryImpl;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Type;
import java.util.*;

@RestController
@RequestMapping("/airline")
public class FlightController {



    public static final Logger logger = LoggerFactory.getLogger(FlightController.class);

    @RequestMapping(value = "/find", method = RequestMethod.GET)
    public ResponseEntity<?> findFlight(HttpServletRequest request) throws Exception {
    //public void findFlight(@RequestHeader("toAirport") String header) throws Exception {

        Map<String, String> headerData = new HashMap<>();
        Enumeration<String> hearderNames = request.getHeaderNames();
        boolean isReturnDateExist=false;
        while(hearderNames.hasMoreElements())
        {
            String headerName = hearderNames.nextElement();
            if(headerName.equals("from-airport")) { headerData.put(headerName, request.getHeader(headerName));
            }
            if(headerName.equals("to-airport")) { headerData.put(headerName, request.getHeader(headerName));
            }
            if(headerName.equals("departure-date")) { headerData.put(headerName, request.getHeader(headerName));
            }
            if(headerName.equals("return-date")) { headerData.put(headerName, request.getHeader(headerName));
                isReturnDateExist=true;
            }
            if(headerName.equals("seat-class")) { headerData.put(headerName, request.getHeader(headerName));
            }
            if(headerName.equals("sort-by")) { headerData.put(headerName, request.getHeader(headerName));
            }
        }

        //System.out.println(headerData);
        Flight flightReqDeparture = new Flight();
        Flight flightReqReturn = new Flight();
        FlightRepositoryImpl flightRepository = new FlightRepositoryImpl();

        // >>>>> DEPARTURE
        flightReqDeparture.setFromAirport(headerData.get("from-airport"));
        flightReqDeparture.setToAirport(headerData.get("to-airport"));
        flightReqDeparture.setDepartureDate(headerData.get("departure-date"));
        flightReqDeparture.setSeatClass(headerData.get("seat-class"));
        List<Flight> flightDB1 = flightRepository.findFlightFromDB(flightReqDeparture,headerData.get("sort-by"));
        List<Flight> flightDB2 = new ArrayList<>();

        Iterator itr = flightDB1.iterator();
        JSONObject obj=new JSONObject();
        while(itr.hasNext()){
            Flight flight = (Flight) itr.next();
            String strFlight = new Gson().toJson(flight);
            JSONParser parser = new JSONParser();
            JSONObject json = (JSONObject) parser.parse(strFlight);
            obj.put("DepartureCategory",json);

            System.out.println("DepartureCategory");
            System.out.println(flight.getAirlineName()+" : "+flight.getDepartureDateTime()+" -> "+flight.getArrivalDateTime());
        }
        if(isReturnDateExist){ // Round Trip -> Request departure and return
            // >>>>>> RETURN
            flightReqReturn.setFromAirport(headerData.get("to-airport"));
            flightReqReturn.setToAirport(headerData.get("from-airport"));
            flightReqReturn.setDepartureDate(headerData.get("return-date"));
            flightReqReturn.setSeatClass(headerData.get("seat-class"));
            flightDB2 = flightRepository.findFlightFromDB(flightReqReturn,headerData.get("sort-by"));
            itr = flightDB2.iterator();
            while(itr.hasNext()){
                Flight flight = (Flight) itr.next();
                String strFlight = new Gson().toJson(flight);
                JSONParser parser = new JSONParser();
                JSONObject json = (JSONObject) parser.parse(strFlight);
                obj.put("ReturnCategory",json);
                System.out.println("ReturnCategory");
                System.out.println(flight.getAirlineName()+" : "+flight.getDepartureDateTime()+" -> "+flight.getArrivalDateTime());
            }
        }

        System.out.println("flightDB1 "+flightDB1);
        System.out.println("flightDB2 "+flightDB2);
        System.out.println("isReturnDateExist "+isReturnDateExist);
        if (flightDB1.size() == 0){
            return new ResponseEntity<>("No Flights Available",
                    HttpStatus.NOT_FOUND);
        }
        if (isReturnDateExist && flightDB2.size() == 0){
            return new ResponseEntity<>("No Flights Available",
                    HttpStatus.NOT_FOUND);
        }

        flightDB1.addAll(flightDB2);

        return (new ResponseEntity<>(flightDB1, HttpStatus.OK));
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseEntity<?> updateFlight(@RequestBody String information) throws Exception {
        //public void findFlight(@RequestHeader("toAirport") String header) throws Exception {

        //FlightPassengersInformation passengersInformation = new Gson().fromJson(passengers, FlightPassengersInformation.class);
        System.out.println(information);

        Gson gson = new Gson();
        Type CollectionType = new TypeToken<InformationPurchase>() {
        }.getType();
        InformationPurchase informationPurchase = gson.fromJson(information, CollectionType);
        System.out.println("cek"+informationPurchase.getPassengers().get(0).getName());

        FlightRepositoryImpl flightRepository = new FlightRepositoryImpl();
        List<String> codeList = informationPurchase.getCode();
        List<FlightPassengersInformation> passengersList = informationPurchase.getPassengers();

        int totalPassengers = passengersList.size();
        int totalPassengersWithoutInfant = 0;
        for(FlightPassengersInformation passengers:passengersList){ //calculate total passengers without infrant,cuz infrant doesnt have seat ordered and baggage ordered
            if(!passengers.getPersonClass().equals("infant")){
                totalPassengersWithoutInfant++;
            }
        }

        List<FlightPassengersDetailsFacilities> facilitiesList = informationPurchase.getFacilities();
        for(String code:codeList){ //departure and return
            Flight flight = flightRepository.flightOrderedList(code);

            //check total baggage ordered for each flight code
            int totalBaggage = 0;
            for(int i=0;i<facilitiesList.size();i++){
                if(informationPurchase.getFacilities().get(i).getCode().equals(code)){
                    totalBaggage += informationPurchase.getFacilities().get(i).getBaggage();
                }
            }

            //check seat number ordered for each flight code
            //get current data of regular zone seat of Airline
            String seatRegularZone = flightRepository.getSeatRegularZone(code);
            String[] seatArr = new String[10];
            seatArr = seatRegularZone.split("/");
            List<String> airplaneSeatRegularZone = new ArrayList<>(Arrays.asList(seatArr));
            //get current data of green zone seat of Airline
            String seatGreenZone = flightRepository.getSeatGreenZone(code);
            seatArr = new String[10];
            seatArr = seatGreenZone.split("/");
            List<String> airplaneSeatGreenZone = new ArrayList<>(Arrays.asList(seatArr));
            //get current data of sold seat of Airline
            String seatSold = flightRepository.getSeatSold(code);
            seatArr = new String[10];
            seatArr = seatSold.split("/");
            List<String> airplaneSeatSold = new ArrayList<>(Arrays.asList(seatArr));

            //get ordered regular zone seat and green zone seat of passengers
            List<String> orderedSeatRegularZone = new ArrayList<>();
            List<String> orderedSeatGreenZone = new ArrayList<>();
            for(int i=0;i<facilitiesList.size();i++){
                if(informationPurchase.getFacilities().get(i).getSeatNumberType().equals("regularZone") && informationPurchase.getFacilities().get(i).getCode().equals(code) ){
                    orderedSeatRegularZone.add(informationPurchase.getFacilities().get(i).getSeatNumber());
                }else if(informationPurchase.getFacilities().get(i).getSeatNumberType().equals("greenZone") && informationPurchase.getFacilities().get(i).getCode().equals(code)){
                    orderedSeatGreenZone.add(informationPurchase.getFacilities().get(i).getSeatNumber());
                }
            }

            airplaneSeatRegularZone = removeIntersection(airplaneSeatRegularZone,orderedSeatRegularZone);
            airplaneSeatGreenZone = removeIntersection(airplaneSeatGreenZone,orderedSeatGreenZone);
            airplaneSeatSold.addAll(orderedSeatRegularZone);
            airplaneSeatSold.addAll(orderedSeatGreenZone);

            //update >>>>>> number baggage and number seat
            flightRepository.update(flight.getNumberSeatAvailable()-totalPassengersWithoutInfant,flight.getNumberBaggageAvailable()-totalBaggage,toString(airplaneSeatRegularZone),toString(airplaneSeatGreenZone),toString(airplaneSeatSold),code);
        }

        return (new ResponseEntity<>("Booking is successful, ", HttpStatus.OK));
    }

    public static List<String> removeIntersection(List<String> data, List<String> ordered){
        // Make the two lists
//        List<String> list1 = Arrays.asList(1, 2, 3, 4);
//        List<String> list2 = Arrays.asList(2, 3, 4, 6, 7);
        // Prepare a union
        List<String> union = new ArrayList<String>(data);
        union.addAll(ordered);
        // Prepare an intersection
        List<String> intersection = new ArrayList<String>(data);
        intersection.retainAll(ordered);
        // Subtract the intersection from the union
        union.removeAll(intersection);
       return union;
    }

    public static String toString(List<String> data){
        StringBuilder s = new StringBuilder();
        for (String datum : data) {
            s.append(datum).append("/");
        }

        return removeLastChar(s.toString());
    }

    public static String removeLastChar(String s) {
        if (s == null || s.length() == 0) {
            return s;
        }
        return s.substring(0, s.length()-1);
    }



}
