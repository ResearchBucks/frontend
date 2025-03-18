import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { homeSectionImgOne, homeSectionImgTwo } from '@/assests/assests';

export default function LandingHomePage() {
  return (
    <>
        <div className="grid grid-cols-2 w-full max-w-screen px-6">
          {/* Left Column */}
          <div className="flex flex-col gap-3 justify-center text-[var(--main-text-light)]">
            <span className="text-5xl font-bold">Effortless Surveys,</span>
            <span className="text-5xl font-bold">Rewarding Results</span>
            <p className="text-sm">Create, Share and Reward</p>
            <div className="flex flex-row py-4 gap-4">
              <Button variant="common" size="common" name="Login" />
              <Button variant="common" size="common" name="Signup" />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex justify-center ">
            <div className='flex  items-center justify-center w-full relative '>
            <div className="absolute right-0 top-6">
              {/* Background Image (homeSectionImgOne) */}
              <Image
                src={homeSectionImgOne}
                alt="homeSectionImgOne"
                width={250}
                height={250}
                className=""
              />
            </div>

            {/* Foreground Image (homeSectionImgTwo) */}
            <div className=" absolute left-4 z-10">
              <Image
                src={homeSectionImgTwo}
                alt="homeSectionImgTwo"
                width={450}
                height={450}
                className="object-cover"
              />
            </div>
          </div>    
        </div>
      </div>
    </>
  );
}
