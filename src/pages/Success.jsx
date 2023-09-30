import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 200vh;
  background-color: #e6f5ff;
  position: fixed;
  margin: 0;
  padding: 0;
`;

const Box = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;

  width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Header = styled.h3`
  color: #4caf50;
  font-family: ;
  font-size: 25px;
  font-weight: 400px;
`;

const Heading = styled.h3`
  color: orangered;
  font-family: ;
  font-size: 25px;
  font-weight: 700px;
  margin: 19px;
`;
const Title = styled.h2`
  margin: 17px;
`;
const Hr = styled.hr`
  margin: 15px;
`;
const List = styled.ul`
  list-style-type: none;
  margin: 17px;
  padding: 0;
`;
const ListItems = styled.li`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 5px;
`;

const Email = styled.span`
  font-style: italic;
  color: #4caf50;
`;
const Date = styled.span`
  color: blue;
  font-size: 15px;
  font-weight: 500;
`;
const StyledBtn = styled.button`
  width: 600px;
  padding: 10px;
  background-color: black;
  font-weight: 600;
  color: white;
  margin: 15px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;

const Button = styled.button`
  width: 200px;
  padding: 10px;
  background-color: #007bff;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Success = () => {
  const downloadLinkRef = useRef(null);
  const [dataURL, setDataURL] = useState(null);
  const [latestOrder, setLatestOrder] = useState({});

  const { _id, products, amount, createdAt, status } = latestOrder;

  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser._id;

  useEffect(() => {
    const getLatestOrder = async () => {
      const res = await userRequest.get("/order/latestorder/" + id);
      setLatestOrder(res.data);
    };

    getLatestOrder();
  }, [id]);
  // console.log(latestOrder);

  // download receipt
  const generateDataURL = () => {
    // Create a printable version of the page
    const printableContent = document.getElementById("printable-content"); // Assuming you have an element with this id
    const htmlContent = printableContent.outerHTML;

    // Create a Blob from the printable content
    const blob = new Blob([htmlContent], { type: "text/html" });

    // Generate the data URL
    return URL.createObjectURL(blob);
  };

  const setDownloadLink = () => {
    if (!dataURL) {
      const url = generateDataURL();
      setDataURL(url);
      downloadLinkRef.current.href = url;
    }
    downloadLinkRef.current.click();
  };
  return (
    <Container id="printable-content">
      <Box>
        <Header>Payment Successful</Header>

        <Heading>
          Thank you for your purchase. Your payment has been successfully
          processed.
        </Heading>
        <Hr />
        <Title>Your Orders: orderID {_id} </Title>
        <Title style={{ fontSize: 16, color: "violet" }}>
          Status: "{status}"
        </Title>
        <List>
          {products?.map((item, i) => (
            <ListItems key={i}>
              Order #{i + 1}: ProductId {item._id}
            </ListItems>
          ))}
        </List>
        <p style={{ marginBottom: 4, fontWeight: 400 }}>
          Total amount paid: ${amount}
        </p>
        <p>
          An email confirmation with order details has been sent to your
          <Email> Email.</Email>
        </p>
        <Hr />
        <p>
          Order will be shipped on
          <Date> {createdAt} </Date>,will be delivered by
          <Date> {createdAt}.</Date>
        </p>
        <Link to="/">
          <StyledBtn>Continue purchasing</StyledBtn>
        </Link>
        <Buttons>
          <Link to="/orders">
            <Button>View all Orders</Button>
          </Link>
          <a ref={downloadLinkRef} href={dataURL} download="page.html">
            <Button onClick={setDownloadLink}>Print Receipt</Button>
          </a>
        </Buttons>
      </Box>
    </Container>
  );
};
