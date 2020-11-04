import styled from 'styled-components';

export const MainWrapper = styled.div`
  margin: 0px;
  boxsizing: 'border-box';
  padding: 0px;
  background-color: '#f4f4f4';

  display: block;
  @media only screen and (max-width: 720px) {
    display: none;
  }
`;

export const AdminHeader = styled.div`
  width: 100%;
  color: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.13), 0 6px 6px rgba(0,0,0,0.13);
  padding-top: 15px;
  padding-bottom: 10px;

  h2 {
    margin-left: 350px;
    font-weight: 600;
    color: #11154C;
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;

export const NotPhone = styled.div`
  margin: 0px;
  boxsizing: 'border-box';
  padding: 0px;
  background-color: '#f4f4f4';
  height: 100vh;
  display: none;
  .NotPhone-Main {
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .gears {
    max-width: 100px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  .PhoneError {
    text-align: center;
    color: purple;
    font-size: 18px;
  }
  .ErrorContainer {
    width: 80%;
  }

  @media only screen and (max-width: 720px) {
    display: block;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .button {
    border: 1px solid black;
  }
`;

export const SideBar = styled.div`
  z-index: 1000;
  position: fixed;
  left: 320px;
  width: 320px;
  height: 100%;
  margin-left: -320px;
  overflow-y: auto;
  background: #11154c;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);


  .logoContainer {
    padding: 20px;
    width: 320px;
    height: 118px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    background-color: white;
  }
  .SideBarCompMain span {
  }
  .SideBarCompMain {
    padding: 30px;
    width: 320px;
    height: 88px;
    color: white;
    text-align: center;
    font-size: 28px;
    font-family: Montserrat;
    font-weight: 700;
    border-bottom: 2px solid white;
  }
  .SideBarCompItem {
    padding:9px 30px;
    margin:17px auto;
    width: 200px;
    border-radius:8px;
    height: 40px;
    font-size:15px;
    font-weight:700;
    color: white;
    text-align: center;
    cursor: pointer;
  }

  .SideBarCompItem: hover{
   background: rgba(63,70,204, 0.5);
   width: 100%
  } 

  .Logout {
    position: absolute;
    width: 320px;
    text-align: center;
    color: white;
    bottom: 0%;
    padding: 20px;
    cursor: pointer;
  }
  span {
    padding 10px 15px;
    border: 1px solid white;
    font-weight:700;
  }
`;
export const AdminMain = styled.div`
  height: 100%;
  width: inherit;
  margin-left: 320px;

  .Admin {
    padding-top: 70px;
    padding-left: 125px;
    width: 464px;
    height: 49px;
    text-align: left;
    font: normal normal medium 48px/58px Montserrat;
    letter-spacing: 0px;
    color: #0d054b;
    font-size: 48px;
  }
  .EmpInfo {
    padding-top: 20px;
    padding-left: 125px;
    text-align: left;
    letter-spacing: 0px;
    font-weight: 500;
    font-size: 28px;
    color: #404040;
  }
`;
export const TableContainer = styled.div`
  margin-top: 50px;
  margin-left: 20px;

  text-align: center;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  .addEmployeeForm {
    width: 40%;
  }
  .addEmpHead {
    color: #0d054b;
    padding: 20px;
  }
  #confirm {
  }
  .FormInputs {
    margin: 10px 0;
  }
`;
export const FormWrapper = styled.div`
  width: 85%;
  margin: 10px 0px;
  height: 100vh;
  margin: 0 auto;

  .form-head {
    padding: 55px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }

  .form-head h2 {
    font-family: montserrat;
    text-transform: uppercase;
    padding-top: 30px;
    font-weight: 700;
  }
`;

export const FormMain = styled.div`
  width: 700px;
  span {
    font-size: 18px;
  }
  .formsInp {
    width: 400px;
  }
  .form-label {
    font-size: 15px;

    padding-left: 20px;
  }

  .info-type {
    font-size: 20px;
    border-bottom: 1px solid #11154C;
    color: #11154C;
    text-transform: uppercase;
    width: 100%;
    margin: 40px 0px;
  }

  .form-control {
  }

  .sbmt-btn {
    height: 26px;
    color: white;
    font-size: 18px;
    background: ;
    border-radius: 5px;
  }
  .radio {
    display: flex;
    justify-content: space-evenly;
    width: innherit;
    font-size: 15px;
  }
`;
