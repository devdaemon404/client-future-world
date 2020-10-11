import styled from 'styled-components';

export const HeroSecondContainer = styled.div`
  background: url(https://images.unsplash.com/photo-1581091215367-9b6c00b3035a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)
    center center no-repeat;
  background-size: cover;
  // height: 85.7vh;
  padding: 80px 0 60px 0;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #040f16;
    background-image: linear-gradient(315deg, #040f16 0%, #3e92cc 74%);
    opacity: 0.6;
    -moz-opacity: 0.6;
    -khtml-opacity: 0.6;
  }
`;

export const MainHeader = styled.h1`
  color: #f8f8f8;
  background-color: #2d3436;
  background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
  font-family: 'Helvetica Neue', sans-serif;
  border-radius:5px;
  font-size: 50px;
  padding:5px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
`;


export const MainPara = styled.p`
  color: #111;
  // background: #222;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 25px;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
  padding: 20px;
`;
