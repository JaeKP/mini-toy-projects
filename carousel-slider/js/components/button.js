function Button({ height, id }) {
  this.height = height;
  this.cardListElem = document.querySelector(`#${id}`)

  this.leftButtonElem = document.createElement("div");
  this.rightButtonElem = document.createElement("div");

  this.leftButtonElem.classList.add("left");
  this.leftButtonElem.innerText = "❬";
  this.rightButtonElem.classList.add("right");
  this.rightButtonElem.innerText = "❭";

  this.setButtonSize();

  // DOM에 반영한다.
  document.querySelector(".carousel:last-child").append(this.leftButtonElem, this.rightButtonElem);

  this.init();
}

Button.prototype = {
  prototype: Button,
  init: function () {
    let cardListWidth = this.cardListElem.getBoundingClientRect().width;
    let totalCount = (cardListWidth - document.querySelector("body").offsetWidth) / 10;
    let count = this.cardListElem.getAttribute("data-count");
    
    window.addEventListener("resize", () => {
      // 버튼 사이즈 조정
      this.setButtonSize();

      // 캐러셀 이동 초기화
      this.cardListElem.setAttribute("data-count", 0);
      this.cardListElem.style.transform = "translate3d(0, 0, 0)";
      count = 0

      // 캐러셀 이동 조정
      cardListWidth = this.cardListElem.offsetWidth;
      totalCount = (cardListWidth - document.querySelector("body").offsetWidth) / 10;
      console.log(`offsetWidth: ${this.cardListElem.offsetWidth}`)
      console.log(`clientWidth: ${this.cardListElem.clientWidth}`)
      console.log(`scrollWidth: ${this.cardListElem.scrollWidth}`)
      console.log(this.cardListElem.getBoundingClientRect())
      console.dir(this.cardListElem)
      console.log(this.cardListElem.offsetWidth)
    });

    
    this.leftButtonElem.addEventListener("click", () => {
      if (count == "0") return;
      count = +count - 1;
      this.cardListElem.setAttribute("data-count", `${count}`);
      this.cardListElem.style.transform = `translate3d(-${
        count * totalCount
      }px, 0, 0)`;
    });

    this.rightButtonElem.addEventListener("click", () => {
      if (count == "10") return;
      count = +count + 1;
      this.cardListElem.setAttribute("data-count", `${count}`);
      this.cardListElem.style.transform = `translate3d(-${
        count * totalCount
      }px, 0, 0)`;
    });
  },
  setButtonSize: function () {
    const height = this.height;
    // const top = this.cardListElem.getBoundingClientRect().top + "px"

    this.leftButtonElem.style.fontSize = `calc(${height}/3)`;
    // this.leftButtonElem.style.top = top;
    this.leftButtonElem.style.top = `calc(${height}/2 - ${height}/6)`;

    this.rightButtonElem.style.fontSize = `calc(${height}/3)`;
    // this.rightButtonElem.style.top = top;
    this.rightButtonElem.style.top = `calc(${height}/2 - ${height}/6)`;

    // fontSize / 3.255 = width
    // this.rightButtonElem.style.left = `calc(${document.querySelector("body").offsetWidth}px - ${width} / 9.255)`;
  },
};

export { Button };
