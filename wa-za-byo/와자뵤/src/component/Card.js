import styled from "styled-components";

function Card({ data, setData, deleteData }) {
  const greyExp = (num) => {
    const red = num >= 6 ? 6 : num;
    const grey = 6 - red;
    const greyArray = new Array(grey).fill(0); // [0, 0, 0, 0]
    return greyArray;
  };

  const redExp = (num) => {
    const red = num >= 6 ? 6 : num;
    const redArray = new Array(red).fill(0); // [0, 0]
    return redArray;
  };
  // Drop이벤트를 사용하기 위해서는 기본동작을 막아야 한다.

  let dragStartId = 0;
  const onDragStart = (num) => {
    dragStartId = num;
  };

  const onDrop = (dropId) => {
    const startData = data.find((element) => element.id === dragStartId);
    const startDataIndex = data.indexOf(startData);
    const dropData = data.find((element) => element.id === dropId);
    const dropDataIndex = data.indexOf(dropData);
    startData.id = dropId;
    dropData.id = dragStartId;

    const newData = [...data];
    newData[startDataIndex] = dropData;
    newData[dropDataIndex] = startData;
    setData(newData);
  };

  return (
    <div>
      <StyledDiv>
        <StyledCardContainer onDragOver={(e) => e.preventDefault()}>
          {data.map((detailData) =>
            detailData.id === undefined ? null : (
              <StyledCard
                key={detailData.id}
                draggable
                onDragStart={() => onDragStart(detailData.id)}
                onDrop={() => onDrop(detailData.id)}
              >
                <StyledP1>{detailData.date} </StyledP1>
                <StyledDeleteButton onClick={() => deleteData(detailData.id)}>
                  ✖
                </StyledDeleteButton>
                <StyledP2>{detailData.calories} kcal</StyledP2>
                <StyledP3>{detailData.time} </StyledP3>
                <StyledCircleContainer>
                  {redExp(Math.floor(detailData.calories / 50)).map(
                    (item, index) => {
                      return (
                        <StyledExpBarRed
                          key={`${detailData.id}-red-${index}`}
                        />
                      );
                    }
                  )}
                  {greyExp(Math.floor(detailData.calories / 50)).map(
                    (item, index) => {
                      return (
                        <StyledExpBarGrey
                          key={`${detailData.id}-grey-${index}`}
                        />
                      );
                    }
                  )}
                </StyledCircleContainer>
              </StyledCard>
            )
          )}
        </StyledCardContainer>
      </StyledDiv>
    </div>
  );
}

const StyledDiv = styled.div`
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledCardContainer = styled.div`
  width: 80%;
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 1em 1.5em;

  @media (min-width: 1224px) {
    margin-left: -150px;
  }
`;

const StyledCard = styled.div`
  position: relative;
  width: 45%;
  height: 130px;
  border-radius: 0.4em;
  background-color: #008d62;

  &:hover {
    width: 46%;
    height: 135px;
    transition: 300ms;
    box-shadow: 5px 5px;
  }

  @media (min-width: 600px) {
    width: 30%;
    &:hover {
      width: 31%;
    }
  }

  @media (min-width: 800px) {
    width: 22%;
    &:hover {
      width: 23%;
    }
  }

  @media (min-width: 1500px) {
    width: 15%;
    &:hover {
      width: 16%;
    }
  }
`;
const StyledP1 = styled.p`
  text-align: center;
  font-weight: 400;
  font-family: "Noto Sans KR", sans-serif;
  color: white;
  margin-top: 0.2em;
  font-size: 0.9em;
`;

const StyledP2 = styled.p`
  text-align: center;
  font-weight: 800;
  font-family: "Gugi", cursive;
  color: white;
  padding: 0;
  margin-top: 0.5em;
  margin-bottom: 0;
  font-size: 1.5em;
`;

const StyledP3 = styled.p`
  text-align: center;
  font-weight: 300;
  font-family: "Noto Sans KR", sans-serif;
  color: white;
  margin: 0;
  font-size: 0.75em;
`;

const StyledDeleteButton = styled.button`
  display: inline;
  position: absolute;
  right: 5px;
  top: 5px;
  background-color: transparent;
  border: 0;
  color: white;
  font-family: "Gugi", cursive;
  font-size: 1em;

  &:hover {
    cursor: pointer;
  }
`;

const StyledCircleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5em;
`;

const StyledExpBarRed = styled.div`
  width: 20px;
  height: 20px;
  background-color: crimson;
  border-radius: 20%;
  box-shadow: 2px 2px;
`;

const StyledExpBarGrey = styled.div`
  width: 20px;
  height: 20px;
  background-color: #6fb394;
  border-radius: 20%;
  box-shadow: 2px 2px;
`;

export default Card;
