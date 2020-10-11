import styled from 'styled-components';

export const LoginContainer = styled.div`

display: flex;
  justify-content: center;
  align-items: center;
  


  .button{
    border: 1px solid black;
  }


`;

export const LoginHeader = styled.h1`
color: #111;
  // background-color: #2d3436;
  // background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
  font-family: 'Helvetica Neue', sans-serif;
  border-radius:5px;
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
top: 50%;
left: 50%;
-ms-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
border: 1px solid black;
padding: 40px;
border-radius:10px;
background:#f8f8ff;

.breadcrumb{
  background: #fff;
  padding:20px;
}

.form-input{
  padding: 5px;
}

.form-control{
  padding-right:70px;
  border: none;
  // border-bottom:1px solid black;
  background: rgba(0,0,0,0.9);
  color:#f8f8ff;
}

`;