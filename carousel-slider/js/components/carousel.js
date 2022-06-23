import { CardList } from "./cardList.js";
import { Button } from "./button.js";

function Carousel(data) {
  this.carouselElem = document.createElement("div");
  this.carouselElem.classList.add("carousel");
  this.carouselElem.style.height = data.height;
  
  document.querySelector(".container").appendChild(this.carouselElem);
  new CardList(data);
  new Button(data);
}

export { Carousel };
