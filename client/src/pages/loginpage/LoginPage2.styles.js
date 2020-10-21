import styled from 'styled-components';
export const MainLogin = styled.div`
  width: 480px;
  z-index: 80;
  height: 100vh;
  .loginform {
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  h6 {
    margin: 0 13%;
    padding: 10px 0 -20px 0;
  }
  .form-group {
    margin: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-group input {
    padding: 4px;
    height: 18px;
    outline: none;
    font-size: 16px;
    margin: 0 0;
  }

  @media only screen and (max-width: 780px) {
    width: 100vw;
  }
`;
export const MainSlide = styled.div`
  
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  width: 100vw;
  background: #3f47cc;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  z-index: 10;
  overflow: hidden;
  .image {
    position: absolute;
    z-index: 20;
    opacity: 0.8;
    text-align: center;
  }
  .Head {
    position: absolute;
    bottom: 80px;
    color: white;
    font-weight: 300;
    font-family: 'Montserrat', sans-serif;
  }

  @media only screen and (max-width: 951px) {
    .Head {
      font-size: 21px;
    }
  }


  .Circle1 {
    position: absolute;
    width: 450px
    z-index: -10;
    left: 360px;

        top : -80px;
  }
  .Circle1 img {
    width: inherit;
  }

  @media only screen and (max-width: 780px) {
    display: none;
  }
`;
export const MainContainer = styled.div`
  display: flex;

  * {
    border: none;
    margin: none;
    padding: none;
    overflow-x: none;
    box-sizing: border-box;
  }
  .Logo {
    margin: none;
  }
`;
export const Heading = styled.div`
  font-size: 48px;

  font-weight: 700;
  text-align: center;
  font-family: 'rubik';
  letter-spacing: 0px;
  color: #000000;
  opacity: 0.87;
`;

export const SubHeading = styled.p`
  text-align: center;
  font-family: 'rubik';
  font-size: 16px;
  margin-left: 10%;
  font-weight: 400;
`;
export const Footer = styled.div`
  position: absolute;
  bottom: 10px;
  z-index: 120;
  width: 100%;
  background: white;
  height: 20px;
  .footer-up {
    height: 10px;
    width: inherit;
  }
  .footer-down {
    height: inherit;
    background: #3f47cc;
    color: white;
    display: flex;
  }
  .Link {
    color: white;
    text-decoration: none;
    margin: 0 10px;
    font-size: 14px;
  }
  .Link:hover {
    color: white;
  }
`;
