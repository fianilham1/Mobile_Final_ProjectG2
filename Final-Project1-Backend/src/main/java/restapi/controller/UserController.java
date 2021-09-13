package main.java.restapi.controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import main.java.backend.model.Token;
import main.java.backend.model.User;
import main.java.restapi.rabbitmq.RestApiReceive;
import main.java.restapi.rabbitmq.RestApiSend;
import main.java.restapi.util.CustomErrorType;
import main.java.restapi.util.MessageType;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {

	private static List<User> userList;

	// private final String HEADER = "Authorization";
	// private final String PREFIX = "Bearer ";
	// private final String SECRET = "mySecretKey";

	@Autowired
	RestApiSend restApiSend;

	@Autowired
	RestApiReceive restApiReceive;

	@RequestMapping(value = "/signIn", method = RequestMethod.POST)
	//public User login(@RequestBody JSONObject jobj) throws Exception {
	public ResponseEntity<?> loginValidation(@RequestBody JSONObject jobj) throws Exception {

		//SENDING MSG to RabbitMq...........................
		restApiSend.sendToDB(jobj.toString(),"loginValidation");

		//RECEIVING MSG from RabbitMq.......................
		restApiReceive.receiveFromDB("loginValidationFromDB");
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

		User user;
		if (msg.equals("Username Is Not Found")){
			return new ResponseEntity<>(new CustomErrorType("Username Is Not Found"),
					HttpStatus.NOT_FOUND);
		}else if(msg.equals("Password Is Invalid")){
			return new ResponseEntity<>(new CustomErrorType("Password Is Invalid"),
					HttpStatus.NOT_FOUND);
		}else{
			user = new Gson().fromJson(msg, User.class);
			String token = getJWTToken(user.getUsername()+"/"+user.getName());
			user.setToken(token);
			// user.setLoginStatus("Successful");
		}

		return (new ResponseEntity<>(user, HttpStatus.CREATED));
	}


	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public ResponseEntity<?> requestUsers() throws Exception {

		//SENDING MSG to RabbitMq...........................
		restApiSend.sendToDB("getUsers","usersRequest");

		//RECEIVING MSG from RabbitMq.......................
		restApiReceive.receiveFromDB("usersRequestFromDB");
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

		if(msg.equals("No User Found")){
			return new ResponseEntity<>(new CustomErrorType("No User Found"),
					HttpStatus.NOT_FOUND);
		}
		Type listType = new TypeToken<ArrayList<User>>(){}.getType();
		userList = new Gson().fromJson(msg, listType);

		return (new ResponseEntity<>(userList, HttpStatus.OK));
	}

	@RequestMapping(value = "/get/{username}", method = RequestMethod.GET)
	public ResponseEntity<?> requestUsersByEmail(@PathVariable("username") String username) throws Exception {

		JSONObject jobj = new JSONObject();
		jobj.put("username",username);

		//SENDING MSG to RabbitMq...........................
		restApiSend.sendToDB(jobj.toString(),"usersRequestUsername");

		//RECEIVING MSG from RabbitMq.......................
		restApiReceive.receiveFromDB("usersRequestUsernameFromDB");
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

		if(msg.equals("Username Is Not Found")){
			return new ResponseEntity<>(new CustomErrorType("No User Found"),
					HttpStatus.NOT_FOUND);
		}
		User user = new Gson().fromJson(msg, User.class);

		return (new ResponseEntity<>(user, HttpStatus.OK));
	}

	

	@RequestMapping(value = "/signUp", method = RequestMethod.POST)
    public ResponseEntity<?> registerUser(@RequestBody JSONObject jobj) throws Exception {

        //SENDING MSG to RabbitMq...........................
        restApiSend.sendToDB(jobj.toString(),"registerUser");

        //RECEIVING MSG from RabbitMq.......................
        restApiReceive.receiveFromDB("registerUserFromDB");
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

        if(msg.equals("Username Is Already Exist")){
            return new ResponseEntity<>(new CustomErrorType("Username Is Already Exist"),
                    HttpStatus.NOT_FOUND);
        }

        return (new ResponseEntity<>(new MessageType("Register Is Successful"), HttpStatus.CREATED));
    }

	@RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseEntity<?> updateUser(@RequestBody JSONObject jobj) throws Exception {

        //SENDING MSG to RabbitMq...........................
        restApiSend.sendToDB(jobj.toString(),"updateUser");

        //RECEIVING MSG from RabbitMq.......................
        restApiReceive.receiveFromDB("updateUserFromDB");

        return (new ResponseEntity<>(new MessageType("Update is successful"), HttpStatus.CREATED));
    }

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResponseEntity<?> deleteUser(@RequestBody JSONObject jobj) throws Exception {

        //SENDING MSG to RabbitMq...........................
        restApiSend.sendToDB(jobj.toString(),"deleteUser");

        //RECEIVING MSG from RabbitMq.......................
        restApiReceive.receiveFromDB("deleteUserFromDB");

        return (new ResponseEntity<>(new MessageType("Delete Is Successful"), HttpStatus.CREATED));
    }

	@RequestMapping(value = "/forgotPassword/send", method = RequestMethod.POST)
	//public User login(@RequestBody JSONObject jobj) throws Exception {
	public ResponseEntity<?> forgotPasswordSend(@RequestBody JSONObject jobj) throws Exception {

		//SENDING MSG to RabbitMq...........................
		restApiSend.sendToDB(jobj.toString(),"forgotPasswordSend");

		//RECEIVING MSG from RabbitMq.......................
		restApiReceive.receiveFromDB("forgotPasswordSendFromDB");
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

		User user;
		Token tokenMsg = new Token();
		if (msg.equals("Username Is Not Found")){
			return new ResponseEntity<>(new CustomErrorType("Username Is Not Found"),
					HttpStatus.NOT_FOUND);
		}else{
			user = new Gson().fromJson(msg, User.class);
			String token = getJWTToken(user.getUsername()+"/"+user.getName());
			tokenMsg.setToken(token);
			System.out.println("token........ "+tokenMsg);
		}

		return (new ResponseEntity<>(tokenMsg, HttpStatus.CREATED));
	}

	@RequestMapping(value = "/forgotPassword/reset", method = RequestMethod.POST)
	//public User login(@RequestBody JSONObject jobj) throws Exception {
	public ResponseEntity<?> forgotPasswordReset(@RequestBody JSONObject jobj) throws Exception {

		//SENDING MSG to RabbitMq...........................
		restApiSend.sendToDB(jobj.toString(),"forgotPasswordReset");

		//RECEIVING MSG from RabbitMq.......................
		restApiReceive.receiveFromDB("forgotPasswordResetFromDB");

		return (new ResponseEntity<>(new MessageType("Reset Password Is Successful"), HttpStatus.CREATED));
	}

	private String getJWTToken(String username) {
		String secretKey = "mySecretKey";
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils
				.commaSeparatedStringToAuthorityList("ROLE_USER");
		
		String token = Jwts
				.builder()
				.setId("softtekJWT")
				.setSubject(username)
				.claim("authorities",
						grantedAuthorities.stream()
								.map(GrantedAuthority::getAuthority)
								.collect(Collectors.toList()))
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 7000000))
				.signWith(SignatureAlgorithm.HS512,
						secretKey.getBytes()).compact();

		return "Bearer " + token;
	}
}
