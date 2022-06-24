// Carousel 컴포넌트

import { CardList } from "./cardList.js";
import { Button } from "./button.js";

function Carousel(data) {
  this.carouselElem = document.createElement("div");
  this.carouselElem.classList.add("carousel");
  this.carouselElem.style.height = data.height;
  
  // DOM에 반영
  // document.querySelector(".container").appendChild(this.carouselElem);
  data.parentNode.appendChild(this.carouselElem);

  // 부모 노드 속성 바꿔주기
  data.parentNode = this.carouselElem
  // CardList 컴포넌트 생성 
  new CardList(data);

  // 부모 노드 속성 바꿔주기
  data.parentNode = this.carouselElem
  // Button 컴포넌트 생성
  new Button(data);
}

export { Carousel };
