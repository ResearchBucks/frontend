import Image from "next/image";
import { homeRespondent } from "@/assests/assests";

export default function LandingRespondentPage() {
  return (
 <div className="relative md:grid md:grid-cols-2 sm:flex sm:flex-col-reverse gap-12 w-full max-w-screen-xl px-6 py-12 mx-auto items-center bg-white">

  {/* Background blobs */}
  <div className="hidden md:block absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 z-0"></div>
  <div className="hidden md:block absolute bottom-20 right-20 w-48 h-48 bg-purple-200 rounded-full blur-3xl opacity-30 z-0"></div>

  {/* Left: Image Section */}
  <div className="relative flex justify-center items-center z-10">
    <Image
      src={homeRespondent}
      alt="Respondent participating in survey"
      width={550}
      height={550}
      className="md:w-[450px] w-full h-auto object-contain rounded-md shadow-xl"
    />
  </div>

      {/* Right: Text Content Section */}
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold text-main mb-2">
            Earn Money Online
          </h1>
          <h2 className="text-xl font-semibold text-gray-800">
            As a Respondent...
          </h2>
        </div>

        <div className="flex flex-col gap-4 text-gray-700">
          <p className="italic tracking-wide text-base text-gray-600">
            Your Feedback Matters — And We Reward It!
          </p>

          <p className="text-sm leading-relaxed tracking-wide text-justify">
            Join <strong>ResearchBucks</strong> and get rewarded for your valuable insights.
            Participate in surveys that match your interests, and earn money for your time and
            opinions. Our secure platform gives you full control, flexibility, and privacy while
            helping shape meaningful decisions across industries.
          </p>

          <p className="text-sm italic text-gray-600 mt-2">
            Sign up and start earning today — your voice has value!
          </p>
        </div>
      </div>
</div>

  );
}
