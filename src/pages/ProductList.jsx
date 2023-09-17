import { styled } from "styled-components";
import { Announcements } from "../components/Announcements";
import { Navbarr } from "../components/Navbarr";
import { Products } from "../components/Products";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";
import { mobile } from "../Responsive";
import { useLocation } from "react-router-dom";

import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option`
  padding: 9px;
`;

export const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handlefilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  // console.log(filters);
  return (
    <Container>
      <Navbarr />
      <Announcements />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handlefilters}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            {/* remember to match lowercase and uppercase as same as in DB */}
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handlefilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};
