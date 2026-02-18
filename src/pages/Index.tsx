import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ShowreelSection from "@/components/ShowreelSection";
import ReelsSection from "@/components/ReelsSection";
import ToolsSection from "@/components/ToolsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import CompaniesSection from "@/components/CompaniesSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <>
      <CustomCursor />
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <HeroSection />
        <ShowreelSection />
        <ReelsSection />
        <ToolsSection />
        <ProjectsSection />
        <AboutSection />
        <CompaniesSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
