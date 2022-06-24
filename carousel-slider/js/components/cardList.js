// CardList 컴포넌트

import { Card } from "./card.js";

function CardList(data) {
  this.cardListElem = document.createElement("div");
  this.cardListElem.classList.add("card-list");
  this.cardListElem.setAttribute("data-count", 0);
  this.cardListElem.setAttribute("id", data.id);
  
  
  // DOM에 반영: document.querySelector(".carousel:last-child").appendChild(this.cardListElem);
  data.parentNode.appendChild(this.cardListElem);
  
  // parentNode 속성 변경
  data.parentNode = this.cardListElem;
  
  // Card 컴포넌트 생성
  this.cardCreate(data);
}

CardList.prototype = {
  prototype: CardList,
  cardCreate: function ({ images, width, height, parentNode }) {
    images.forEach(({ download_url }, index) => {
      const data = {
        width,
        height,
        parentNode,
        index: index,
        imageUrl: download_url,
      };
      // console.log(data)
      new Card(data);
    });
  },
};

export { CardList };
