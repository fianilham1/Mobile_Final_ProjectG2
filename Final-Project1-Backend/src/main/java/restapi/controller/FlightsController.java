package main.java.restapi.controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import main.java.backend.model.*;
import main.java.restapi.rabbitmq.RestApiReceive;
import main.java.restapi.rabbitmq.RestApiSend;
import main.java.restapi.service.FlightService;
import main.java.restapi.util.CustomErrorType;
import main.java.restapi.util.MessageType;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/flights")
public class FlightsController {

	@Autowired
	RestApiSend restApiSend;

	@Autowired
	RestApiReceive restApiReceive;

	private final String HEADER = "Authorization";
	private final String PREFIX = "Bearer ";
	private final String SECRET = "mySecretKey";

	@RequestMapping(value = "/find", method = RequestMethod.POST)
	public ResponseEntity<?> requestFlight(@RequestBody JSONObject jobj, @RequestHeader(HEADER) String header) throws Exception {

		String jwtToken = header.replace(PREFIX, "");
		Claims claims = Jwts.parser().setSigningKey(SECRET.getBytes()).parseClaimsJws(jwtToken).getBody();
		String currentLoggedUser = claims.get("sub").toString();

		//declare flight service object
		FlightService flightService = new FlightService();

		//SENDING MSG to RabbitMq...........................
		restApiSend.sendToDB(jobj.toString(),"flightsRequest");

		//RECEIVING MSG from RabbitMq.......................
		restApiReceive.receiveFromDB("flightsRequestFromDB");
		restApiReceive.setMsg(null);
		String msg;
		try {
			while(restApiReceive.getMsg()==null){
				System.out.println("delay..");
				Thread.sleep(2000);
			}
		} catch (InterruptedException _ignored) {
			Thread.currentThread().interrupt();
		}
		msg = restApiReceive.getMsg();
		System.out.println("DONE........ "+msg);

		if(msg.equals("No Flights Available")){
			return new ResponseEntity<>(new CustomErrorType("No Flights Available"),
					HttpStatus.NOT_FOUND);
		}
		Type listType = new TypeToken<ArrayList<Flight>>(){}.getType();
		List<Flight> flightList = new Gson().fromJson(msg, listType);

		//store request flight
		FlightRequest flightRequest = new Gson().fromJson(jobj.toString(), FlightRequest.class);

		//change to new format class and Separate into departure flight and return flight
		FlightDisplay flightDisplay = flightService.changeFormat(flightList, flightRequest);

		return (new ResponseEntity<>(flightDisplay, HttpStatus.CREATED));
	}


	@RequestMapping(value = "/details", method = RequestMethod.POST)
	public ResponseEntity<?> detailsFlight(@RequestBody JSONObject jobj, @RequestHeader(HEADER) String header) throws Exception {

		String jwtToken = header.replace(PREFIX, "");
		Claims claims = Jwts.parser().setSigningKey(SECRET.getBytes()).parseClaimsJws(jwtToken).getBody();
		String currentLoggedUser = claims.get("sub").toString();

		String[] userInfoArr;
		userInfoArr = currentLoggedUser.split("/");
		String currentLoggedUsername = userInfoArr[0];
		String currentLoggedName = userInfoArr[1];

        //STORE TO DB
		//SENDING MSG to RabbitMq...........................
		restApiSend.sendToDB(jobj.toString(),"purchaseFlight");

		//RECEIVING MSG from RabbitMq.......................
		restApiReceive.receiveFromDB("purchaseFlightFromDB");
		restApiReceive.setMsg(null);
		String msg;
		try {
			while(restApiReceive.getMsg()==null){
				System.out.println("delay..");
				Thread.sleep(2000);
			}

		} catch (InterruptedException _ignored) {
			Thread.currentThread().interrupt();
		}
		msg = restApiReceive.getMsg();
		System.out.println("DONE........ "+msg);

		PurchasePayment payment = new Gson().fromJson(msg, PurchasePayment.class);

		return (new ResponseEntity<>(payment, HttpStatus.CREATED));
	}

	@RequestMapping(value = "/checkPayment/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> checkPayment(@PathVariable("id") int id) throws Exception {

		//SENDING MSG to RabbitMq...........................
		restApiSend.sendToDB(Integer.toString(id),"checkPayment");

		//RECEIVING MSG from RabbitMq.......................
		restApiReceive.receiveFromDB("checkPaymentFromDB");
		restApiReceive.setMsg(null);
		String msg;
		try {
			while(restApiReceive.getMsg()==null){
				System.out.println("delay..");
				Thread.sleep(2000);
			}

		} catch (InterruptedException _ignored) {
			Thread.currentThread().interrupt();
		}
		msg = restApiReceive.getMsg();
		System.out.println("DONE........ "+msg);

		if(msg.equals("Waiting Payment")){
			return new ResponseEntity<>(new CustomErrorType("Waiting Payment"),
					HttpStatus.NOT_FOUND);
		}

		return (new ResponseEntity<>(new MessageType("Payment OK"), HttpStatus.OK));
	}

	@RequestMapping(value = "/pay", method = RequestMethod.POST)
	public ResponseEntity<?> pay(@RequestBody JSONObject jobj ) throws Exception {

		//SENDING MSG to RabbitMq...........................
		restApiSend.sendToDB(jobj.toString(),"paymentSim");

		//RECEIVING MSG from RabbitMq.......................
		restApiReceive.receiveFromDB("paymentSimFromDB");
		restApiReceive.setMsg(null);
		String msg;
		try {
			while(restApiReceive.getMsg()==null){
				System.out.println("delay..");
				Thread.sleep(2000);
			}

		} catch (InterruptedException _ignored) {
			Thread.currentThread().interrupt();
		}
		msg = restApiReceive.getMsg();
		System.out.println("DONE........ "+msg);

		if(msg.equals("Payment Is Invalid")){
			return new ResponseEntity<>(new CustomErrorType("Payment Is Invalid"),
					HttpStatus.NOT_FOUND);
		}

		return (new ResponseEntity<>(new MessageType("Payment Is Successful"), HttpStatus.OK));
	}


	@RequestMapping(value = "/getBookingList/{username}", method = RequestMethod.GET)
	public ResponseEntity<?> getBookingList(@PathVariable("username") String username) throws Exception {

		//SENDING MSG to RabbitMq...........................
		restApiSend.sendToDB(username,"bookingListByUsername");

		//RECEIVING MSG from RabbitMq.......................
		restApiReceive.receiveFromDB("bookingListByUsernameFromDB");
		restApiReceive.setMsg(null);
		String msg;
		try {
			while(restApiReceive.getMsg()==null){
				System.out.println("delay..");
				Thread.sleep(2000);
			}

		} catch (InterruptedException _ignored) {
			Thread.currentThread().interrupt();
		}
		msg = restApiReceive.getMsg();
		System.out.println("DONE........ "+msg);

		Type listType = new TypeToken<ArrayList<PurchaseFlight>>(){}.getType();
		List<PurchaseFlight> purchaseFlightList = new Gson().fromJson(msg, listType);

		return (new ResponseEntity<>(purchaseFlightList, HttpStatus.OK));
	}

}
