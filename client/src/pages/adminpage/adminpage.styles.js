import styled from 'styled-components';

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

  .logoContainer {
    padding: 20px;
    width: 320px;
    height: 118px;
    display: flex;
    justify-content: center;

    background: white;
  }
  .SideBarCompMain span {
  }
  .SideBarCompMain {
    padding: 30px;
    width: 320px;
    height: 88px;
    color: white;
    text-align: center;
    font-size: 22px;
    font-weight: Bold;
    border-bottom: 2px solid white;
  }
  .SideBarCompItem {
    padding:5px 30px;
    margin:25px 0px;
    width: 320px;
    height: 40px;
    color: white;
    text-align: center;
    cursor: pointer;
  }

  .SideBarCompItem:hover{
    color:yellow;
  } 

  .Logout {
    position: absolute;
    width: 320px;
    text-align: center;
    color: white;
    bottom: 80px;
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

  margin-left: 320px;

  .Admin {
    padding-top: 120px;
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
    padding-top: 90px;
    padding-left: 125px;
    width: 400px;
    height: 58px;
    text-align: left;
    font: normal normal medium 48px/58px Montserrat;
    letter-spacing: 0px;
    color: #0d054b;
    font-size: 28px;
  }
`;
export const TableContainer = styled.div`
  margin-top: 100px;
  margin-left: 20px;
  text-align: center;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;

  .addEmployeeForm {
    width: 40%;
  }
  .addEmpHead {
    color: #0d054b;
    padding: 20px;
  }
  #confirm {
  }
`;
