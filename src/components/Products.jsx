import { styled } from "styled-components";
// import { popularProducts } from "../data";
import { ProductItem } from "./ProductItem";
import { useEffect, useState } from "react";
import axios from "axios";


const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Products = ({ cat, filters, sort }) => {
  // console.log(cat, filters, sort);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/product/getall?category=${cat}`
            : `http://localhost:5000/product/getall`
        );
        console.log(res);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => (
            <ProductItem item={item} key={item.id} />
          ))
        : products
            .slice(0, 8)
            .map((item) => <ProductItem item={item} key={item.id} />)}
    </Container>
  );
};

// useEffect(() => {
//   cat &&
//     setFilteredProducts(
//       products.filter((item) =>
//         Object.entries(filters).every(
//           ([key, value]) => item[key].includes[value]
//         )
//       )
//     );
// }, [products, cat, filters]);
// The code  is using the filter method to filter an array of products based on a set of filter criteria defined in the filters object. Let me break it down for you:

// products is an array of items, and you want to filter this array based on certain conditions.

// filter is a higher-order array method that creates a new array containing all elements that pass a specific test provided as a callback function. In your case, the callback function is defined as follows:

// javascript
// Copy code
// (item) => Object.entries(filters).every(([key, value]) => item[key].includes(value))
// Object.entries(filters) converts the filters object into an array of key-value pairs. For example, if filters looks like this:

// javascript
// Copy code
// const filters = {
//   category: 'Electronics',
//   price: '$100'
// };
// Object.entries(filters) will produce the following array:

// javascript
// Copy code
// [
//   ['category', 'Electronics'],
//   ['price', '$100']
// ]
// .every() is called on this array of key-value pairs. It tests whether all elements in the array satisfy a condition specified by the callback function provided to it.

// The callback function inside .every() iterates over each key-value pair ([key, value]) and checks if item[key] (the property in the item object corresponding to the key) includes value. This means it's checking if the property in the item object matches the filter value for each key.

// For example, if item looks like this:

// javascript
// Copy code
// {
//   name: 'Laptop',
//   category: 'Electronics',
//   price: '$800'
// }
// The condition item[key].includes(value) will check if 'Electronics' includes 'Electronics' for the 'category' key and if '$800' includes '$100' for the 'price' key.

// If all key-value pairs in filters pass this condition for a specific item (product), it will be included in the filtered array.

// So, in summary, this code filters the products array and keeps only the items that match all the filter criteria specified in the filters object. It's a flexible way to filter an array of objects based on multiple criteria defined in an object.
