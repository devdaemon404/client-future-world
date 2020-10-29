import styled from 'styled-components';
export const ProfContainer = styled.div`
  display: flex;
  width: 100vw;
`;
export const LeftCol = styled.div`
  width: 23%;
`;
export const RightCol = styled.div`
  width: 60%;
  // height: 100vh;
  // background: #3f46cc17;
  padding: 20px;
`;
export const DisplayPic = styled.div`
  width: 80%;
  height: 450px;
  padding: 40px;
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
    // margin-left: 40px;
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
  @media only screen and (max-width: 1500px) {
    h2 {
      font-size: 36px;
    }
    h3 {
      font-size: 22px;
    }
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
  @media only screen and (max-width: 1500px) {
    span {
      font-size: 20px;
      margin-left: 20px;
      padding: 10px 20px;
    }
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
    width: 52%;
    margin: 40px 0px;
  }

  .form-control {
  }
  .selectBox {
    width: 280px;
  }
`;
export const DocumentUpload = styled.div`
  overflow: hidden;
  width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.4);
`;
export const UploadContainer = styled.div`
  padding: 30px;
  color: #3f46cc;
  .heading {
    width: 600px;
    font-weight: 700;
    color: #3f46cc;
  }
  .form-group {
    margin: 20px 0;
  }
  .select {
    margin: 30px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 500px;
  }
  .select input {
    width: 250px;
    font-size: 20px;
    height: 26px;
  }
  .select p {
    font-size: 20px;
  }
  #btn1,
  #btn2 {
    width: 500px;
    background: #3f46cc;
    color: white;
    border-radius: 5px;
    margin-top: 40px;
    text-align: center;
    padding: 10px 0px;
    cursor: pointer;
  }
  .realupload {
    border: none;
    background: white;
    outline: none;
    width: 0px;
    height: 0px;
  }

  .heading h4 {
    border-bottom: 2px solid #3f46cc;
    color: #3f46cc;
    font-family: montserrat;
    text-transform: uppercase;
    width: 100%;
    margin: 40px 0px;
  }
`;
