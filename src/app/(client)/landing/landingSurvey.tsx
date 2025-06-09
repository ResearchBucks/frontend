import SurveyCard from "@/components/landing/surveyCard";

export default function LandingSurveyPage() {
  return (
    <div className="flex flex-col justify-evenly md:px-6 max-w-screen-xl items-center w-full ">
      <h1 className="font-extrabold text-4xl md:text-5xl text-center mb-12 text-gray-900 drop-shadow-lg">
        Earn with Paid Surveys in 3 Simple Steps
      </h1>
      <div className="w-full flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-screen-lg">
        <SurveyCard surveyCardName="signup" />
        <SurveyCard surveyCardName="answer" />
        <SurveyCard surveyCardName="getpaid" />
      </div>
    </div>
  );
}
