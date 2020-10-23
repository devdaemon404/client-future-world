import styled from 'styled-components';
export const ProfContainer = styled.div`
  display: flex;
  width: 100vw;
`;
export const LeftCol = styled.div`
  width: 25%;
  // height: 100vh;
  // background: gray;
`;
export const RightCol = styled.div`
  width: 75%;
  // height: 100vh;
  // background: #3f46cc17;
  padding: 20px;
`;
export const DisplayPic = styled.div`
  width: 80%;
  height: 500px;
  padding: 80px;
  overflow: hidden;
`;
export const SidebarDetails = styled.div`
  width: 100%;
  padding: 20px;

  .join-and-end {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0px 20px;
  }
  img {
    font-size: 24px;
  }
  .sidebar-item {
    padding: 0px 10px;
  }
`;
export const NameSection = styled.div`
  padding: 10px;
  margin-top: 120px;
  h2 {
    font-weight: 700;
    font-size: 48px;
  }
  h3 {
    font-size: 25px;
    margin-left: 40px;
  }
  #Address {
    width: 40%;
    word-wrap: break-word;
    // background: blue;
  }

  .Head {
    height: 250px;
    width: 100%;
  }
`;
export const NavSection = styled.div`
  border-bottom: 3px solid rgba(0, 00, 0, 0.1);
  span {
    padding: 10px 50px;
    margin-left: 40px;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
  }
`;
export const BodySection = styled.div`
  width: 100%;
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
    border-bottom: 2px solid #3f46cc;
    color: #3f46cc;
    font-family: montserrat;
    text-transform: uppercase;
    width: 100%;
    margin: 40px 0px;
  }

  .form-control {
  }
`;
