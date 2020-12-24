### Kafka Environment setting

```bash
cd kafka_2.13-2.6.0/config

vi server.properties

listeners=PLAINTEXT://:9092

advertised.listeners=PLAINTEXT://anything.you.want.ip:9092

# add config

# function for topic delete
delete.topic.enable=true

# function for store time
log.retention.hours=72

# function for make auto topic
allow.auto.create.topics=false

```
