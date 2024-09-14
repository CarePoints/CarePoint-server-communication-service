
import {
    connect,
    Connection,
    Channel,
    ConsumeMessage,
  } from "amqplib/callback_api";
import { WebSocketServer } from "../repository/WebSocketServer";
import { User } from "../database/modal/userDataForVideoCall";
  
  const amqpUrl: string = "amqp://localhost";
  const exchangeName: string = "userData";
  const routingKey: string = "userData";
  
  export const connectToRabbitMQForData = (queue: string) => {
    connect(amqpUrl, (err: Error | null, connection: Connection) => {
      if (err) {
        throw err;
      }
      connection.createChannel((err: Error | null, channel: Channel) => {
        if (err) {
          throw err;
        }
  
        // Assert the queue
        channel.assertQueue(queue, { durable: false });
  
        // Bind the queue to the exchange with the routing key
        channel.bindQueue(queue, exchangeName, routingKey);
  
        console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);
  
        // Consume messages from the queue
        channel.consume(queue, async (msg: any | null) => {
            if (msg) {
              try {
                const receivedData = JSON.parse(msg.content.toString());
                // console.log(`Received message in ${queue}:`, receivedData);
          
                // const userData = receivedData.userData;
                // const newUser = new User({
                //   userId: userData._id,
                //   firstname: userData.firstname,
                //   lastname: userData.lastname,
                //   email: userData.email,
                //   password: userData.password,
                //   phonenumber: userData.phonenumber,
                //   profilePic: userData.profilePic,
                //   createdAt: userData.createdAt
                // });
          
                // await newUser.save();
                console.log("User saved to database successfully");
          
              } catch (error) {
                console.error("Error saving user to database:", error);
              }
            }
            channel.ack(msg);
          });
          
      });
    });
  };
