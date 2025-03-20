import SurveyCard from "@/components/landing/surveyCard";

export default function LandingSurveyPage() {
  return (
    <div className="flex flex-col justify-evenly md:px-6 max-w-screen items-center w-full">
      <h1 className="font-bold text-3xl text-center">Earn with paid surveys in 3 steps</h1>
      <div className="w-full flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg">
        <SurveyCard surveyCardName="signup" />
        <SurveyCard surveyCardName="answer" />
        <div className="flex justify-center sm:col-span-2 md:col-span-2 lg:col-span-1">
          <SurveyCard surveyCardName="getpaid" />
        </div>
      </div>
    </div>
  );
}