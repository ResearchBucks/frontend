import Image from "next/image";
import { homeRespondent } from "@/assests/assests";

export default function LandingRespondentPage() {
  return (
    <div className="md:grid md:grid-cols-2 sm:flex sm:flex-col-reverse sm:py-6 md:py-0 gap-8 w-full max-w-screen px-6">
      {/* Image Container */}
      <div className="flex flex-shrink-0 justify-center items-center relative "> 
        <Image
          src={homeRespondent}
          alt="homeRespondent"
          width={550}
          height={550}
          className="md:w-[500px] md:h-400px] "
        />
      </div>
      
      {/* Content Container */}
      <div className="flex flex-col gap-12 justify-center">
        <h1 className="text-4xl font-bold">Earn Money Online</h1>
        <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">As Respondent...</h2>
            <p className="text-sm italic tracking-wider">Your Feedback Matters, And We Reward It!</p>
            <p className="text-sm tracking-widest text-justify">Earn rewards by sharing your opinions on ResearchBucks! 
                Participate in surveys that interest you and get paid for your feedback. 
                Our secure platform offers flexibility and privacy, allowing you to choose 
                surveys based on your preferences. Help shape important decisions while 
                earning rewards for your time.</p>
            <h3 className=" text-sm italic tracking-wider text-gray-600">Sign Up and Start Earning Today!</h3>
        </div>
      </div>
    </div>
  );
}
