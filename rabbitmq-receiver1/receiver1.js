const amqp = require('amqplib');

async function receiveMessages() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'my_exchange'; 
    await channel.assertExchange(exchange, 'fanout', { durable: false });

    const q = await channel.assertQueue('', { exclusive: true }); 
    console.log('Receiver 1: Waiting for messages in %s. To exit press CTRL+C', q.queue);


    await channel.bindQueue(q.queue, exchange, '');


    channel.consume(q.queue, (msg) => {
        if (msg.content) {
            console.log('Receiver 1 Received:', JSON.parse(msg.content.toString()));
        }
    }, { noAck: true });
}

receiveMessages().catch(console.error);
