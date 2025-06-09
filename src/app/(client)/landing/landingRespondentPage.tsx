import Image from "next/image";
import { homeRespondent } from "@/assests/assests";

export default function LandingRespondentPage() {
  return (
    <div className="relative w-full bg-gradient-to-br from-white to-main/10 py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
 
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content Section */}
          <div className="space-y-8 order-1">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 text-sm font-medium text-main bg-main/30 rounded-full">
                For Participants
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Get Paid for <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-main/50">Your Opinions</span>
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                Earn rewards while helping shape important research
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Flexible Earnings</h3>
                  <p className="text-gray-700">Complete surveys anytime, anywhere and get paid via multiple payment methods</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Privacy Protected</h3>
                  <p className="text-gray-700">Your data is always secure and anonymized - we respect your privacy</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Global Opportunities</h3>
                  <p className="text-gray-700">Participate in international research studies from the comfort of your home</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-6 py-3 bg-gradient-to-r from-main to-main/40 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Start Earning Now
              </button>
              {/* <button className="px-6 py-3 border border-main text-main font-medium rounded-lg hover:bg-indigo-50 transition-colors duration-300">
                How It Works
              </button> */}
            </div>
          </div>

          {/* Image Section */}
          <div className="relative order-2">
            <div className="relative aspect-square w-full h-full min-h-[400px]">
              <Image
                src={homeRespondent}
                alt="Happy respondent completing surveys and earning rewards"
                fill
                className="object-contain rounded-xl shadow-2xl"
                quality={100}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-100 rounded-xl z-[-1] hidden lg:block"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-100 rounded-xl z-[-1] hidden lg:block"></div>
            
            {/* Earnings badge */}
            <div className="absolute -bottom-4 right-8 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-800">earned daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}