package main.java.simulationInternetBanking;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.Reader;
import java.util.HashMap;
import java.util.Map;


public class simPay {

    public static void main(String[] args) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigBank.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        //PAYMENT DETAILS >>>> input in internet Banking of user to pay
        String username = "fian1@gmail.com";
        Double totalPrice = 7090000.0;
        String virtualAccountOfPayment = "0099936286041926466";
        int purchaseId = Integer.parseInt(String.valueOf(virtualAccountOfPayment.charAt(0)));

        //Check first the virtual account number and total price based on this virtual acc number
        

        Map<Object, Object> params = new HashMap<>();
        params.put("1",purchaseId);
        params.put("2",username);
        params.put("3",totalPrice);
        params.put("4",virtualAccountOfPayment);

        session.insert("Bank.insert", params);
        System.out.println("PAYMENT to Virtual Account : "+virtualAccountOfPayment+" is Successful");
        session.commit();
        session.close();

    }

}
