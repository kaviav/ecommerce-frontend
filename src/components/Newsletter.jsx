import { Send } from "@mui/icons-material";
import { styled } from "styled-components";
import { mobile } from "../Responsive";
import { useState } from "react";

const Container = styled.div`
  height: 60vh;
  background-color: #fff5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  background-color: white;
  width: 50%;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid lightgrey;
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
  &:focus {
    outline: none;
  }

  ${mobile({ width: "80%" })}
`;
// Remove the outline when the input is focused
// Add any additional styles you want for the focused state

const Button = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: teal;
  border: none;
  color: white;
`;

export const Newsletter = () => {
  const [send, setSend] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  // console.log(email);

  const handleSend = (e) => {
    e.preventDefault();
    setSend(true);
    setEmail("");
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your Email" value={email} onChange={handleChange} />
        <Button onClick={handleSend}>
          <Send />
        </Button>
      </InputContainer>
      {send && (
        <p
          style={{
            marginTop: 30,
            color: "blue",
            fontSize: 17,
            fontWeight: 500,
          }}
        >
          Thank you for connecting with WhalePy.
        </p>
      )}
    </Container>
  );
};
