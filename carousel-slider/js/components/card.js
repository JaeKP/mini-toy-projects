// Card 컴포넌트

function Card({ width, height, index, imageUrl, parentNode }) {
  this.divElem = document.createElement("div");
  this.divElem.style.width = width;
  this.divElem.style.height = height;
  this.divElem.style.backgroundImage = `url(${imageUrl})`;
  this.divElem.style.backgroundPosition = "center";
  this.divElem.style.backgroundSize = "cover";
  this.divElem.style.borderRadius = "0.5rem";

  this.divElem.classList.add(index);
  this.divElem.classList.add("card-item");


  // DOM에 반영: document.querySelector(".card-list:last-child").appendChild(this.divElem);
  parentNode.appendChild(this.divElem);
}

export { Card };
