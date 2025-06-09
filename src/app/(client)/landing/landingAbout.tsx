import { aboutus } from "@/assests/assests";
import Image from "next/image";

export default function LandingAboutPage() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Container */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-main bg-main/30 rounded-full">
                About Our Mission
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Revolutionizing Research with{" "}
                <span className="text-main">Simplicity</span> and{" "}
                <span className="text-main">Rewards</span>
              </h1>
              <div className="w-20 h-1 bg-main rounded-full"></div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                ResearchBucks makes data collection easy, efficient, and rewarding. We empower
                researchers to create customizable surveys, reach target audiences, and gather
                high-quality data.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Participants earn meaningful rewards for their feedback, creating a win-win
                ecosystem for research. With multilingual support and powerful analytical tools,
                we're simplifying the research process for everyone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-main">500+</h3>
                <p className="text-sm text-gray-500">Active Researchers</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-main">10K+</h3>
                <p className="text-sm text-gray-500">Survey Participants</p>
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-square w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={aboutus}
                alt="ResearchBucks team collaborating"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-100 rounded-xl z-[-1]"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-200 rounded-xl z-[-1]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}