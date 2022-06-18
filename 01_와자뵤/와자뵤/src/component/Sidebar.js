import styled from "styled-components";

function Sidebar({ data }) {
  const caloriesList = data.map((element) => Number(element.calories) || 0);
  const maxCalories = Math.max(...caloriesList);
  const totalCalories = caloriesList.reduce((sum, cur) => {
    return sum + cur;
  }, 0);
  const averCalories =
    Math.round(totalCalories / (caloriesList.length - 1)) || 0;

  return (
    <div>
      <StyledSideBar>
        <StyledSideBarTitle>BEST</StyledSideBarTitle>
        <StyledSideBarContent>{maxCalories} kcal</StyledSideBarContent>
        <StyledHorizon />
        <StyledSideBarTitle>AVERAGE </StyledSideBarTitle>
        <StyledSideBarContent>{averCalories} kcal</StyledSideBarContent>
        <StyledHorizon />
      </StyledSideBar>
    </div>
  );
}

const StyledSideBar = styled.span`
  width: 15%;
  background-color: #f0f0f2;
  border-radius: 0.5em;
  height: 500px;
  position: fixed;
  padding-top: 1em;
  top: 105px;
  right: 50px;
  display: none;

  @media (min-width: 1224px) {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 1516px) {
    width: 11%;
  }
`;

const StyledSideBarTitle = styled.p`
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
  color: #008d62;
  font-weight: 800;
  font-size: 1.5em;
`;
const StyledSideBarContent = styled.p`
  text-align: center;
  font-family: "Gugi", cursive;
  color: #555;
  font-size: 1.7em;
  font-weight: bold;
  margin-top: 0px;
  color: #333;
`;

const StyledHorizon = styled.p`
  width: 80%;
  text-align: center;
  border-bottom: 0.25em solid grey;
  margin: 1em auto;
`;

export default Sidebar;
