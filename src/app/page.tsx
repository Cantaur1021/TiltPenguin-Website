"use client";
import type { NextPage } from "next";
import HeroSection from "../components/Hero/HeroSection";
import AboutSection from "../components/About/AboutSection";
import UpcomingProjectsSection from "../components/UpcomingProjects/UpcomingProjectsSection";
import AccentSection from "../components/AboutMe/AboutMe";
import GamesThatRaisedMe from "../components/Inspirations/Inspirations";

const Home: NextPage = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <UpcomingProjectsSection />
      <AccentSection/>
      <GamesThatRaisedMe/>
    </main>
  );
};

export default Home;
