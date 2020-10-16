import styled from 'styled-components';

export const CardHeader = styled.h1`
  color: #111;
  border-radius: 2px;
  font-size: 20px;
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

export const Card2Container = styled.div`
  //  .card-body{
  //    background-color:#111;
  //  }
`;

export const Card2Header = styled.h1`
  color: #111;
  border: none;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 29px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
`;
