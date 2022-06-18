// import PropTypes from "prop-types";
// import styled from "styled-components";
// import { useEffect, useState } from "react";
// import Card from "./Card";

// function Modal({ show, hide }) {
//   const [count, setCount] = useState(
//     () => JSON.parse(localStorage.getItem("countInLocal")) || [0]
//   );
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [calories, setCalories] = useState("");
//   const [dateList, setdateList] = useState(
//     () => JSON.parse(localStorage.getItem("dateInLocal")) || [""]
//   );
//   const [timeList, settimeList] = useState(
//     () => JSON.parse(localStorage.getItem("timeInLocal")) || [""]
//   );
//   const [caloriesList, setcaloriesList] = useState(
//     () => JSON.parse(localStorage.getItem("caloriesInLocal")) || [""]
//   );

//   const deleteCard = (num) => {
//     const countList = [...count];
//     countList[num] = 0;
//     setCount(countList);
//   };

//   const changeDate = (event) => {
//     setDate(event.target.value);
//   };
//   const changeTime = (event) => {
//     setTime(event.target.value);
//   };

//   const changeCalories = (event) => {
//     setCalories(event.target.value);
//   };

//   useEffect(() => {
//     localStorage.setItem("countInLocal", JSON.stringify(count));
//   }, [count]);

//   useEffect(() => {
//     localStorage.setItem("dateInLocal", JSON.stringify(dateList));
//   }, [dateList]);

//   useEffect(() => {
//     localStorage.setItem("timeInLocal", JSON.stringify(timeList));
//   }, [timeList]);

//   useEffect(() => {
//     localStorage.setItem("caloriesInLocal", JSON.stringify(caloriesList));
//   }, [caloriesList]);

//   const formSubmit = (event) => {
//     hide();
//     event.preventDefault();

//     const dateArr = [...dateList];
//     const timeArr = [...timeList];
//     const caloriesArr = [...caloriesList];
//     dateArr.push(date);
//     timeArr.push(time);
//     caloriesArr.push(calories);
//     setdateList(dateArr);
//     settimeList(timeArr);
//     setcaloriesList(caloriesArr);

//     const countList = [...count];
//     let lastCount = countList.length;
//     countList.push(lastCount);
//     setCount(countList);

//     setDate("");
//     setTime("");
//     setCalories("");
//   };

//   return (
//     <div>
//       <Card
//         count={count}
//         date={dateList}
//         time={timeList}
//         calories={caloriesList}
//         deleteCard={deleteCard}
//       ></Card>
//       {show ? (
//         <StyledContainer onClick={hide}>
//           <StyledModal onClick={(event) => event.stopPropagation()}>
//             <form onSubmit={formSubmit}>
//               <label htmlFor="date"> 📅 날짜</label>
//               <StyledInput
//                 id="date"
//                 type="date"
//                 value={date}
//                 onChange={changeDate}
//                 required
//               />
//               <label htmlFor="time"> ⏰ 플레이 시간 </label>
//               <StyledInput
//                 id="time"
//                 type="text"
//                 value={time}
//                 onChange={changeTime}
//                 required
//               />
//               <label htmlFor="calories"> 🏆 소모 칼로리</label>
//               <StyledInput
//                 id="calories"
//                 type="number"
//                 value={calories}
//                 onChange={changeCalories}
//                 required
//               />
//               <StyledButton type="submit">저장</StyledButton>
//             </form>
//           </StyledModal>
//         </StyledContainer>
//       ) : null}
//     </div>
//   );
// }

// const StyledContainer = styled.div`
//   position: fixed;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba(0, 0, 0, 0.7);
// `;
// const StyledModal = styled.div`
//   background-color: white;
//   padding: 2.5em;
//   border-radius: 0.5em;
//   display: flex;
//   justify-content: center;
//   font-weight: 500;
//   font-family: "Noto Sans KR", sans-serif;
// `;
// const StyledInput = styled.input`
//   display: block;
//   margin-top: 0.5em;
//   margin-bottom: 2em;
//   min-width: 150px;
//   width: 20vw;
//   height: 9%;
// `;

// const StyledButton = styled.button`
//   border: 0;
//   background-color: #ff9300;
//   padding: 0.3em 1em;
//   border-radius: 0.2em;
//   height: 2em;
//   font-size: 1rem;
//   color: white;
//   font-weight: 500;
//   font-family: "Noto Sans KR", sans-serif;
//   margin-bottom: 1em;

//   &:hover {
//     cursor: pointer;
//   }
// `;

// Modal.propTypes = {
//   show: PropTypes.bool.isRequired,
//   hide: PropTypes.func.isRequired,
// };
