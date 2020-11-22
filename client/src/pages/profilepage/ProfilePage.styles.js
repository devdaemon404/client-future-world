import styled from 'styled-components';

export const ProfContainer = styled.div`
  display: flex;
  width: 70vw;
`;
export const LeftCol = styled.div`
  width: 23%;
  @media only screen and (max-width: 1500px) {
    width: 35%;
  }
`;
export const RightCol = styled.div`
  width: 77%;
  // height: 100vh;
  // background: #3f46cc17;
  padding: 20px;
  @media only screen and (max-width: 1500px) {
    width: 65%;
    padding: 5px;
  }
`;
export const DisplayPic = styled.div`
  width: 80%;
  padding: 40px;
  .imageDp {
    width: 220px;
  }
  @media only screen and (max-width: 1500px) {
    .imageDp {
      width: 120px;
    }
  }
`;
export const SidebarDetails = styled.div`
  width: 100%;
  padding: 20px;

  .join-and-end {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0px 20px;
  }
  img {
    font-size: 20px;
  }
  .sidebar-item {
    padding: 0px 10px;
  }
  @media only screen and (max-width: 1500px) {
    font-size: 12px;
  }
`;
export const NameSection = styled.div`
  padding: 10px;
  margin-top: 0px;
  h2 {
    font-weight: 600;
    font-size: 12px;
  }
  .head-button{
    font-size: 12px;
    
  }
  h3 {
    font-size: 12px;
    font-weight: 500;
  }
  #Address {
    width: 40%;
    font-size:18px
    word-wrap: break-word;
    // background: blue;
  }

  .Head {
    width: 100%;
  }
  @media only screen and (max-width: 1500px) {
    .Head {
    h2 {
      font-size: 18px;
      margin-right:50px;
    }
    h3 {
      font-size: 17px;
    }
    .head-button{
      font-size: 8px;
      
    }
    }
  }
`;
export const NavSection = styled.div`
  padding-bottom: 10px;
  span {
    padding: 0px 30px;
    margin-left: 30px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  @media only screen and (max-width: 1500px) {
    span {
      font-size: 12px;
      margin-left: 20px;
      padding: 10px 20px;
    }
  }
`;
export const BodySection = styled.div`
  width: 100%;
`;
export const FormMain = styled.div`
  .addreport {
    font-size: 12px;
  }
  span {
    font-size: 16px;
  }
  .formsInp {
    width: 400px;
  }
  .form-label {
    font-size: 14px;

    padding-left: 20px;
  }
  .info-type {
    font-size: 16px;
    border-bottom: 1px solid #11154c;
    color: #11154c;
    font-family: montserrat;
    text-transform: uppercase;
    width: 57%;
    margin: 40px 0px;
  }

  .form-control {
  }
  .selectBox {
    width: 280px;
  }
  .submit {
    font-weight: 600;
    font-size: 16px;
    margin: 10px 9%;
    background: #3f46cc;
    color: white;
  }
  @media only screen and (max-width: 1500px) {
    .submit {
      font-weight: 600;
      font-size: 9px;
      margin: 10px 9%;
      background: #3f46cc;
      color: white;
    }
    .formsInp {
      width: 300px;
      font-size: 9px;
      padding: 2px;
    }
    .info-type {
      font-size: 17px;
    }
    span {
      font-size: 10px;
    }
  }
`;
export const DocumentUpload = styled.div`
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.4);
`;
export const UploadContainer = styled.div`
  color: #11154c;
  .info-type {
    font-size: 16px;
    border-bottom: 1px solid #11154c;
    color: #11154c;
    font-family: montserrat;
    font-weight: 500;
    text-transform: uppercase;
    width: 50%;
    margin: 40px 0px;
  }
  .heading {
    border-bottom: 2px solid #3f46cc;
    color: #3f46cc;
    font-family: montserrat;
    text-transform: uppercase;
    width: 54%;
    margin: 30px 0px;
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
    font-size: 16px;
    height: 26px;
  }
  .select p {
    font-size: 16px;
  }
  #btn1,
  #btn2 {
    width: 500px;
    background: #3f46cc;
    color: white;
    border-radius: 5px;
    margin-top: 40px;
    text-align: center;
    padding: 2% 13%;
    cursor: pointer;
    font-weight: 700;
  }
  .realupload {
    border: none;
    background: white;
    outline: none;
    width: 0px;
    height: 0px;
  }

  .heading h4 {
    color: #3f46cc;
    font-family: montserrat;
    text-transform: uppercase;
  }

  .submit {
    width:200px;
    margin-top:10px;
    background: #3f46cc;
    color: white;
  }
  @media only screen and (max-width: 1500px) {
    .submit {
      width:150px;

      font-size: 9px;


    }}
  }
`;
