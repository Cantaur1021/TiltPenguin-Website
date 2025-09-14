"use client";
import type { NextPage } from "next";
import HeroSection from "../components/Hero/HeroSection";
import AboutSection from "../components/About/AboutSection";
import UpcomingProjectsSection from "../components/UpcomingProjects/UpcomingProjectsSection";

const Home: NextPage = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <UpcomingProjectsSection />
    </main>
  );
};

export default Home;
