import { Button } from '@/components/ui/button';

export default function LandingHomePage() {
  return (
     <>
      <section id="home" className="min-h-screen bg-[var(--main-light)] justify-center flex ">
          <div className="grid grid-cols-2 w-full max-w-screen-lg px-4">
            <div className="flex flex-col gap-3 justify-center text-[var(--main-text-light)]">
              <span className="text-5xl font-bold">Effortless Surveys, Rewarding Results</span>
              <p className="text-sm">Create, Share and Reward</p>
              <div className="flex flex-row py-4  gap-4">
                <Button variant="common" size="common" name="Login"/>
                <Button variant="common" size="common" name="Signup"/>
              </div>
            </div>

            {/* Second part can go here */}
            <div className="flex flex-col justify-center items-center text-center">
              {/* You can add any content here */}
              <span className="text-xl">Another Part</span>
            </div>
          </div>
      </section>
      
      <section id="respondents" className="py-20">
        <h2>Respondents Section</h2>
        {/* Content for Respondents section */}
      </section>
      
      <section id="researcher" className="py-20">
        <h2>Researcher Section</h2>
        {/* Content for Researcher section */}
      </section>
      
      <section id="aboutus" className="py-20">
        <h2>About Us Section</h2>
        {/* Content for About Us section */}
      </section>
    </>
  );
}