import LandingPage from "@/app/landing/page";
import Navbar from "@/components/Navbar/Navbar";
import {Footer} from "@/components/Footer/Footer";

export default function Home() {
  return (
      <div className="color-black">
        <Navbar />
        <LandingPage />
        <Footer />
      </div>
  );
}
