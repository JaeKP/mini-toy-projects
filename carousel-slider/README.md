# FE 스터디 발표 자료: 바닐라 JS로 Carousel 만들기

기간: `2022.06.23`

<br>

## 1. 학습 내용

바닐라 JS로 재사용할 수 있는 컴포넌트를 구현한다.  

- `모듈화!`
- 객체 생성자 함수를 활용하여 컴포넌트를 구현함으로서, 코드의 가독성을 높인다. 

<br>

## 2. 구현 과정

### 파일 구조

```
├── css
│   ├── default.css
│   └── index.css
├── js
│   ├── components
│   │   ├── button.js
│   │   ├── card.js
│   │   └── cardList.js
│   └── index.js
├── index.html
└── READEME.md
```

<br>

### 1) HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- css -->
  <link rel="stylesheet" href="./css/default.css">
  <link rel="stylesheet" href="./css/carousel.css">

  <title>Carousel</title>
</head>
<body>
  <div class="container">
  </div>
  <!-- axios 설치 -->
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

  <!-- js -->
  <script type="module" src="./js/carousel.js"></script>
</body>
</html>
```

- 모듈은 특수한 키워드나 기능과 함께 사용되기에 `<script type="module">` 같은 속성을 설정해야 한다. 
- 해당 스크립트가 모듈이란 걸 브라우저가 알 수 있게 해야 한다. 

<br>

**`Module의 장점`**

1. Module은 자신만의 스코프가 있다. 그래서 전역 변수 관리를 쉽게할 수 있다. 

   Module Scope를 사용하여 모듈의 함수간에 변수를 공유할 수 있다. 

2. 어디서든 동일한 Module을 공유할 수 있기 때문에 재사용성이 좋다.
3. 코드를 작은 파일로 분할 할 수 있다. 

<br>

### 2) components

#### (1) 카드 리스트 컴포넌트





![image-20220622175150145](https://raw.githubusercontent.com/JaeKP/image_repo/main/img/image-20220622175150145.png)

![image-20220622175210458](https://raw.githubusercontent.com/JaeKP/image_repo/main/img/image-20220622175210458.png)

<br>

#### (2) 카드 컴포넌트





#### (3) 버튼 컴포넌트

position을 잘못 잡아서 고생 했다. 

`absolute` => `fixed` => `absolute`

1. 처음 구현 

card-list가 부모인 상태로 absolute의 형태로 버튼을 구현했다. 

실제 부모의 길이는 화면을 넘어서 길게 있기 때문에, 오른쪽 버튼을  화면에 보이는 위치에 놓는 

```javascript
this.rightButtonElem.style.left = `calc(${document.querySelector("body").offsetWidth}px - ${width} / 9.255)`;
```

생각해보니, carousel을 card-list가 x축으로 translate하면서 구현하는데 버튼 컴포넌트도 같이 돌아 가기때문에...ㅋ 



2. 두번째 구현 

```javascript
  setButtonSize: function () {
    const height = this.height;
    const top = this.cardListElem.getBoundingClientRect().top + "px"

    this.leftButtonElem.style.fontSize = `calc(${height}/3)`;
    this.leftButtonElem.style.top = top;

    this.rightButtonElem.style.fontSize = `calc(${height}/3)`;
    this.rightButtonElem.style.top = top;

    // fontSize / 3.255 = width
    // this.rightButtonElem.style.left = `calc(${document.querySelector("body").offsetWidth}px - ${width} / 9.255)`;
  },
```





3. 성공

```javascript
```





### 2) transition

