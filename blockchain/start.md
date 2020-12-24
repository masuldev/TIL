# BlockChain Install

1. AWS ami로 BlockChain Server를 생성한다.
   
2. root 권한 -> EQBR 권한을 획득한 후에 /home/EQBR로 이동하여 git clone를 받는다.
   
```bash
sudo su

sudo EQBR

cd /home/EQBR

git clone https://github.com/Hanjinsu/EQBR-Whisper.git
```

3. clone 받은 폴더의 이름을 EQBR로 바꾼다.
   
```bash
mv EQBR-Whisper/ EQBR
```

4. root 권한으로 전환한 후에 command.sh를 실행한다.
   
```bash
exit

cd EQBR

source command.sh
```

5. EQBR 권한으로 다시 전환한 후에 php eqbr_script를 실행한다.
   
```bash
su EQBR

cd src

php eqbr_script
```

6. Reset -> Restart -> Start를 순차적으로 진행한다.

```bash
php eqbr_script Reset

php eqbr_script Restart

php eqbr_script Start
```

7. Genesis에서 Network/AddTracker로 본인 IP를 등록한 후에 validator로 등록한다.

```bash
php eqbr_script Network/AddTracker

php eqbr_script Network/Genesis
```

8. Genesis가 아닌 다른 노드들을 전부 Network/AddTracker를 하여 Genesis의 ip를 등록한다.
   
```bash
php eqbr_script Network/AddTracker
```

9. Genesis에서 RegisterSampleCode를 진행한다.
    
```bash
php eqbr_script Network/RegisterSampleCode
```

---

다른 노드들을 validator로 만드는 방법

1. Genesis에서 Network/GenesisSampleStatus를 실행하고 Account/Info로 vt를 확인한다.
   
```bash
php eqbr_script Network/GenesisSampleStatus

php eqbr_script Account/Info
```

2. Genesis에서 Account/SendValidtorToken로 vt를 validator로 만들고 싶은 노드들의 Address로 보낸다.

```bash
php eqbr_script Account/SendValidtorToken
```

