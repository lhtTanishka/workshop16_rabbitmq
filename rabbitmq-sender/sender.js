const amqp = require('amqplib');

async function sendMessage() {
    const connection = await amqp.connect('amqp://localhost'); 
    const channel = await connection.createChannel(); 

    const exchange = 'my_exchange'; 
    const msg = { name: 'Tanishka', age: 22 }; 

    await channel.assertExchange(exchange, 'fanout', { durable: false });

    channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)));

    console.log('Message Sent:', msg);

    setTimeout(() => {
        connection.close(); 
    }, 500);
}

sendMessage().catch(console.error);
