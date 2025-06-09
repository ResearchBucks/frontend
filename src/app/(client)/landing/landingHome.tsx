import { Button } from "@/components/ui/button";
import Image from "next/image";
import { homeSectionImgOne, homeSectionImgTwo } from "@/assests/assests";

export default function LandingHomePage() {
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full max-w-screen px-6 py-12 ">
      {/* Left Column */}
      <div className="flex flex-col gap-6 justify-center text-gray-800">
        <div>
          <h1 className="text-5xl font-bold leading-tight text-mainlight">Effortless Surveys,</h1>
          <h1 className="text-5xl font-bold leading-tight text-black">Rewarding Results</h1>
        </div>

        <p className="text-base text-white/70 max-w-lg">
          Welcome to <strong>ResearchBucks</strong> – your all-in-one platform to create, share,
          and reward surveys. Whether you're a researcher or a respondent, our platform makes survey
          participation meaningful and rewarding.
        </p>

        {/* Trust Badges or Highlights */}
        <div className="flex flex-wrap gap-3 mt-2">
          <span className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full">100+ Active Researchers</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 text-xs rounded-full">Secure & Reliable</span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 text-xs rounded-full">Real-Time Insights</span>
        </div>

        {/* CTA Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-3">
          <div className="bg-mainlight text-white p-3 rounded-full">
            📊
          </div>
          <span className="text-sm font-semibold">Create Surveys in Minutes</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-mainlight text-white p-3 rounded-full">
            💸
          </div>
          <span className="text-sm font-semibold">Reward with Real Incentives</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-mainlight text-white p-3 rounded-full">
            📈
          </div>
          <span className="text-sm font-semibold">Get Real-Time Insights</span>
        </div>
      </div>

      </div>

      {/* Right Column */}
      <div className="flex flex-col items-center justify-center relative">
        <div className="grid grid-cols-2 h-[70vh] relative w-5/6">
          {/* Decorative Background Shape */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 z-0"></div>

          <div className="absolute right-0 z-10">
            <Image
              src={homeSectionImgOne}
              alt="Survey Interface Example"
              width={250}
              height={250}
              className="md:w-[200px] lg:w-[280px] rounded-sm shadow-lg"
            />
          </div>
          <div className="absolute bottom-0 z-10">
            <Image
              src={homeSectionImgTwo}
              alt="Happy Respondent"
              width={450}
              height={450}
              className="object-cover md:w-[300px] lg:w-[450px] rounded-sm shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
