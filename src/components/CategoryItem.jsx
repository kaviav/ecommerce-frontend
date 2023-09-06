import { styled } from "styled-components";
import { mobile } from "../Responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  ${mobile({ height: "20vh" })}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
// object-fit: cover;

const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: white;
  margin-top: 250px;
  margin-bottom: 30px;
`;
const Button = styled.button`
  border: none;
  padding: 8px;
  background-color: white;
  font-weight: 600;
  color: grey;
  cursor: pointer;
`;

export const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
    </Container>
  );
};
