import { Card } from "./card.js";

// 카드리스트를 생성한다.
function CardList(data) {
  this.cardListElem = document.createElement("div");
  this.cardListElem.classList.add("card-list");
  this.cardListElem.setAttribute("data-count", 0);
  this.cardListElem.setAttribute("id", data.id);


  // CardList 생성하기
  document.querySelector(".carousel:last-child").appendChild(this.cardListElem);
  
  // Card 생성하기
  this.cardCreate(data);
}

CardList.prototype = {
  prototype: CardList,
  cardCreate: function ({ images, width, height }) {
    images.forEach(({ download_url }, index) => {
      const data = {
        width,
        height,
        index: index,
        imageUrl: download_url,
      };
      // console.log(data)
      new Card(data);
    });
  },
};

export { CardList };
