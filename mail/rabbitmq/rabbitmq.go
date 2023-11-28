package rabbitmq

import (
	_ "log"

	"github.com/streadway/amqp"
)

func ConnectRabbitMQ() (*amqp.Connection, *amqp.Channel, error) {
	conn, err := amqp.Dial(RabbitMQURL)
	if err != nil {
		return nil, nil, err
	}
	ch, err := conn.Channel()
	if err != nil {
		return nil, nil, err
	}

	err = ch.ExchangeDeclare(
		ExchangeName,
		"direct",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return nil, nil, err
	}

	_, err = ch.QueueDeclare(
		QueueName,
		true,
		false,
		false,
		false,
		nil)
	if err != nil {
		return nil, nil, err
	}

	err = ch.QueueBind(QueueName, RoutingKey, ExchangeName, false, nil)
	if err != nil {
		return nil, nil, err
	}
	return conn, ch, nil
}
