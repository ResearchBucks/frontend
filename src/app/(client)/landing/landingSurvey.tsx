import SurveyCard from "@/components/landing/surveyCard";

export default function LandingSurveyPage() {
  return (
    <div className="relative flex flex-col px-6 max-w-screen justify-center items-center w-full">
        <h1 className="font-bold text-3xl absolute top-16 ">Earn with paid surveys in 3 steps</h1>
      <div className="w-full grid grid-cols-3 gap-16 max-w-screen-lg">
          <SurveyCard surveyCardName="signup" />
          <SurveyCard surveyCardName="answer" />
          <SurveyCard surveyCardName="getpaid" />
      </div>
    </div>
  );
}
