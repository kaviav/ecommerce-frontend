import React from "react";
import { Navbar } from "../components/Navbar";
import { Announcements } from "../components/Announcements";
import { Slider } from "../components/Slider";

export const Home = () => {
  return (
    <div>
      <Announcements />
      <Navbar />
      <Slider />
    </div>
  );
};
