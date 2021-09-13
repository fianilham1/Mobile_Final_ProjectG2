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

    public String getVirtualAccountNumber(int prefix) {
        Random rand = new Random();

        long x = (long)(rand.nextDouble()*100000000000000L);

        String s = prefix + String.format("%014d", x);
        return s;
    }

    public String timerPayment(long max, List<ThirdPartyPayment> bankList, String purchaseId) throws Exception{
        RestApiSend restApiSend = new RestApiSend();
        RestApiReceive restApiReceive = new RestApiReceive();

        boolean x=true;
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
                params.put("bank1", bankList.get(0).getVirtualAccountNumber());
                params.put("bank2", bankList.get(1).getVirtualAccountNumber());
                params.put("bank3", bankList.get(2).getVirtualAccountNumber());
                params.put("bank4", bankList.get(3).getVirtualAccountNumber());

                String va = session.selectOne("Bank.checkPayment", params);
                System.out.println("....Check");

                session.commit();
                session.close();

                if(va!=null){
                    FlightRepositoryImpl flightService = new FlightRepositoryImpl();
                    flightService.acceptPaymentAndUpdateStatus(va, Integer.parseInt(purchaseId));
                    flightService.updateAirlineDB(Integer.parseInt(purchaseId));
                    System.out.println("SUCCESS PAY");
                    break;
                }

            }
            if((secondspassed%60)==0)
                displayMinutes++;

            System.out.println(displayMinutes+"::"+secondspassed);

            if(displayMinutes==max){
                FlightRepositoryImpl flightService = new FlightRepositoryImpl();
                flightService.cancelPayment(Integer.parseInt(purchaseId));
                return "Purchase is CANCEL. Time is up";
            }

        }
        System.out.println("DONE >>>>>>>>>>>>>>>>>>");
        return displayMinutes+"Minutes::"+secondspassed+"Seconds";
    }
}
