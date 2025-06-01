import { Button } from "@/components/ui/button";
import Image from "next/image";
import { homeSectionImgOne, homeSectionImgTwo } from "@/assests/assests";

export default function LandingHomePage() {
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full max-w-screen px-6">
      {/* Left Column */}
      <div className="flex flex-col sm:gap-3 gap-4 justify-center text-[var(--main-text-light)]">
        <span className="text-5xl font-bold">Effortless Surveys,</span>
        <span className="text-5xl font-bold">Rewarding Results</span>
        <p className="text-sm">Create, Share and Reward</p>
        <div className="flex flex-row py-4 gap-4">
          <Button variant="common" size="common" name="Login" />
          <Button variant="common" size="common" name="Signup" />
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden md:flex justify-center ">
        <div className="flex  items-center justify-center w-full relative ">
          <div className="absolute right-0 top-6">
            {/* Background Image (homeSectionImgOne) */}
            <Image
              src={homeSectionImgOne}
              alt="homeSectionImgOne"
              width={250}
              height={250}
              className="md:w-[200px] lg:w-[250px]"
            />
          </div>

          {/* Foreground Image (homeSectionImgTwo) */}
          <div className=" absolute left-4 z-10">
            <Image
              src={homeSectionImgTwo}
              alt="homeSectionImgTwo"
              width={450}
              height={450}
              className="object-cover md:w-[300px] lg:w-[450px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
