package main.java.backend.service;

import main.java.backend.model.ThirdPartyPayment;
import main.java.restapi.rabbitmq.RestApiReceive;
import main.java.restapi.rabbitmq.RestApiSend;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.Reader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

public class PaymentService {

    private static RestApiSend restApiSend;
    private static RestApiReceive restApiReceive;

    public String getVirtualAccountNumber(String prefix) {//generate 13 digit
        Random rand = new Random();
        int lengthLeft = 12-prefix.length(); //total va digit is 16
        long x = (long)(rand.nextDouble()*(Math.pow(10,lengthLeft)));

        String s = prefix + "0" + String.format("%0"+lengthLeft+"d", x);
        return s;
    }

    public String timerPayment(long max, List<ThirdPartyPayment> vaList, String purchaseId) throws Exception{

        boolean x = true;
        String va = null;
        long displayMinutes=0;
        long starttime=System.currentTimeMillis();
        System.out.println("Timer:");
        long secondspassed=0;
        while(x)
        {
            TimeUnit.SECONDS.sleep(1);
            long timepassed=System.currentTimeMillis()-starttime;
            secondspassed=timepassed/1000;
            if(secondspassed==60)
            {
                secondspassed=0;
                starttime=System.currentTimeMillis();
                //check DB Bank periodically each minutes
                Reader reader = Resources.getResourceAsReader("SqlMapConfigBank.xml");
                SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
                SqlSession session = sqlSessionFactory.openSession();

                Map<Object, Object> params = new HashMap<>();
                params.put("bank1", vaList.get(0).getVirtualAccountNumber());
                params.put("bank2", vaList.get(1).getVirtualAccountNumber());
                params.put("bank3", vaList.get(2).getVirtualAccountNumber());
                params.put("bank4", vaList.get(3).getVirtualAccountNumber());

                va = session.selectOne("Bank.checkPayment", params);
                System.out.println("....Check");

                session.commit();
                session.close();

                if(va!=null){
                    FlightRepositoryImpl flightService = new FlightRepositoryImpl();
                    flightService.acceptPaymentAndUpdateStatus(Integer.parseInt(purchaseId));
                    flightService.updateAirlineDB(Integer.parseInt(purchaseId));
                    System.out.println("SUCCESS PAY");
                    return va;
                }

            }
            if((secondspassed%60)==0)
                displayMinutes++;

            System.out.println(displayMinutes+"::"+secondspassed);

            if(displayMinutes==max){
                FlightRepositoryImpl flightService = new FlightRepositoryImpl();
                flightService.cancelPayment(Integer.parseInt(purchaseId));
                return null;
            }

        }
        System.out.println("DONE >>>>>>>>>>>>>>>>>>");
        return "";
    }
}
