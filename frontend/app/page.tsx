import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Uploader from "@/components/Uploader";
import Footer from "@/components/Footer";
import WhatIsDeepfake from "@/components/WhatIsDeepfake";
import Pipeline from "@/components/Pipeline";
import Architecture from "@/components/Architecture";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhatIsDeepfake/>
      <HowItWorks />
      <Architecture/>
      <Pipeline/>
      <Uploader />
      <Footer />
    </>
  );
}