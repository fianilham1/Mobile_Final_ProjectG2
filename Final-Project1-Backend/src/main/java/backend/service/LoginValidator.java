package main.java.backend.service;

import java.util.List;
import java.util.regex.Pattern;

public class LoginValidator {
    //Check Valid USERNAME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    public boolean isValidUsername(String usernamehere) {
        Pattern mailPattern = Pattern.compile("^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$");
        boolean flag=true;

        if (!mailPattern.matcher(usernamehere).matches()) {
            flag=false;
        }
        return flag;
    }
    //Check Valid PASSWORD >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    public boolean isValidPass(String passwordhere, List<String> errorList) {
        Pattern specialCharPattern = Pattern.compile("[^a-z0-9 ]", Pattern.CASE_INSENSITIVE);
        Pattern UpperCasePattern = Pattern.compile("[A-Z ]");
        Pattern lowerCasePattern = Pattern.compile("[a-z ]");
        Pattern digitCasePattern = Pattern.compile("[0-9 ]");
        errorList.clear();
        boolean flag=true;

        if (passwordhere.length() < 8) {
            errorList.add("Pass length must >= 8 char!!");
            flag=false;
        }
        if (!specialCharPattern.matcher(passwordhere).find()) {
            errorList.add("Pass must >= 1 special char!!");
            flag=false;
        }
        if (!UpperCasePattern.matcher(passwordhere).find()) {
            errorList.add("Pass must >= 1 uppercase char!!");
            flag=false;
        }
        if (!lowerCasePattern.matcher(passwordhere).find()) {
            errorList.add("Pass must >= 1 lowercase char!!");
            flag=false;
        }
        if (!digitCasePattern.matcher(passwordhere).find()) {
            errorList.add("Password must have atleast one digit character !!");
            flag=false;
        }
        return flag;
    }

    public String authenticateRegex(String username, String password, List<String> errorList)
    {
        String result = "failure";
        if((isValidUsername(username)) && (isValidPass(password,errorList))){
            result = "success";
        }
        return result;
    }

    public String authenticateDB(String username, String usernameDB, String password, String passwordDB)
    {
        String result = "failure";
        if ((username.equals(usernameDB)) && (password.equals(passwordDB))) {
            result = "success";
        }
        return result;
    }

}

