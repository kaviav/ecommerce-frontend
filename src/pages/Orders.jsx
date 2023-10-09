import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  background-color: #ddd0c8;
  display: flex;

  justify-content: center;
`;

const SubContainer = styled.div`
  width: 80%;
  padding: 50px 0px;
`;

const Box = styled.span`
  margin: auto;
  color: #323232;
  font-size: 35px;
  font-wight: 900;
  font-family: Arial, sans-serif;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
`;

const Row = styled.tr`
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #323232;
  padding: 10px 0;
`;

const Header = styled.th`
  flex: 1;
  text-align: left;
  font-weight: bold;
  padding-left: 30px;
`;

const Data = styled.td`
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 10px;

  .image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }

  .message {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 170px;
  padding: 10px;
  background-color: #323232;
  font-weight: 300;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 60px;
  margin-left: 150px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: brown;
  }
`;

export const Orders = () => {
  const [userOrders, setUserOrders] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // const { _id, products, amount, createdAt, status } = userOrders;

  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser._id;
  const URL = "/order/userorders/" + id;
  console.log(URL);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(URL);

        setUserOrders(res.data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching orders");
        setIsLoading(false);
      }
    };
    getOrders();
  }, [URL, id]);
  // console.log(userOrders);

  return (
    <Container>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        <p>{error}</p>
      ) : (
        <SubContainer>
          <Title>
            <Box>ORDER HISTORY</Box>
            <h3> UserID: {id}</h3>
          </Title>
          <Table>
            <Row>
              <Header>Image</Header>
              <Header>Name</Header>
              <Header>OrderID</Header>
              <Header>Status</Header>
              <Header>Price</Header>
              <Header>Mail</Header>
            </Row>
            {userOrders.map((orders, i) => (
              <Row key={i}>
                <Data>
                  <img className="image" src={currentUser.image} alt="" />
                </Data>
                <Data>{currentUser.username}</Data>
                <Data>{orders._id}</Data>
                <Data>{orders.status}</Data>
                <Data>{orders.amount}</Data>
                <Data>{currentUser.email}</Data>
              </Row>
            ))}
          </Table>
          <Link to="/products">
            <Button>More Products</Button>
          </Link>
        </SubContainer>
      )}
    </Container>
  );
};
