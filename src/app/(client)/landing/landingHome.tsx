import { Button } from "@/components/ui/button";
import Image from "next/image";
import { homeSectionImgOne, homeSectionImgTwo } from "@/assests/assests";

export default function LandingHomePage() {
  return (
    <div className="relative w-full min-h-screen  py-16 md:py-24 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 order-1">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 text-sm font-medium text-main bg-mainlight rounded-full">
                Research Made Rewarding
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-main/5">
                  Effortless Surveys,
                </span><br />
                <span className="text-gray-800">Rewarding Results</span>
              </h1>
              <p className="text-lg text-gray-200/80 leading-relaxed max-w-lg">
                Welcome to <strong className="text-mainlight">ResearchBucks</strong> – your all-in-one platform to create, share,
                and reward surveys. Whether you're a researcher or respondent, we make survey participation
                meaningful and rewarding for everyone.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Active Researchers</span>
              </span>
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Secure & Reliable</span>
              </span>
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Real-Time Insights</span>
              </span>
            </div>

            {/* Feature Highlights */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-indigo-600 text-xl">📊</span>
                </div>
                <h3 className="font-semibold text-gray-800">Create in Minutes</h3>
                <p className="text-sm text-gray-600 mt-1">Intuitive survey builder with templates</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-purple-600 text-xl">💸</span>
                </div>
                <h3 className="font-semibold text-gray-800">Real Incentives</h3>
                <p className="text-sm text-gray-600 mt-1">Reward participants fairly</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-blue-600 text-xl">📈</span>
                </div>
                <h3 className="font-semibold text-gray-800">Instant Insights</h3>
                <p className="text-sm text-gray-600 mt-1">Powerful analytics dashboard</p>
              </div>
            </div> */}

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Get Started - It's Free
              </Button>
              <Button variant="outline" className="px-8 py-4 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors duration-300">
                See How It Works
              </Button>
            </div> */}
          </div>

          {/* Right Column - Images */}
          <div className="relative order-2">
            <div className="relative aspect-square w-full h-full min-h-[500px]">
              {/* Main Image */}
              <div className="absolute top-0 right-0 w-3/4 h-3/4">
                <Image
                  src={homeSectionImgOne}
                  alt="Survey Interface Example"
                  fill
                  className="object-contain rounded-xl shadow-2xl z-10"
                  quality={100}
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-xl z-0"></div>
              </div>
              
              {/* Secondary Image */}
              <div className="absolute bottom-0 left-0 w-2/3 h-2/3">
                <Image
                  src={homeSectionImgTwo}
                  alt="Happy Respondent"
                  fill
                  className="object-contain rounded-xl shadow-2xl z-10"
                  quality={100}
                />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-100 rounded-xl z-0"></div>
              </div>
              
              {/* Decorative Element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-[80px] opacity-30 z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}