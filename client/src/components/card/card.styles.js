import styled from 'styled-components';

export const CardHeader = styled.h1`
  color: #111;
  // background-color:#6B9FC3 ;
  border-radius: 2px;
  // border: 1px solid black;
  font-size: 20px;
  // padding:5px;
  // font-weight: bold;
  // letter-spacing: 1px;
  // line-height:1;
  text-align: center;
`;

export const CardContainer = styled.div`
  // width: 100%;
  transition: all 0.4s ease-in-out;

  &:hover {
    transform: scale(1.1);
    z-index: 1;
  }
`;

export const Card2Container = styled.div`
//  .card-body{
//    background-color:#111;
//  }
`;

export const Card2Header = styled.h1`
  color: #111;
  border:none;
  // background-color: #2d3436;
  // background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
  font-family: 'Helvetica Neue', sans-serif;
  // border-radius:5px;
  font-size: 35px;
  // padding:10px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  // text-align: center;
`;

