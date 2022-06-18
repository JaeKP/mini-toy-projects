import styled from "styled-components";
import { useState } from "react";
import Modal from "./Modal";

function Button({ data, setData }) {
  const [modalOn, setModalOn] = useState(false);
  const openModal = () => setModalOn(true);
  const closeModal = () => setModalOn(false);
  return (
    <div>
      <StyledButton onClick={openModal}>+</StyledButton>
      <Modal show={modalOn} hide={closeModal} data={data} setData={setData} />
    </div>
  );
}

const StyledButton = styled.button`
  border: none;
  border-radius: 50%;
  background-color: #ffac00;
  color: white;
  width: 50px;
  height: 50px;
  font-size: 2.5rem;
  position: fixed;
  top: 80%;
  right: 10%;
  z-index: 50;

  &:hover {
    cursor: pointer;
    background-color: crimson;
  }
`;

export default Button;
