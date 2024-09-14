

import { connect, Connection, Channel } from 'amqplib/callback_api';


const amqpUrl: string = 'amqp://localhost';
const exchangeName: string = 'userEmail';
const routingKey: string = 'userEmail';

let channel: Channel;

const setupRabbitMQForUserId = (callback: (channel: Channel) => void) => {
    connect(amqpUrl, (err: Error | null, connection: Connection) => {
        if (err) {
            console.error('Connection error:', err);
            return;
        }

        connection.createChannel((err: Error | null, ch: Channel) => {
            if (err) {
                console.error('Channel creation error:', err);
                return;
            }

            channel = ch;
            channel.assertExchange(exchangeName, 'direct', { durable: true });
            callback(channel);
        });
    });
};

const publishMessageForUserId = (userEmail:string) => {
    if (!channel) {
        console.error('Channel not initialized.gfsdvfsdagdsfgsdfg');
        return;
    }
    let email = userEmail;
    const messageString: string = JSON.stringify({email});
    channel.publish(exchangeName, routingKey, Buffer.from(messageString));
    console.log(`Message published: ${messageString}`);
};

export { setupRabbitMQForUserId, publishMessageForUserId };
