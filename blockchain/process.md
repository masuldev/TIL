# process

### Node_server

```
{
    loop
    {
        check()
        node 객체를 role에 따라 가져옴
        node -> main 실행
        iterate
        reload
    }
        lightNode{
            getInstance
            main{
                init(){
                    g.timestamp
                    lastblock
                    expect_block
                }
                round()
                round_manager{
                    network check
                    tracker
                    make round, collect round -> my round, net round, roundInfo
                    check alive nodes
                    end -> cache update
                }
                roundInfo -> memcache에 올림
                내 round Num이 net round Num보다 낮으면 Sync{
                    Validator(같을 경우){
                        - Tracker의 Validator 개수가 > 2 인데
                            alive_validator가 1명이면 alone, return
                        - data polling {
                            collect
                            api
                            chunk
                        }
                        - result가 nothing이면 return(data가 없다)
                        - preCommit
                        - DATA_Different 이면 3번의 data_polling, preCommit
                    }
                }


                finishing work(){
                    bunch fail -> bunch 사용 x
                    block fail -> exclude host
                    hash diff -> ban
                    t?
                    Nothing
                    Alone
                    Success -> checkUseBunch() ->resetFailCast()
                }
            }
        }
}
```
