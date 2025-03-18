import Container from "@/components/layout/container";
import LandingHomePage from './landingHome'
import LandingRespondentPage from "./landingRespondentPage";

export default function LandingPage() {
  return (
    <>
     <section id="/" className="min-h-screen bg-[var(--main-light)] justify-center px-16 max-w-screen flex">
        <LandingHomePage />
     </section>
     <section id="respondents" className="min-h-screen bg-[var(--main-text-light)] justify-center px-16 max-w-screen flex">
        <LandingRespondentPage />
     </section>
    </>
      
  );
}