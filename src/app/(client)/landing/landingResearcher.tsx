import Image from "next/image";
import { homeResearcher } from "@/assests/assests";

export default function LandingResearcher() {
  return (
    <div className="relative w-full bg-gradient-to-br from-white to-main/40 py-16 md:pt-24">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-[100px] opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100 rounded-full blur-[100px] opacity-30"></div>
      
      <div className="relative max-w-7xl pt-4 mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square w-full h-full min-h-[400px]">
              <Image
                src={homeResearcher}
                alt="Researcher analyzing survey data"
                fill
                className="object-contain rounded-lg shadow-2xl"
                quality={100}
              />
            </div>
          
          </div>

          {/* Text Content Section */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 text-sm font-medium text-main bg-blue-100 rounded-full">
                For Researchers
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-main/60">
                  Advanced Research
                </span>{" "}
                Made Simple
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                Powerful tools to collect quality data with precision
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-main/20 text-main">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">Targeted Audience:</span> Reach the right participants with our advanced tagging system and demographic filters.
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-main/20 text-main">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">Multilingual Support:</span> Conduct global research with surveys that automatically adapt to participants' languages.
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-main/20 text-main">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">Data Visualization:</span> Get instant insights with built-in analytics and customizable reporting tools.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button className="px-8 py-3 bg-gradient-to-r from-main to-main/30 text-black font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Start Your Research Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}