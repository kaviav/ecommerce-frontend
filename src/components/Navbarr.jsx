import { styled } from "styled-components";
import { Badge } from "@mui/material";
import {
  LogoutRounded,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { mobile } from "../Responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items:center
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
//NB
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
  ${mobile({ width: "50px" })}
`;
// Remove the outline when the input is focused
// Add any additional styles you want for the focused state

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Button = styled.button`
  font-size: 14px;
  border: none;
  padding: 8px 8px;

  cursor: pointer;
  margin-left: 25px;
  border-radius: 15%;
  background-color: white;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;

export const Navbarr = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(currentUser);
  // console.log(quantity)

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <Search
              style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>WhalePy</Logo>
        </Center>
        <Right>
          {!currentUser && (
            <>
              <Link to="/register">
                <Button>REGISTER</Button>
              </Link>
              <Link to="/login">
                <Button>SIGN IN</Button>
              </Link>
            </>
          )}
          {currentUser && (
            <Button onClick={handleClick}>
              <LogoutRounded />
            </Button>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};
