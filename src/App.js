import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { ProductItem } from "./pages/ProductItem";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Success } from "./pages/Success";
import Cancel from "./pages/Cancel";
import { useSelector } from "react-redux";
import { Orders } from "./pages/Orders";

export const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:cate" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductItem />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/success" element={<Success />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      {/* //user ? <Navigate to="/" /> */}
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
    </Routes>
  );
};

//npm i react-stripe-checkout
