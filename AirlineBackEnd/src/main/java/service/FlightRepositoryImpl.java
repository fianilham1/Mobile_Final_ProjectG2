package main.java.service;

import main.java.model.Flight;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.Reader;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class FlightRepositoryImpl implements FlightRepository {
    @Override
    public List<Flight> findFlightFromDB(Flight flight, String sortBy) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        Map params = new HashMap<>();
        params.put("fromAirport",flight.getFromAirport());
        params.put("toAirport",flight.getToAirport());
        params.put("departureDate",flight.getDepartureDate());
        params.put("seatClass",flight.getSeatClass());
        System.out.println("params flight req "+params);
        List<Flight> flightDB = null;
        if(sortBy.equals("EarliestDeparture")){
            flightDB = session.selectList("Flight.findWithEarliestDeparture", params);
        }

        session.commit();
        session.close();
        return flightDB;
    }


    @Override
    public Flight flightOrderedList(String code) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        Flight flightDB = null;
        flightDB = session.selectOne("Flight.order", code);

        if(flightDB==null){
            session.commit();
            session.close();
            return null;
        }
        session.commit();
        session.close();
        return flightDB;
    }

    @Override
    public void update(int totalPassengers, int totalBaggage, String seatRegularZone, String seatGreenZone, String seatSold, String code) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        Map params = new HashMap<>();
        params.put("numberSeat",totalPassengers);
        params.put("numberBaggage",totalBaggage);
        params.put("seatRegularZone",seatRegularZone);
        params.put("seatGreenZone",seatGreenZone);
        params.put("seatSold",seatSold);
        params.put("code",code);

        session.update("Flight.updateGarada", params);
        session.update("Flight.updateCitilank", params);
        session.update("Flight.updateSrijaya", params);

        session.commit();
        session.close();

    }

    @Override
    public String getSeatRegularZone(String code) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        String seat = session.selectOne("Flight.getSeatRegularZone", code);

        session.commit();
        session.close();
        return seat;
    }

    @Override
    public String getSeatGreenZone(String code) throws Exception {
        Reader reader = Resources.getResourceAsReader("SqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        String seat = session.selectOne("Flight.getSeatGreenZone", code);

        session.commit();
        session.close();
        return seat;
    }

    @Override
    public String getSeatSold(String code) throws Exception {
        Reader reader = Resources.getResourceAsReader("SqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        String seat = session.selectOne("Flight.getSeatSold", code);

        session.commit();
        session.close();
        return seat;
    }


    }
