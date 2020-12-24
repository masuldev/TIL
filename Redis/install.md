### Redis install

```bash
# make 하기 위한 gcc, gcc64 다운
sudo yum install -y gcc gcc64

# redis-cli 설치 및 make
wget http://download.redis.io/redis-stable.tar.gz && tar xvzf redis-stable.tar.gz && cd redis-stable && make

# redis-cli를 bin에 추가해 어느 위치서든 사용 가능하게 등록
sudo cp src/redis-cli /usr/bin/

# redis-server를 bin에 추가해 어느 위치서든 사용 가능하게 등록
sudo cp src/redis-server /usr/bin/
```
