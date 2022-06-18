import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";

function Modal({ show, hide, data, setData }) {

  // 새로 고침하면 id가 리셋된다.
  // const [index, setIndex] = useState(1);
  const [index, setIndex] = useState(data[data.length - 1].id + 1 || 1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");

  const changeIndex = () => {
    setIndex((current) => current + 1);
  };

  const changeDate = (event) => {
    setDate(event.target.value);
  };
  const changeTime = (event) => {
    setTime(event.target.value);
  };

  const changeCalories = (event) => {
    setCalories(event.target.value);
  };

  const formSubmit = (event) => {
    hide();
    event.preventDefault();

    const newData = { id: index, date: date, time: time, calories: calories };
    const realData = [...data];
    realData.push(newData);
    setData(realData);
    changeIndex();

    setDate("");
    setTime("");
    setCalories("");
  };

  return (
    <div>
      {show ? (
        <StyledContainer onClick={hide}>
          <StyledModal onClick={(event) => event.stopPropagation()}>
            <form onSubmit={formSubmit}>
              <label htmlFor="date"> 📅 날짜</label>
              <StyledInput
                id="date"
                type="date"
                value={date}
                onChange={changeDate}
                required
              />
              <label htmlFor="time"> ⏰ 플레이 시간 </label>
              <StyledInput
                id="time"
                type="text"
                value={time}
                onChange={changeTime}
                required
              />
              <label htmlFor="calories"> 🏆 소모 칼로리</label>
              <StyledInput
                id="calories"
                type="number"
                value={calories}
                onChange={changeCalories}
                required
              />
              <StyledButton type="submit">저장</StyledButton>
            </form>
          </StyledModal>
        </StyledContainer>
      ) : null}
    </div>
  );
}

const StyledContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;
const StyledModal = styled.div`
  background-color: white;
  padding: 2.5em;
  border-radius: 0.5em;
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-family: "Noto Sans KR", sans-serif;
`;
const StyledInput = styled.input`
  display: block;
  margin-top: 0.5em;
  margin-bottom: 2em;
  min-width: 150px;
  width: 20vw;
  height: 9%;
`;

const StyledButton = styled.button`
  border: 0;
  background-color: #ff9300;
  padding: 0.3em 1em;
  border-radius: 0.2em;
  height: 2em;
  font-size: 1rem;
  color: white;
  font-weight: 500;
  font-family: "Noto Sans KR", sans-serif;
  margin-bottom: 1em;

  &:hover {
    cursor: pointer;
  }
`;

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

export default Modal;
