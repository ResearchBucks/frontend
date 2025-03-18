import {surveySignup} from '@/assests/assests';
import Image from 'next/image';

export default function surveyCard(){
    return(
        <div className="rounded-md shadow-lg bg-red-100 p-2 flex flex-col justify-center items-center text-center">
            <Image
                   src={surveySignup}
                   alt="homeRespondent"
                   width={100}
                   height={100}
                   className=" "
            />
            <h3>sign Up</h3>
            <p>Join in seconds and start making an impact with your 
                opinions!</p>
        </div>
    );

}