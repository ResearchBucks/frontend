import Image from "next/image";
import {homeResearcher} from '@/assests/assests';

export default function LandingResearcher(){
    return(
        <div className="grid grid-cols-2 gap-8 w-full max-w-screen px-6">
              {/* Image Container */}
              <div className="flex justify-center items-center relative "> 
                <Image
                  src={homeResearcher}
                  alt="homeRespondent"
                  width={550}
                  height={550}
                  className=" "
                />
              </div>
              
              {/* Content Container */}
              <div className="flex flex-col gap-12 justify-center">
                <h1 className="text-4xl font-bold">As Researchers..</h1>
                <div className="flex flex-col gap-3">
                    <p className="text-sm italic tracking-wider">Empower Your Research with Control and Reach</p>
                    <p className="text-sm tracking-widest text-justify">
                    ResearchBucks gives researchers full control over survey creation and distribution. 
                    Target the right audience with our tagging system, engage participants worldwide with 
                    multilingual support, and boost responses through incentives. Our platform saves you time 
                    and money while delivering meaningful insights with built-in data visualization tools.</p>
                    <h3 className=" text-sm italic tracking-wider text-gray-600">Join Now and Take Control of Your Research!</h3>
                </div>
              </div>
            </div>
          );
}