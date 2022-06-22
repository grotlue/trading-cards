import styled from "styled-components";

const CardWrapper = styled.div`
  background: linear-gradient(180deg, #fdf7ef 0%, #f9eddd 100%);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 330px;
  margin: 10px 15px;
  padding-top: 20px;
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

const CardDetails = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
`;

const CardDetailLabel = styled.p`
  font-weight: bold;
  margin-right: 5px;
`;
const CardDetail = styled.p``;

export {
  CardDetail,
  CardDetailLabel,
  CardDetails,
  CardImage,
  CardName,
  CardWrapper,
};
