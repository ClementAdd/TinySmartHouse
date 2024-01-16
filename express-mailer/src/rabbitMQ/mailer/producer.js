#!/usr/bin/env node
// Post a new task to the work queue

import { connect } from "amqplib";

const testMessage = {
  subject: "registration mail",
  content: "<h1>test</h1>",
  receiver: "test@gmail.com",
};
const queue = "send_mail_queue";
const text = process.argv.slice(2).join(" ") || testMessage;

(async () => {
  let connection;
  try {
    connection = await connect("amqp://user:password@localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });

    for (let i = 1; i < 4; i++) {
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)), { persistent: true });
      console.log(`[x] Sent => ${JSON.stringify(text)} ${i} to "${queue}"`);
    }

    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    await connection.close();
  }
})();
