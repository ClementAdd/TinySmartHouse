package mailer

import (
	_ "bytes"
	"fmt"
	_ "fmt"
	"net/smtp"
	_ "text/template"
)

func SendMail(body string) {
	from := "" //METTRE UNE ADRESSE MAIL D'ENVOI
	pass := "" //METTRE UN PASSWORD
	to := ""   //ADRESSE MAIL QUI RECEVRA LA NOTIF

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: Hello there\n\n" + body

	err := smtp.SendMail("smtp.gmail.com:587", //CONFIG UNIQUEMENT POUR UNE ADRESSE D'ENVOI @gmail.com
		smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))

	if err != nil {
		fmt.Printf("smtp error: %s", err)
		return
	}
	fmt.Println("Successfully sended to " + to)
}
