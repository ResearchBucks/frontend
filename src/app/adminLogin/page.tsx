import { homeRespondent,logo } from "@/assests/assests"

export default function adminLogin(){
    return(
        <div className="bg-mainlight w-screen min-h-screen  items-center flex justify-center">
            <div className="bg-white grid grid-cols-2 p-4">
                <div className="flex flex-col w-32 ">
                    <img src={logo} className=""/>

                </div>
                <div className="">
                    <img src={homeRespondent} className="rounded-md"/>
                </div>
            </div>
        </div>
    )
}