import LandingHomePage from './landingHome'
import LandingRespondentPage from "./landingRespondentPage";
import LandingSurveyPage from './landingSurvey';

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
    </>
      
  );
}