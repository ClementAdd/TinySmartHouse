import amqp from "amqplib";

const mailerConsumer = async () => {
  const queue = "send_mail_queue";

  let connection;
  try {
    // user and password are indicated in the docker-compose file for the creation of rabbitMQ container
    const connection = await amqp.connect("amqp://user:password@localhost:5672");
    process.once("SIGINT", async () => {
      await connection.close();
    });

    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });

    channel.prefetch(1);
    await channel.consume(
      queue,
      (message) => {
        const receivedMessage = message.content.toString();
        const parsedMessage = JSON.parse(receivedMessage);
        console.log(`[x] Received ${JSON.parse(receivedMessage)} from "${queue}"`);

        const seconds = receivedMessage.split(".").length - 1;
        setTimeout(() => {
          console.log("[x] Done");
          channel.ack(message);
        }, seconds * 1000);
      },
      { noAck: false }
    );

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.error("rabbitMq error => ", err);
    connection.close();
  }
};

export default mailerConsumer;

// TODO: Add exchange instead of direct queue name with exchange strategies.
