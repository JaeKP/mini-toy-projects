# node.js와 socket.io를 활용한 채팅 server/client 구현

개발 기간 : `2022/06/16`

<br>

## 1. 프로젝트 목표

node.js 웹 소켓 라이브러리인 socket.io를 활용하여 간단한 채팅 서버를 구현해본다.

- socket.io 라이브러리를 활용하여 채팅 서버를 구현한다. 
- 사용에 불편함이 없도록 클라이언트 화면을 구현한다. 

<br>

## 2. 프로젝트 소개 

### 1) 프로젝트 프리뷰

<br>

<img src="https://raw.githubusercontent.com/JaeKP/image_repo/main/img/socketIo_readMe_02.gif" width="500px">

<br>

---

### 2) 상세 화면 

<br>

![mini-toy-projects-02-00](https://raw.githubusercontent.com/JaeKP/image_repo/main/img/mini-toy-projects-02-00.jpg)

#### 닉네임 설정

- 접속시, 닉네임을 설정하는 modal창이 뜬다. 

- 닉네임을 설정해야 채팅방에 입장이 가능하다. 
- 닉네임은 최대 15글자이다.

<br>

#### 채팅 

- 입장, 퇴장 시 채팅창 위에 알림이 뜬다. 
- 채팅 입력시, 입력한 시간과 입력한 사람의 닉네임에 대한 정보를 볼 수 있다. 
- 채팅 입력시, fadeIn효과와 함께 말풍선이 올라온다. 
- 채팅 입력시,  그에 맞게 화면이 자동으로 스크롤 된다. 

<br>

![mini-toy-projects-02-01](https://raw.githubusercontent.com/JaeKP/image_repo/main/img/mini-toy-projects-02-01.jpg)

#### 이모지 

- 😍을 누르면 이모지를 선택하여 입력하는 창이 서서히 올라온다. 
- 이모지를 선택하는 창에서 이모지를 클릭 시, 해당 이모지가 채팅을 입력하는 칸에 추가된다. 
- 채팅창을 누르면 이모지를 선택하여 입력하는 창이 서서히 내려간다.

<br>

![mini-toy-projects-02-02](https://raw.githubusercontent.com/JaeKP/image_repo/main/img/mini-toy-projects-02-02.jpg)

#### 알럿창

- 빈 값을 입력한 뒤, 채팅을 보내려고 하면 `메시지를 입력해주세요.`라는 알럿이 뜬다. 
- 욕설로 설정된 단어를 입력한 뒤, 채팅을 보내려고 하면 알럿이 뜬다. 

<br>

## 3. 학습내용

### 서버 (server.js )

[참고한 블로그](https://codevkr.tistory.com/58?category=719250)

위의 블로그가 socket.io에 대해 설명이 잘되어있어 서버는 이를 토대로 개발했다. 설명도 엄청 자세하다. 😊

#### (1) 모듈 불러오기

```javascript
// Node.js 기본 내장 모듈 불러온다.(파일과 관련된 처리)
const fs = require("fs");

// 설치한 express 모듈 불러온다.
const express = require("express");

// express객체를 생성한다.
const app = express();

// Node.js기본 내장 모듈("http")를 불러온 뒤, express 서버를 생성한다.
const server = require("http").createServer(app);

// 설치한 socket.io 모듈 불러온 뒤, socket.io에 바인딩한다.
const io = require("socket.io")(server);
```

- **fs**: 파일의 입출력을 처리하는 모듈 (후에 html 파일을 불러오기 위해 사용한다. )

- **express**: 서버를 생성하기 위해 사용된다. 

- [**socket.io**](https://jangstory.tistory.com/12)
  - `socket`
    -  떨어져 있는 두 호스트를 연결해주는 도구로써 인터페이스 역할을 한다. => 데이터를 주고 받을 수 있는 구조체로 소켓을 통해 통로가 만들어진다.
    - 즉, 프로토콜과 ip주소, 포트넘버로 떨어져있는 두 디바이스를 연결해준다. 
  - Websocket을 기반으로 실시간 웹 애플리케이션을 위한 자바스크립트 라이브러리이다. 
  - 클라이언트와 서버 간의 실시간 양방향 통신을 가능하게 해준다.
  - 이벤트기반으로  서버 소켓과 클라이언트 소켓을 연결하여서 실시간으로 양방향 통신이 가능하게 한다. 

<br>

#### (2) 정적 파일을 제공한다. (자바스크립트, CSS 파일)

```javascript
// 정적 파일을 제공한다.
app.use("/css", express.static("./static/css"));
app.use("/js", express.static("./static/js"));
```

- 정적 파일을 제공하기 위해 미들웨어(MiddleWare)를 사용한다. (여기서는 기본 제공 미들웨어를 사용한다. )
  - 예시: `app.use('/test', express.static('./image/'))` 
  - 서버:  image 폴더의 파일들을 제공(액세스 가능)
  - 클라이언트: http://서버주소/test 로 액세스한다. 
- 미들웨어: 클라이언트에게 요청이 온 뒤,  요청을 보내기 위해 응답하려는 중간에서 목적에 맞게 처리를 하는 함수이다.

<br>

#### (3)  화면 구성

```javascript
// client가 최초 접속 시 보여지는 화면
// get(경로, 함수): 경로를 get방식으로 접속하면 함수를 호출한다.
// 함수는 request와 response객체를 받는다.
// request는 클라이언트에서 전달된 데이터와 정보들이 담겨 있다.
// response에는 클라이언트에게 응답을 위한 정보가 들어있다.

/* Get 방식으로 / 경로에 접속하면 실행 됨 */
app.get('/', function(request, response) {
  fs.readFile('./static/index.html', function(err, data) {
    if(err) {
      response.send('에러')
    } else {
      // HTML 파일라는 것을 알려야 하기때문에 해당 내용을 작성해서 보내준다.
      response.writeHead(200, {'Content-Type':'text/html'})

      // HTML 데이터를 보내준다. 
      response.write(data)

      // 모두 보냈으면 완료되었음을 알린다.
      response.end()
    }
  })
})
```

- fs 모듈을 사용하여 index.html파일을 읽고 클라이언트로 해당 내용을 전달한다. 
  - `readFIle()`메서드는 지정된 파일을 읽어서 데이터를 가져온다. 

<br>

#### (4) 소켓 이벤트

```javascript
// io.sockets: 접속되는 모든 소켓들
// on (수신이벤트, 콜백함수): 콜백으로 전달되는 변수에는 상대가 전송한 데이터가 담겨져 온다.
// 콜백함수에 의해 전달되는 소켓은 접속된 소켓을 의미한다.
io.sockets.on('connection', function(socket){

  // 새로운 유저가 접속했을 경우 다른 소캣에게도 알려준다. 
  socket.on("join", function(name){
    console.log(name + "님이 접속하였습니다.")
    
    // 소켓에 이름을 저장한다. 
    socket.name = name
  
    // 모든 소켓에게 전송한다. 
    io.sockets.emit("update", {type: "connect", name: "SERVER", message: `${name}님이 접속하였습니다.`})
  })

  // 유저 메시지 전달
  socket.on('send', function(data){
    // 받은 데이터에 누가 보냈는 지 이름을 추가한다. 
    data.name = socket.name
    console.log(data)

    // 보낸 사람을 제외한 나머지 유저에게 메시지를 전송한다. 
    socket.broadcast.emit("update", data)
  });

  // 접속 종료
  socket.on('disconnect', function(data){
    // 이름이 없으면, 로그인을 하지 않은 것이기 때문에 종료 메시지를 보내지 않는다. 
    if (socket.name === undefined) {return}
    console.log(socket.name + "님이 나가셨습니다.")
      
    // 나가는 사람을 제외한 나머지 유저에게 메시지를 전송한다. 
    socket.broadcast.emit("update", {type: "disconnect", name: "SERVER", message: `${socket.name}님이 나가셨습니다.`})
  });
});
```

- `io.socket`: 전체 소켓 /  `socket`: 접속된 소켓 (콜백함수에 의해 전달되었음) /  `socket.broadcast`: 나를 제외한 소켓 

- `on`: 수신, `emit`: 전송
  -  접속된 모든 소켓에게 데이터 전달: `io.sockets.emit('이벤트명', 데이터)`
  - 나를 제외한 모든 소켓에게 데이터 전달: `socket.broadcast.emit('이벤트명', 데이터)`

<br>

#### (5) 서버 실행

```javascript
//서버 실행 (서버를 3000포트로 listen한다)
server.listen(3000, function () {
  console.log("server listening on port : http://localhost:3000/");
});
```

- `listen()`메서드를 통해, 원하는 포트번호로 서버를 시작할 수 있다. 

<br>

