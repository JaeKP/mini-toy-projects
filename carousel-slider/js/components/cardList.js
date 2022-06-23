import { Card } from "./card.js";

// 카드리스트를 생성한다.
function CardList(data) {
  this.divElem = document.createElement("div");
  this.divElem.classList.add("card-list");

  // DOM에 카드리스트 생성하기
  document.querySelector(".container").appendChild(this.divElem);
  this.init(data);
}

CardList.prototype = {
  prototype: CardList,
  init: function ({ images, width, height }) {
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
