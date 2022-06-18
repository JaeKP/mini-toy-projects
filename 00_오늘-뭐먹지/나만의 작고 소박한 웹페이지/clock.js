const clock = document.querySelector(".clock");
const greeting = document.querySelector(".greeting");
const menu = document.querySelector(".menu");
const hmm = document.querySelector(".hmm");
const choiceFood = document.querySelector(".choicefood");
const hate = document.querySelector(".hate");
const like = document.querySelector(".like");
const favorite = document.querySelector(".favorite");
const modal = document.querySelector(".modal");
const body = document.querySelector('body');
const modalBody = document.querySelector(".modalbody");
const suggest = document.querySelector(".suggest");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const myQuoto = document.querySelector(".myquoto");
const home = document.querySelector(".home");

let storage = []

const modifer = [
  "맛있는 ",
  "1주일 내내 먹고 있는 ",
  "제일 좋아하는 ",
  "든든한 ",
  "가성비가 좋은 ",
  "뜨거운 ",
  "뜨끈한 ",
  "시원한 ",
  "차가운 ",
  "불닭소스를 곁들인 ",
  "취두부를 곁들인 ",
  "싱거운 ",
  "매우 짠 ",
  "유통기한이 지난 ",
  "배달의 민족으로 시켜먹는 ",
  "요기요로 시켜먹는 ",
  "민트초코맛이 나는 ",
  "내가 직접 요리한 ",
  "편의점에서 사온 ",
  "치즈사리를 추가한 ",
  "신선한",
  "수제",
  "냉동",
  "안 냉동",
  "킹 갓 제너럴",
  "집 앞 매장에서 먹는"
];
const morning = [
  "맥모닝", 
  "국밥", 
  "토스트", 
  "백반정식",
  "샌드위치", 
  "떡", 
  "시리얼", 
  "도시락", 
  "팬케이크", 
  "설렁탕", 
  "과일", 
  "죽", 
  "에그슬럿", 
  "샐러드", 
  "스프",
  "떡국",
];
const lunch = [
  "햄버거",
  "피자",
  "치킨",
  "돈까스",
  "삼겹살",
  "스테이크",
  "파스타",
  "국밥",
  "설렁탕",
  "샐러드",
  "김치찌개",
  "된장찌개",
  "백반",
  "우동",
  "라멘",
  "초밥",
  "함박스테이크",
  "쌀국수",
  "카레",
  "마라탕",
  "중국음식",
  "월남쌈",
  "비빔밥",
  "찜닭",
  "아구찜",
  "닭볶음탕",
  "해장국",
  "갈비탕",
  "떡볶이",
  "김밥",
  "잔치국수",
  "칼국수",
  "짜글이",
  "부대찌개",
  "냉면",
  "불고기",
  "볶음밥",
];
const snack = [
  "아이스아메리카노",
  "카페라떼",
  "에이드",
  "스무디",
  "케이크",
  "마카롱",
  "다쿠아즈",
  "쿠키",
  "빵",
  "과자",
  "와플",
  "떡",
  "달고나",
  "젤리",
  "빙수",
  "식혜",
  "수정과",
  "약과",
  "한과",
  "아이스크림",
  "크로플",
  "요거트",
  "스콘",
  "탄산음료",
  "과일",
  "푸딩",
  "말린 과일",
  "초콜릿",
  "사탕",
];
const dinner = [
  "햄버거",
  "피자",
  "치킨",
  "돈까스",
  "삼겹살",
  "스테이크",
  "국밥",
  "설렁탕",
  "샐러드",
  "김치찌개",
  "된장찌개",
  "백반",
  "라멘",
  "초밥",
  "함박스테이크",
  "쌀국수",
  "카레",
  "마라탕",
  "중국음식",
  "월남쌈",
  "비빔밥",
  "찜닭",
  "아구찜",
  "닭볶음탕",
  "해장국",
  "갈비탕",
  "짜글이",
  "부대찌개",
  "불고기",
  "곱창볶음",
  "백숙",
  "삼계탕",
  "낙곱새",
  "곱도리탕",
  "간장게장",
  "등갈비찜"
];
const night = [
  "치킨",
  "곱창",
  "닭발",
  "족발",
  "보쌈",
  "알찜",
  "불닭",
  "낙곱새",
  "부속구이",
  "삼겹살",
  "닭꼬치",
  "똥집",
  "오돌뼈",
  "옛날통닭",
  "육회",
  "회",
  "오꼬노미야끼",
  "닭볶음탕",
  "오뎅탕",
  "감자튀김",
  "과자",
  "육포",
];

const quotes = [
  {
    quote: "오늘 먹을 치킨을 내일로 미루지 말자.",
    author: "치킨",
  },
  {
    quote: "박수 칠 때 떠놔라.",
    author: "회",
  },
  {
    quote: "오래 고아야 예쁘다 너도 그렇다.",
    author: "설렁탕",
  },
  {
    quote: "시작이 반반이다.",
    author: "아리스토텔레스",
  },
  {
    quote: "수육했어 오늘도.",
    author: "보쌈달빛",
  },
  { 
    quote: "꺼진 배도 다시보자.",
    author: "류승룡",
  },
  {
    quote: "쪘지만 잘 싸웠다.",
    author: "만두",
  },
  {
    quote: "눈에는 눈, 이에는.",
    author: "고춧가루",

  },
  {
    quote: "가장 낮은 곳에서 가장 고생했을 당신.",
    author: "누룽지",
  },
  {
    quote: "아빠 힘내세요 우리고 있잖아요.",
    author: "사골국물",
  },
  {
    quote: "치킨은 살 안쪄요.",
    author: "내가 쪄요",
  },
  {
    quote: "집이 고픈걸까 배가 고픈걸까.",
    author: "집밥",
  },
  { 
    quote: "등잔 밑이 혼자 먹기 좋다.",
    author: "금강산도 십분컷",
  },
  {
    quote: "사공이 많으면 배가 안부르다.",
    author: "1인 3닭",
  },
  {
    quote: "그래도 치킨은 온다.",
    author: "갈릴레오 갈릴레이",
  },
  {
    quote: "함께 였을 때, 우린 항상 빛났었다.",
    author: "세트 메뉴",
  },
  {
    quote: "살어리 살어리랏다 야식에 살오르리랏다.",
    author: "야들야들맛있셩 얄라리얄라",
  },
  { 
    quote: "원수는 닭다리 집다 만난다.",
    author: "통닭",
  },
  {
    quote: "두드려라 그럼 커질 것이다.",
    author: "왕 돈까스",
  },
  {
    quote: "자라보고 놀란 가슴 솥뚜껑 삼겹살로 달랜다.",
    author: "삼겹살",
  },
  { 
    quote: "끝날 때 까지 끝난 게 아니다.",
    author: "볶음밥 사리",
  },
  {
    quote: "내일은 더 나은 내가 되어야 한다.",
    author: "숙성 스테이크"
  },
  {
    quote: "당면 삼키고 쫄면 씹는다.",
    author: "즉석 떡볶이",
  },
  {
    quote: "소 익고 소금간 고친다.",
    author: "한우",
  },
  {
    quote: "미디움 받을 용기.",
    author: "스테이크",
  },
];

const HIDDEN = "hidden"
const FOODS = "foods"


function clearTime(time){
  return String(time).padStart(2,"0");
}

function random(item){
  return item[Math.floor(Math.random() * item.length)]
}

function time(){
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  // 시간이 한자리 일때 앞에 0을 붙인다. 
  clock.innerText = (`${clearTime(hours)}:${clearTime(minutes)}:${clearTime(seconds)}`);
}

function recommend(){
  const date = new Date();
  const hours = date.getHours();
  // 시간마다 추천 메뉴가 달라진다. 
  if(4 <= hours && hours <= 10  ){
    greeting.innerText = "추천하는 아침 메뉴는 ... "
    menu.innerText = `${random(modifer)} ${random(morning)}`
  }else if(11 <= hours &&  hours <= 14){
    greeting.innerText = "추천하는 점심 메뉴는... "
    menu.innerText = `${random(modifer)} ${random(lunch)}`
  }else if(15 <= hours && hours <= 17){
    greeting.innerText = "추천하는 간식은..."
    menu.innerText = `${random(modifer)} ${random(snack)}`
  }else if(18 <= hours && hours <= 20){
    greeting.innerText = "추천하는 저녁 메뉴는..."
    menu.innerText = `${random(modifer)} ${random(dinner)}`
  }else{
    greeting.innerText = "추천하는 야식 메뉴는..."
    menu.innerText = `${random(modifer)} ${random(night)}`
  }
}

function hideShow(){
  hmm.classList.toggle(HIDDEN);
  myQuoto.classList.toggle(HIDDEN);
  suggest.classList.toggle(HIDDEN);
  like.classList.toggle(HIDDEN);
  hate.classList.toggle(HIDDEN);
  home.classList.toggle(HIDDEN);


}

function loading(){
  choiceFood.classList.toggle(HIDDEN);
  myQuoto.classList.toggle(HIDDEN);
  hmm.src = "image/hmm.gif";
  randomQuoto()
  setTimeout(hideShow,4000);
}

function randomQuoto(){
  const todaysQuote = quotes[Math.floor(Math.random() *  quotes.length)]
  quote.innerText = todaysQuote.quote;
  author.innerText = `-${todaysQuote.author}-`;
}


function re(){
  hideShow()
  recommend()
  randomQuoto()
  setTimeout(hideShow,4000);
}

function favoriteShow(){
  modal.classList.toggle(HIDDEN);
}

function clickBody(event){
  const target = event.target
  if(target.className == "modal"){
    modal.classList.toggle(HIDDEN)
  }
}

function iLikeIt(){
  menuList = menu.innerText;

  const menuListObj = {
    text: menuList,
    id: Date.now()
  }
  
  storage.push(menuListObj);
  clickFavorite(menuListObj);
  save();
}

function save(){
  localStorage.setItem(FOODS,JSON.stringify(storage));
}

function makeDiv(item){ 
  const div = document.createElement("div");
  const span = document.createElement("span");
  const button = document.createElement("button");
  
  span.innerText = `${item.text} `;
  button.innerText = "❌";
  button.addEventListener("click", delDiv);

  div.id = item.id;
  div.appendChild(span);
  div.appendChild(button);
  modalBody.appendChild(div);
  button.addEventListener("click", delDiv);
}

function clickFavorite(item){
  makeDiv(item)
  setTimeout(favoriteShow,500)
}

function delDiv(event){
  const div = event.target.parentElement;
  div.remove()
  storage = storage.filter((food)=> food.id !== parseInt(div.id))
  save()
}

function goToHome(){
  suggest.classList.toggle(HIDDEN);
  like.classList.toggle(HIDDEN);
  hate.classList.toggle(HIDDEN);
  home.classList.toggle(HIDDEN);
  hmm.classList.toggle(HIDDEN);
  choiceFood.classList.toggle(HIDDEN);
  hmm.src = "image/cute.png";
}

time()
recommend()
setInterval(time,1000);

choiceFood.addEventListener("click",loading);
hate.addEventListener("click", re);
favorite.addEventListener("click", favoriteShow);
body.addEventListener("click", clickBody);
like.addEventListener("click", iLikeIt);
home.addEventListener("click",goToHome);


const getStorage = localStorage.getItem(FOODS);

if(getStorage != null){
  const parseFoods = JSON.parse(getStorage);
  storage  = parseFoods;
  parseFoods.forEach(makeDiv);
}