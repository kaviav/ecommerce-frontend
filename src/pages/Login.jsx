import { styled } from "styled-components";
import { mobile } from "../Responsive";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://fashionsuggest.in/wp-content/uploads/2018/07/how-to-style-stripes-compressed.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #f78ca2;
  ${mobile({ width: "75%" })}
`;
//bgcolor: white is good too

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #003380;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Anchor = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Register = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  text-decoration: underline;
  padding: 0;
`;

const Error = styled.span`
  color: red;
`;

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password }); // login function is called from api calls
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}

          <Anchor>DO NOT REMEMBER YOUR PASSWORD</Anchor>
          <Link to="/register">
            <Register>CREATE A NEW ACCOUNT</Register>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

// If isFetching is true, button will be disabled, meaning it cannot be clicked or interacted with. This is often used when you want to prevent users from taking actions while a background operation is in progress. For example, you might disable a "Submit" button while a form is being submitted to prevent multiple submissions.

// If isFetching is false or a falsy value, the button will be enabled, allowing users to click it and trigger the handleClick function.
