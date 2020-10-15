import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .button {
    border: 1px solid black;
  }
`;

export const LoginHeader = styled.h1`
  color: #111;
  // background-color: #2d3436;
  // background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
  font-family: 'Helvetica Neue', sans-serif;
  border-radius: 5px;
  font-size: 30px;
  // padding:5px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
`;

export const Center = styled.div`
  margin: 0;
  position: absolute;
  top: 60%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  padding: 40px;

  .breadcrumb {
    background: #fff;
    padding: 20px;
  }

  .form-input {
    padding: 5px;
  }

  .form-control {
    padding-right: 70px;
    border: none;
    width: 400px;
    height: 56px;
    // border-bottom:1px solid black;
    background: #eceef0 0% 0% no-repeat padding-box;
    color: #a9a9a9;
  }

  button {
    width: 400px;
    height: 56px;
    background: var(--unnamed-color-3f47cc) 0% 0% no-repeat padding-box;
    background: #3f47cc 0% 0% no-repeat padding-box;
    border-radius: 8px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1.54px;
    opacity: 1;
  }

  #inv {
  }
`;
export const FormBottom = styled.div`
  margin-top: 12px;
  width: 400px;
  display: flex;
  justify-content: space-between;
  .empLogin {
    text-decoration: none;
    color: black;
  }
  .forgot {
    color: #b3b7b8;
  }
`;

export const LoginHead = styled.div`
  position: absolute;

  left: 48%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  top: 120px;
  width: 237px;
  height: 107px;

  img {
    height: inherit;
    width: inherit;
  }
`;
export const Heading = styled.div`
position:absolute; 
top: 25%;
left:50%;
-ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size:48px ;
  width:100vw
  margin: 0 auto 0 auto;
  font-weight:700;
  text-align: center;
 font-family:'rubik';
letter-spacing: 0px;
color: #000000;
opacity: 0.87;

@media only screen and (max-width: 1300px) {
  font-size:32px ;
}





`;

export const SubHeading = styled.p`
  position: absolute;
  top: 30%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  text-align: center;
  font-family: 'rubik';
  font-size: 16px;
  font-weight: 400;
  @media only screen and (max-width: 780px) {
    font-size: 14px;
    top: 34%;
  }
`;
export const BottomLinks = styled.div`
  margin-top: 83px;
  display: flex;
  justify-content: space-around;

  .BtmLink {
    text-decoration: none;
    color: #b3b7b8;
  }
`;
