package main.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class tes {
    public static void main(String[] args) {
        //check seat number ordered for each flight code
        //get current data of regular zone seat of Airline
        String seatRegularZone = "A-1/A-2/B-1/C-2";
        String[] seatArr = new String[10];
        seatArr = seatRegularZone.split("/");
        List<String> airplaneSeatRegularZone = new ArrayList<>(Arrays.asList(seatArr));
        //get current data of green zone seat of Airline
        String seatGreenZone = "B-2/C-1";
        seatArr = new String[10];
        seatArr = seatGreenZone.split("/");
        List<String> airplaneSeatGreenZone = new ArrayList<>(Arrays.asList(seatArr));
        //get current data of sold seat of Airline
        String seatSold = "D-1/D-2";
        seatArr = new String[10];
        seatArr = seatSold.split("/");
        List<String> airplaneSeatSold = new ArrayList<>(Arrays.asList(seatArr));

        //get ordered regular zone seat and green zone seat of passengers
        List<String> orderedSeatRegularZone = new ArrayList<>();
        List<String> orderedSeatGreenZone = new ArrayList<>();
        orderedSeatRegularZone.add("A-1");
        orderedSeatRegularZone.add("A-2");

        airplaneSeatRegularZone = removeIntersection(airplaneSeatRegularZone,orderedSeatRegularZone);
        airplaneSeatGreenZone = removeIntersection(airplaneSeatGreenZone,orderedSeatGreenZone);
        airplaneSeatSold.addAll(orderedSeatRegularZone);
        airplaneSeatSold.addAll(orderedSeatGreenZone);

        System.out.println(toString(airplaneSeatRegularZone));
        System.out.println(toString(airplaneSeatGreenZone));
        System.out.println(toString(airplaneSeatSold));
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
