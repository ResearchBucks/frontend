import Image from "next/image";
import { homeRespondent } from "@/assests/assests";

export default function LandingRespondentPage() {
  return (
    <div className="grid grid-cols-2 w-full max-w-screen px-6">
      {/* Image Container */}
      <div className="flex justify-center items-center relative "> 
        <Image
          src={homeRespondent}
          alt="homeRespondent"
          width={550}
          height={550}
          className=" "
        />
      </div>
      
      {/* Content Container */}
      <div className="">

      </div>
    </div>
  );
}
