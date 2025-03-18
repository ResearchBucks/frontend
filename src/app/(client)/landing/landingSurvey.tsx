import SurveyCard from "@/components/landing/surveyCard";

export default function LandingSurveyPage() {
  return (
    <div className="flex flex-col px-6 max-w-screen justify-center items-center w-full">
      <div className="w-full grid grid-cols-3 gap-16 max-w-screen-lg">
          <SurveyCard surveyCardName="signup" />
          <SurveyCard surveyCardName="answer" />
          <SurveyCard surveyCardName="getpaid" />
      </div>
    </div>
  );
}
