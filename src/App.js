import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { ProductItem } from "./pages/ProductItem";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const App = () => {
  // const user = true;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:cate" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductItem />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      {/* //user ? <Navigate to="/" /> */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

//npm i react-stripe-checkout
