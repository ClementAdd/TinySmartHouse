package main

import (
	"log"

	"github.com/streadway/amqp"
)

func main() {
	conn, ch, err := ConnectRabbitMQ()
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()
	defer ch.Close()

	message := "Hello RabbitMQ"

	err = ch.Publish(
		ExchangeName,
		RoutingKey,
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(message),
		},
	)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Message envoyé : %s\n", message)
}
