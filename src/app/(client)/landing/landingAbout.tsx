import { aboutus } from "@/assests/assests";
import Image from "next/image";

export default function LandingAboutPage(){
    return(
        <div className="grid grid-cols-2 gap-8 w-full max-w-screen px-6">
            {/* Content Container */}
            <div className="flex flex-col gap-12 justify-center">
                <h1 className="text-4xl font-bold">About Us</h1>
                <div className="flex flex-col gap-3">
                    <p className="text-sm tracking-wider font-semibold">Revolutionizing Research with Simplicity and Rewards.</p>
                    <p className="text-sm tracking-widest text-justify">
                    ResearchBucks makes data collection easy, efficient, and rewarding. We empower researchers to 
                    create customizable surveys, reach target audiences, and gather high-quality data, while participants
                    earn rewards for their feedback. With multilingual support and powerful tools, we simplify the research 
                    process for everyone, saving time and money.</p>
                </div>
              </div>

            {/* Image Container */}
            <div className="flex justify-center items-center relative "> 
                <Image
                  src={aboutus}
                  alt="aboutus"
                  width={550}
                  height={550}
                  className=" "
                />
              </div>
            </div>     
    )
}