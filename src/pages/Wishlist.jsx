import styled from "styled-components";
import { Announcements } from "../components/Announcements";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";
import { AddShoppingCart } from "@mui/icons-material";
import { DeleteForever } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
`;

const Header = styled.header`
  color: black;
  font-size: 14px;
  margin: 0px 20px;
  margin-top: 30px;
`;

const Container = styled.div`
  max-width: 1000px;
  padding: 20px;
  margin-top: 60px;
`;

const WishlistItem = styled.div`
  background-color: #fff;

  margin: 20px 0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  padding: 12px 50px;
  margin-right: 40px;
  border-radius: 5px;
`;

const ProductTitle = styled.h2`
  font-size: 19px;
  margin: 0;
  color: #333;
  font-family: Arial, sans-serif;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #777;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding: 12px 50px;
  color: #333;
`;

const RemoveButton = styled(DeleteForever)`
  color: #ff4d4d;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 30px;
  transition: color 0.3s ease;

  &:hover {
    color: orangered;
  }
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
`;

const AddToCartButton = styled(AddShoppingCart)`
  color: #339933;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 30px;
  transition: color 0.3s ease;

  &:hover {
    color: #339933;
  }
`;

const ImgContainer = styled.div``;

export const Wishlist = () => {
  const wishlistedItems = useSelector((state) => state.user.wishlist);
  console.log(wishlistedItems);
  return (
    <>
      <Announcements />

      <Wrapper>
        <Header>
          <h1>My Wishlist</h1>
        </Header>
        <Container>
          <WishlistItem>
            <ProductImage src="product1.jpg" alt="Product 1" />
            <ProductDetails>
              <ProductTitle>Product Name 1</ProductTitle>
              <ProductDescription>
                Product description goes here.
              </ProductDescription>
            </ProductDetails>
            <ProductPrice>$49.99</ProductPrice>
            <Buttons>
              <AddToCartButton>Add to Cart</AddToCartButton>
              <RemoveButton>Remove</RemoveButton>
            </Buttons>
          </WishlistItem>
          <WishlistItem>
            <ProductImage src="product2.jpg" alt="Product 2" />
            <ProductDetails>
              <ProductTitle>Product Name 2</ProductTitle>
              <ProductDescription>
                Product description goes here.
              </ProductDescription>
            </ProductDetails>
            <ProductPrice>$29.99</ProductPrice>
            <Buttons>
              <AddToCartButton>Add to Cart</AddToCartButton>
              <RemoveButton>Remove</RemoveButton>
            </Buttons>
          </WishlistItem>
        </Container>
        <ImgContainer>
          <img
            style={{ width: 550, height: 650 }}
            alt=""
            src="https://media.istockphoto.com/id/1152659685/vector/people-shopping-cartoon.jpg?s=612x612&w=0&k=20&c=UObXu1EvFG_CDDh8nbVRHJBCZirul5v7zkTpwYyMQ2I="
          />
        </ImgContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </>
  );
};
