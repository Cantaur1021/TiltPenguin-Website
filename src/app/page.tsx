"use client";
import type { NextPage } from "next";
import HeroSection from "../components/Hero/HeroSection";
import AboutSection from "../components/About/AboutSection";

const Home: NextPage = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
    </main>
  );
};

export default Home;
