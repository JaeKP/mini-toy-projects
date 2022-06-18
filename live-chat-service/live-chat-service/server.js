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


// 정적 파일을 제공한다.
//app.use('/test', express.static('./image/')): 서버 image 폴더의 파일들을 제공(액세스 가능), 클라이언트는 http://서버주소/test 로 액세스
app.use("/css", express.static("./static/css"));
app.use("/js", express.static("./static/js"));


// client가 최초 접속 시 보여지는 화면
// get(경로, 함수): 경로를 get방식으로 접속하면 함수를 호출한다.
// 여기서 함수는 request와 response객체를 받는다.
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

//io.sockets: 접속되는 모든 소켓들
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

//서버 실행 (서버를 3000포트로 listen한다)
server.listen(3000, function () {
  console.log("server listening on port : http://localhost:3000/");
});
