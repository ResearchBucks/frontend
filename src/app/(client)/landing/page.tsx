import LandingHomePage from './landingHome'
import LandingRespondentPage from "./landingRespondentPage";
import LandingSurveyPage from './landingSurvey';
import LandingResearcher from './landingResearcher';
import LandingAboutPage from './landingAbout';

export default function LandingPage() {
  return (
    <>
     <section id="/" className="min-h-screen bg-[var(--main-light)] justify-center px-16 max-w-screen flex">
        <LandingHomePage />
     </section>
     <section id="respondents" className="min-h-screen bg-[var(--main-text-light)] justify-center px-16 max-w-screen flex">
        <LandingRespondentPage />
     </section> 
     <section id="surveys" className="min-h-screen bg-[var(--background-light)] justify-center px-16 max-w-screen flex">
        <LandingSurveyPage />
     </section> 
     <section id="researcher" className="min-h-screen bg-[var(--main-text-light)] justify-center px-16 max-w-screen flex">
        <LandingResearcher />
     </section> 
     <section id="aboutus" className="min-h-screen bg-[var(--background-light)] justify-center px-16 max-w-screen flex">
        <LandingAboutPage />
     </section> 
    </>
      
  );
}