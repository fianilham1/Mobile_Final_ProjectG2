package main.java.restapi.rabbitmq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import org.springframework.stereotype.Repository;

@Repository
public class RestApiReceive {

    private String msg;

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public String receiveFromDB(String nameQueue) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        final Connection connection = factory.newConnection();
        final Channel channel = connection.createChannel();

        channel.queueDeclare(nameQueue, true, false, false, null);
        System.out.println(" [*] Waiting for messages from database");

        channel.basicQos(1);

        //final String[] msg = {""};
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [x] Received '" + message + "'");
            try {
                setMsg(message);
            } catch (Exception e){ System.out.println(e);
            } finally {
                System.out.println(" [x] Done");
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            }
        };
        channel.basicConsume(nameQueue, false, deliverCallback, consumerTag -> { });
//        delay();
        return msg;
    }

    private static void delay() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException _ignored) {
            Thread.currentThread().interrupt();
        }

    }
}
