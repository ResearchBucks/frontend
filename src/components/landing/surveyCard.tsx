import { surveySignup, homeAnswer, getPaid } from "@/assests/assests";
import Image from "next/image";

interface SurveyCardProps {
  surveyCardName: "signup" | "answer" | "getpaid";
}

export default function SurveyCard({ surveyCardName }: SurveyCardProps) {
  let imgSrc, title, description;

  switch (surveyCardName) {
    case "signup":
      imgSrc = surveySignup;
      title = "Sign Up";
      description = "Join in seconds and start making an impact with your opinions!";
      break;
    case "answer":
      imgSrc = homeAnswer;
      title = "Answer";
      description = "Complete surveys that match your interests and expertise.";
      break;
    case "getpaid":
      imgSrc = getPaid;
      title = "Get Paid";
      description = "Earn rewards for every survey you complete quick and easy!";
      break;
  }

  return (
    <div
      className="rounded-xl bg-gradient-to-tr from-main via-black to-main
        shadow-lg hover:shadow-2xl cursor-pointer p-8 max-w-xs mx-auto
        transform transition-transform duration-300 ease-in-out hover:-translate-y-3
        flex flex-col gap-6 justify-center items-center text-center text-white"
    >
      <div
        className="w-24 h-24 rounded-full bg-white bg-opacity-20
          flex items-center justify-center mb-4
          hover:bg-opacity-40 transition duration-300 ease-in-out"
      >
        <Image
          src={imgSrc}
          alt={title}
          width={64}
          height={64}
          className="filter drop-shadow-md hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h3 className="font-extrabold text-2xl drop-shadow-md">{title}</h3>
      <p className="text-sm leading-relaxed tracking-wide drop-shadow-md">{description}</p>
    </div>
  );
}
