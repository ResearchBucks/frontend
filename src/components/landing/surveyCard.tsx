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
                description ="oin in seconds and start making an impact with your opinions!";
                break;
        case "getpaid":
                imgSrc = getPaid;
                title = "Get Paid";
                description ="oin in seconds and start making an impact with your opinions!";
                break;
    };
    return(
        <div className="rounded-md shadow-lg bg-[var(--main-text-light)] p-12 max-h flex flex-col gap-4 justify-center items-center text-center">
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