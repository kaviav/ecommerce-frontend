import {
  Favorite,
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 70%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;

  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

export const ProductItem = ({ item }) => {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;

  const [wishlisted, setWishListed] = useState(false);

  const handleWishlist = () => {
    setWishListed(!wishlisted);
    addRemoveWhishlist();
  };
  const addRemoveWhishlist = async () => {
    const res = await userRequest.post(`/product/wishlist/${userId}`, {
      item,
      wishlisted,
    });
    console.log(res.data);
  };
  console.log(wishlisted);

  return (
    <Container>
      <Circle />
      <Image src={item.image} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <Button onClick={handleWishlist}>
            {wishlisted ? (
              <Favorite style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </Button>
        </Icon>
      </Info>
    </Container>
  );
};
