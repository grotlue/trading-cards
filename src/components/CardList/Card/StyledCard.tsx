import styled from "styled-components";

const CardWrapper = styled.li`
  background: linear-gradient(180deg, #fdf7ef 0%, #f9eddd 100%);
  border-radius: 30px;
  height: 330px;
  width: 230px;
  margin: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
  align-items: center;
`;

const CardImage = styled.img`
  max-width: 185px;
`;

const CardName = styled.p`
  background: #fff;
  text-align: center;
  border-radius: 0px 0px 30px 30px;
  width: 100%;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #f9eddd;
  box-sizing: border-box;
  padding: 10px;
`;

const CardDetails = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  width: 100%;
`;

const CardDetailRow = styled.div`
  width: 100%;
  margin: 5px 0;
  display: flex;
`;

const CardDetailLabel = styled.p`
  font-weight: bold;
  margin-right: 5px;
`;
const CardDetail = styled.p``;

export {
  CardImage,
  CardName,
  CardDetails,
  CardDetail,
  CardDetailLabel,
  CardDetailRow,
  CardWrapper,
};
