import { Send } from "@mui/icons-material";
import { styled } from "styled-components";
import { mobile } from "../Responsive";

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
  ${mobile({ width: "80%" })}
`;

const Button = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: teal;
  border: none;
  color: white;
`;

export const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your Email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};
