import {surveySignup, homeAnswer, getPaid} from '@/assests/assests';
import Image from 'next/image';

interface SurveyCardProps {
    surveyCardName: "signup" | "answer" | "getpaid";
}

export default function SurveyCard({surveyCardName}:SurveyCardProps){
    let imgSrc, title, description;
    
    switch (surveyCardName){
        case "signup":
                imgSrc = surveySignup;
                title = "Sign Up";
                description ="Join in seconds and start making an impact with your opinions!";
                break;
        case "answer":
                imgSrc = homeAnswer;
                title = "Answer";
                description ="Complete surveys that match your interests and expertise.";
                break;
        case "getpaid":
                imgSrc = getPaid;
                title = "Get Paid";
                description ="Earn rewards for every survey you complete quick and easy!";
                break;
    };
    return(
        <div className="rounded-md lg:size-72 md:size-64 shadow-lg bg-[var(--main-text-light)] hover:bg-[var(--main-light)]/20 hover:-translate-y-4 transform transition-transform duration-300 ease-in-out cursor-pointer lg:p-12 p-4 max-h flex flex-col gap-4 justify-center items-center text-center">
            <Image
                src={imgSrc}
                alt= {title}
                width={100}
                height={100}
            />
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold text-xl'>{title}</h3>
                <p className='text-sm text-center tracking-wide'>{description}</p>
            </div>
        </div>
    );

}