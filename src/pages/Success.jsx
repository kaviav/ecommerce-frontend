import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Success = () => {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const id = currentUser.id;

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get(
        `http://localhost:5000/order/userorders/${id}`
      );
      setOrders(res.data);
    };
    getOrders();
  }, [id]);

  console.log(orders);

  return <div>success</div>;
};
