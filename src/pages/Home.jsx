import React from "react";

import { Announcements } from "../components/Announcements";
import { Slider } from "../components/Slider";
import { Navbarr } from "../components/Navbarr";
import { Categories } from "../components/Categories";

export const Home = () => {
  return (
    <div>
      <Announcements />
      <Navbarr />
      <Slider />
      <Categories />
    </div>
  );
};
