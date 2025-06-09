import SurveyCard from "@/components/landing/surveyCard";

export default function LandingSurveyPage() {
  return (
   <div className="flex flex-col justify-evenly md:px-6 max-w-screen-xl items-center w-full ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Earn Money with Paid Surveys
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of users making extra income in just 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SurveyCard 
            surveyCardName="signup" 
           
          />
          <SurveyCard 
            surveyCardName="answer" 
           
          />
          <SurveyCard 
            surveyCardName="getpaid" 
           
          />
        </div>

      </div>
    </div>
  );
}