'use client'
import Link from 'next/link';
import Image from 'next/image';
// import demo from './public/demo.png';

const Page = () => {
    return (
        <div className='h-screen'>
            <div className='container flex flex-col items-center mx-auto'>
                <div className="flex flex-col min-w-96 h-full gap-5 items-center mt-24" >
                    <h1 className="text-3xl font-bold text-center font-outfit">FounderAI</h1>

                    <p className="text-center font-mulish">Generate Business Model Canvas based on an idea description</p><button
                        type="submit"
                        className="btn w-1/2 m-3 btn-primary font-mulish font-black"

                    >
                        Create Canvas
                    </button>
                </div>
            </div>
            <div className="mt-10 md:w-fit w-11/12 mockup-window border-0 bg-neutral mx-auto">
                <div className="flex justify-center bg-base-200">
                    {/* <Image alt="demo" src={demo} width={1000} /> */}
                </div>
            </div>
            <p className='text-xs'>0.3.0 by <Link className="link" href="https://twitter.com/bartcywinski" target={"_blank"}>@dotbrt</Link></p>
        </div>
    );


};

export default Page;