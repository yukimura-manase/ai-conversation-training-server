## API 起動方法

初回だけ以下のコマンドを実行してください。
```
$ sh setup.sh
```

サーバーの起動は以下のコマンドを実行してください。
```
$ node main.js
```

## API 仕様
### talkLogs
POST
```
$ curl -X POST http://localhost:3000/talk_logs -H "Content-Type: application/json" -d '{
  "chatRoomId": 1,
  "userTalk": "ぴゅぴゅ丸って、なに？",
  "aiTalk": "ぴゅぴゅ丸は、ぴゅぴゅすることが大好きなキメラです。"
}'
```

GET：特定のレコード
```
$ curl -X GET http://localhost:3000/talk_logs/22ba3a21-7547-4899-bdfa-44f0f518bc7c | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   294  100   294    0     0  21683      0 --:--:-- --:--:-- --:--:-- 22615
{
  "talkLog": {
    "talkLogId": "22ba3a21-7547-4899-bdfa-44f0f518bc7c",
    "chatRoomId": 1,
    "userTalk": "ぴゅぴゅ丸って、なに？",
    "aiTalk": "ぴゅぴゅ丸は、ぴゅぴゅすることが大好きなキメラです。",
    "createdAt": "2024-09-21T13:06:19.392Z",
    "updatedAt": "2024-09-21T13:06:19.392Z"
  }
}
```

GET：全部
```
$ curl -X GET http://localhost:3000/talk_logs | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   575  100   575    0     0   219k      0 --:--:-- --:--:-- --:--:--  280k
{
  "talk_logs": [
    {
      "talkLogId": "22ba3a21-7547-4899-bdfa-44f0f518bc7c",
      "chatRoomId": 1,
      "userTalk": "ぴゅぴゅ丸って、なに？",
      "aiTalk": "ぴゅぴゅ丸は、ぴゅぴゅすることが大好きなキメラです。",
      "createdAt": "2024-09-21T13:06:19.392Z",
      "updatedAt": "2024-09-21T13:06:19.392Z"
    },
    {
      "talkLogId": "e560d2fa-bda4-4259-8282-5aabd5bb41a2",
      "chatRoomId": 1,
      "userTalk": "ぷみゅ丸って、なに？",
      "aiTalk": "ぴゅぴゅ丸は、ぷみゅ丸のことが大好きなキメラです。",
      "createdAt": "2024-09-21T13:14:45.836Z",
      "updatedAt": "2024-09-21T13:14:45.836Z"
    }
  ]
}
```
