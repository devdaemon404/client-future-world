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
  width: 19rem;
  transition: all 0.4s ease-in-out;

  &:hover {
    transform: scale(1.1);
    z-index: 1;
  }
`;

