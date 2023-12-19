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
- MySQL :
    * ports:
      - 3306
    * environment:
      - MYSQL_ROOT_PASSWORD: admin
      - MYSQL_USER: user
      - MYSQL_PASSWORD: password
      - MYSQL_DATABASE: tiny-smart-house
- PhpMyAdmin :
    * ports:
      - 8090
    * environment:
      - PMA_HOST: db
      - MYSQL_ROOT_PASSWORD: admin
- RabbitMQ :
    * ports:
      - 5672
      - 15672
    * environment:
      - RABBITMQ_DEFAULT_USER: user
      - RABBITMQ_DEFAULT_PASS: password