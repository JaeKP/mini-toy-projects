import { CardList } from "./components/cardList.js";

// 카드 관련 정보
const cardData = {
  url: "https://picsum.photos/v2/list",  // api 요청 url
  width: "23vw",                         // 카드컴포넌트의 너비
  height: "23vw",                        // 카드컴포넌트의 높이
  images: [],                            // 이미지 정보
};


// 리스트 생성 함수
const create = function (data) {
  console.log(data)
  axios({
    url: data.url,
    method: "get",
  }).then((response) => {
    data.images = response.data;
    new CardList(data);
  });
};


create(cardData); 

