import styled from "styled-components";

const CardWrapper = styled.div`
  background: linear-gradient(180deg, #fdf7ef 0%, #f9eddd 100%);
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 350px;
  margin: 10px 15px;
  width: 230px;
`;

const CardImage = styled.img`
  max-width: 185px;
`;

const CardName = styled.p`
  background: #fff;
  border-color: #f9eddd;
  border-radius: 0px 0px 30px 30px;
  border-style: solid;
  border-width: 0px 1px 1px 1px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  width: 100%;
`;

export { CardImage, CardName, CardWrapper };
