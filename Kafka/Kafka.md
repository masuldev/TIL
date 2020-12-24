# Kafka

## 1. Kafka Architecture

* Zookeeper(Apache Zookeeper)
  * 본래 Zookeeper의 용도는 클러스터 최신 설정정보 관리, 동기화, 리더 채택 등 클러스터의 서버들이 공유하는 데이터를 관리하기 위해 사용된다.
    * Broker에 분산 처리된 메시지 큐 정보들을 관리한다.
  * 클러스터를 관리하는 Zookeeper 없이는 Kafka 구동이 불가능 하다.
    * 즉, Kafka 서버를 가동하려면 Zookeeper를 먼저 가동해줘야 한다.
* Broker
  * Kafka Server를 의미한다.
  * 한 클러스터 내에서 Kafka server를 여러대 띄울 수 있다.
* Topic
  * 메시지가 생산되고 소비되는 주제
    * 예를 들어, 카톡 단체방 A, B가 있는데, A 방으로 보낸 메시지가 B방에 노출되면 안된다. A 방에 존재하는 사람들에게만 보여져야 한다.
  * 주제에 따라 여러 Topic를 생성해야 한다.
    * ex) email topic, sms topic, push topic...
* Partition
  * Topic 내에서 메시지가 분산되어 저장되는 단위.
    * 한 Topic에 Partition이 3개 있다면, 3개의 Partition에 대해서 메시지가 분산되어 저장된다.
    * 이때 Queue 방식으로 저장되므로 Partition의 끄트머리에 저장이 되어 Partition 내에서는 순서를 보장해주지만, Partition 끼리는 메시지 순서를 보장해주지 않는다.
      * 그래서  Topic 내에 하나의 Partition이 존재할 경우와 여러개의 Partition이 존재할 때 차이점이 있다.
* Log
  * Partition의 한 칸을 Log라고 한다
  * Log는 Key, value, timestamp로 구성된다.
* Offset
  * Partition의 각 메시지를 식별할 수 있는 유니크한 값이다.
    * 메시지를 소비하는 Consumer가 읽을 차례를 의미하므로 Partition마다 별도로 관리된다.
    * 0부터 시작하여 1씩 증가한다.

## 2. Producer와 Consumer Group
* Producer
  * Producer는 정해진 Topic로 메시지를 기록한다.
  * Partition이 여러 개 있을 경우, 기록 될 Partition의 선택은 기본적으로 Round-Robin 방식을 따른다.
    * Partition이 여러 개 있으면 병렬 처리라는 이점이 있지만, Partition 개수는 주의해서 잘 설정해야한다.
  * 각 Partition 내에서는 가장 마지막 offset 뒤에 신규메시지가 저장되므로, Partition 내에서는 순서가 보장되며 기록된다.
    * 하지만 실제 메시지가 사용되는 순간에는 순서가 보장되지 않는다. 그 이유는 Consumer의 동작방식을 이해해야 한다.

* Consumer Group
  * Consumer Group은 하나의 Topic를 담당한다.
    * 즉, Topic는 여려 개의 Consumer Group이 접근할 수 있지만, 하나의 Consumer Group는 하나의 Topic에만 접근 할 수 있다.
  * 왜 존재하는가?
    * 1. Partition에 접근하는 Consumer 관리
      * Consumer Group 내에서 Consumer 인스턴스들은 Topic내에 Partition에서 다음에 소비할 offset이 어디인지 공유하면서 메시지를 소비한다. 그렇기 때문에 다음에 소비할 offset을 잘 관리할 수 있다.
        * 예를 들어 Consumer Group이 없을 경우, 하나의 Partition에 2개의 Consumer가 동시에 접근한다면 어떤 Consumer가 몇 번의 offset을 소비해야 하는지 알 수 없다. 
        * 즉, Consumer Group를 통해 하나의 Partition에는 하나의 Consumer 인스턴스만 접근 할 수 있도록 관리한다.
    * 2. offset을 공유하여 고가용성을 확보
      * Partition에는 하나의 Consumer 인스턴스만 접근할 수 있기 때문에, 특정 Consumer 인스턴스에 에러가 발생했을 시 다른 Consumer 인스턴스는 에러가 발생한 Consumer 인스턴스가 소비하던 Partition을 소비하게 된다.
        * 즉, Consumer가 다운될 대를 대비해 Consumer Group의 Consumer 인스턴스들은 offset을 공유하고 있으며, 이를 통해 고가용성이 확보된다.

