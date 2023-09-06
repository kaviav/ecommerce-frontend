

import { Announcements } from "../components/Announcements";
import { Slider } from "../components/Slider";
import { Navbarr } from "../components/Navbarr";
import { Categories } from "../components/Categories";

import { Products } from "../components/Products";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div>
      <Announcements />
      <Navbarr />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};
