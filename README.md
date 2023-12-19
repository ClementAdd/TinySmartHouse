# TinySmartHouse
IOT School project (Web Services M1 IOT, Mobile, Logiciel)

## Docker
### Getting started
In order to run project's containers :
1. Go to docker folder in the root of the repository folder.
```bash
cd docker
```
2. Run the docker-compose in order to create project's containers.
```bash
docker compose -p tiny-smart-house up -d
```

### Docker containers info :
Here you can find a list information about each container that we created earlier :
- Postgres :
    * ports:
      - 5432
    * environment:
      - POSTGRES_USER: user
      - POSTGRES_PASSWORD: password
      - POSTGRES_DB: tiny-smart-house
- PgAdmin :
    * ports:
      - 8888
    * environment:
      - PGADMIN_DEFAULT_EMAIL: user@admin.com
      - PGADMIN_DEFAULT_PASSWORD: password
- RabbitMQ :
    * ports:
      - 5672
      - 15672
    * environment:
      - RABBITMQ_DEFAULT_USER: user
      - RABBITMQ_DEFAULT_PASS: password

## PostgreSQL admin
Do you have the problem of connecting to your database in pgadmin ?

Here You can find a link to a tutorial that will guide you to establish your first connection to out PostgreSQL container.

[Let's take a look at our tutorial 📝](https://www.commandprompt.com/education/how-to-run-postgresql-and-pgadmin-using-docker/#:~:text=Step%206%3A%20Access%20pgAdmin4%20on%20Browser)


[Open PostgreSQL admin on your local machine 🛢️](http://localhost:8888/)