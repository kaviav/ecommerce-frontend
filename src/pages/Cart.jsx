import { styled } from "styled-components";
import { Announcements } from "../components/Announcements";
import { Footer } from "../components/Footer";
import { Navbarr } from "../components/Navbarr";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../Responsive";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE_KEY;

// console.log(process.env);

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 300;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  font-weight: 600;
  color: white;
`;

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { products, total } = cart;
  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser._id;

  //send mail to the whalepy accnt
  const sendMail = async () => {
    try {
      await userRequest.post("/mail/contact/" + id, {
        products: products,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //create a new order after payment
  const createOrder = async () => {
    const res = await userRequest.post("/order/add", {
      userId: id,
      products,
      amount: total,
    });
    if (res.ok) {
      sendMail();
    }
  };

  //make payment using stripe
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(KEY);

      const response = await fetch(
        "https://ecommerce-backend-0buv.onrender.com/checkout/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products: cart.products }),
        }
      );

      if (!response.ok) throw new Error("Payment request failed");
      if (response.ok) {
        createOrder();
      }
      const session = await response.json();

      const result = stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) throw new Error(result.error.message);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Container>
      <Navbarr />
      <Announcements />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <Link to="/orders">
              <TopText>Your Orders(2)</TopText>
            </Link>
            <Link to="/wishlist">
              <TopText>Go to wishlist(0)</TopText>
            </Link>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW! </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <>
                <Hr />
                <Product>
                  <ProductDetail>
                    <Image src={product.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>Product Id:</b>
                        {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b>
                        {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      {/* <Add /> */}
                      <ProductAmount>{product.quantity}</ProductAmount>
                      {/* <Remove /> */}
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total} </SummaryItemPrice>
            </SummaryItem>

            <Button type="button" onClick={makePayment}>
              CHECKOUT NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

// const makePayment = async () => {
//   try {
//     // Step 1: Load the Stripe.js library with your publishable key.
//     const stripe = await loadStripe(KEY);

//     // Step 2: Send a POST request to your server to create a payment session.
//     const response = await fetch("http://localhost:5000/checkout/payment", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ products: cart.products }),
//     });

//     // Step 3: Check if the payment request was successful (HTTP status 200).
//     if (!response.ok) throw new Error("Payment request failed");

//     // Step 4: Parse the response JSON to get the payment session ID.
//     const session = await response.json();

//     // Step 5: Redirect the user to the Stripe Checkout page.
//     const result = stripe.redirectToCheckout({ sessionId: session.id });

//     // Step 6: Check for any errors during the redirection process.
//     if (result.error) throw new Error(result.error.message);
//   } catch (error) {
//     // Step 7: Handle errors gracefully.
//     console.error("An error occurred:", error);
//   }
// };
