import { Carousel } from "./components/carousel.js";

const containerElem = document.querySelector(".container")

// CardList 관련 data
const cardData = {
  url: "https://picsum.photos/v2/list",  // api 요청 url
  width: "23vw",                         // 카드컴포넌트의 너비
  height: "23vw",                        // 카드컴포넌트의 높이
  images: [],                            // 이미지 정보 
  parentNode: containerElem,             // 부모 노드 (계속 변경될 예정)   
  id: "cl-1",                            // 카드 리스트를 구분하기 위한 id  
};

const cardData1 = {
  url: "https://picsum.photos/v2/list", 
  width: "10vw",                         
  height: "10vw",                      
  images: [],     
  parentNode: containerElem,
  id: "c1-2",                      
};


// Carousel 생성 함수
const create = function (data) {
  axios({
    url: data.url,
    method: "get",
  }).then((response) => {
    data.images = response.data;
    new Carousel(data)
  });
};

create(cardData); 
create(cardData1); 
