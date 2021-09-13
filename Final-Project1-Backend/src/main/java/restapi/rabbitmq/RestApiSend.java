package main.java.restapi.rabbitmq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.MessageProperties;
import org.springframework.stereotype.Repository;

@Repository
public class RestApiSend {

    public static void sendToDB(String data, String nameQueue) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(nameQueue, true, false, false, null);
            String message = String.join(" ", data);
            channel.basicPublish("", nameQueue,
                    MessageProperties.PERSISTENT_TEXT_PLAIN,
                    message.getBytes("UTF-8"));
            System.out.println(" [x] Sent '" + message + "'");
            }
    }
}
