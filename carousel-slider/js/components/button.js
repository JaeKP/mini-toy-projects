// Button 컴포넌트 

function Button({ height, id, parentNode }) {
  this.height = height;
  this.resizeState = false;                              // resize 관련 속성
  this.cardListElem = document.querySelector(`#${id}`)   // 버튼과 연동되는 카드리스트 

  this.leftButtonElem = document.createElement("div");
  this.rightButtonElem = document.createElement("div");

  this.leftButtonElem.classList.add("left");
  this.leftButtonElem.innerText = "❬";
  this.rightButtonElem.classList.add("right");
  this.rightButtonElem.innerText = "❭";

  // 버튼 사이즈, 위치 조정
  this.setButtonSize();
  
  // DOM에 반영 : document.querySelector(".carousel:last-child").append(this.leftButtonElem, this.rightButtonElem);
  parentNode.append(this.leftButtonElem, this.rightButtonElem);
  this.init();
}

Button.prototype = {
  prototype: Button,
  init: function () {
    let cardListWidth = this.cardListElem.getBoundingClientRect().width;
    let totalCount = (cardListWidth - document.querySelector("body").offsetWidth) / 10;
    let count = this.cardListElem.getAttribute("data-count");
    
    window.addEventListener("resize", () => {
      clearTimeout(this.resizeState);

      // 캐러셀 이동 초기화
      this.cardListElem.setAttribute("data-count", 0);
      this.cardListElem.style.transform = "translate3d(0, 0, 0)";
      count = 0
      
      this.resizeState = setTimeout(()=> {
        // 버튼 사이즈 조정
        this.setButtonSize();

        // 캐러셀 이동 조정
        cardListWidth = this.cardListElem.offsetWidth;
        totalCount = (cardListWidth - document.querySelector("body").offsetWidth) / 10;
        // console.log(`offsetWidth: ${this.cardListElem.offsetWidth}`)
      }, 2000)
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

    // 왼쪽 버튼 
    this.leftButtonElem.style.fontSize = `calc(${height}/3)`;
    this.leftButtonElem.style.top = `calc(${height}/2 - ${height}/4.5)`;

    // 오른쪽 버튼
    this.rightButtonElem.style.fontSize = `calc(${height}/3)`;
    this.rightButtonElem.style.top = `calc(${height}/2 - ${height}/4.5)`;
  },
};

export { Button };
