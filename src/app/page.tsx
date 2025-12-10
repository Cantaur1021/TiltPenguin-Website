"use client";
import type { NextPage } from "next";
import HeroSection from "../components/Hero/HeroSection";
import AboutSection from "../components/About/AboutSection";
import UpcomingProjectsSection from "../components/UpcomingProjects/UpcomingProjectsSection";
import AccentSection from "../components/AboutMe/AboutMe";
import BlogSection from "../components/Blog/BlogSection";
import GamesThatRaisedMe from "../components/Inspirations/Inspirations";
import FooterParallax from "../components/Footer/FooterBar";

const Home: NextPage = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <UpcomingProjectsSection />
      <AccentSection />
      <BlogSection />
      <GamesThatRaisedMe />
      <FooterParallax />
    </main>
  );
};

export default Home;
