import React from 'react'

export default function CanvasComponent({ response }) {
    if (response) {
        return (
            <div className='flex justify-center flex-col items-center mt-2 font-mulish'>
                <h1 className='mb-5 text-lg'>{response.Summary}</h1>
                {/* <span className='mb-3 text-2xl'>👇</span> */}
                <div className="bg-gray-100 w-5/6 mx-auto ">
                    <div className="text-black min-h-fit p-5 ">
                        <div className="row-span-2 grid h-3/5 md:grid-cols-5 bg-white  shadow-lg">
                            <div className="row-span-2 border pl-4 pt-4 pb-4 ">
                                <p className='text-xl'>🤝</p>
                                <h3 className="font-semibold">Key Partners:</h3>
                                {response.KeyPartnrs}
                            </div>
                            <div className="row-span-1 border pl-4 pt-4 pb-4 ">
                                <p className='text-xl'>🏹</p>
                                <h3 className="font-semibold">Key activities:</h3>
                                {response.KeyActs}
                            </div>
                            <div className="row-span-2 border pl-4 pt-4 pb-4 ">
                                <p className='text-xl'>🏅</p>
                                <h3 className="font-semibold">Value propositions:</h3>
                                {response.ValueProp}
                            </div>
                            <div className="border pl-4 pt-4 pb-4">
                                <p className='text-xl'>👋</p>
                                <h3 className="font-semibold">Customer relationships:</h3>
                                {response.CustRel}
                            </div>
                            <div className="row-span-2 border pl-4 pt-4 pb-4 ">
                                <p className='text-xl'>👱</p>
                                <h3 className="font-semibold">Customer segments:</h3>
                                {response.CustSeg}
                            </div>
                            <div className="border pl-4 pt-4 pb-4 ">
                                <p className='text-xl'>📦</p>
                                <h3 className="font-semibold">Key resources: </h3>
                                {response.KeyRes}
                            </div>
                            <div className="border pl-4 pt-4 pb-4 ">
                                <p className='text-xl'>📫</p>
                                <h3 className="font-semibold">Channels</h3>
                                {response.Channels}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 bg-white  shadow-lg">
                            <div className="border pl-4 pt-4 pb-4 ">
                                <p className='text-xl'>💸</p>
                                <h3 className="font-semibold">Cost structure:</h3>
                                {response.CostStruct}
                            </div>
                            <div className="border pl-4 pt-4 pb-4 ">
                                <p className='text-xl'>💰</p>
                                <h3 className="font-semibold">
                                    Revenue streams:
                                </h3>
                                {response.RevStreams}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    } else {
        return (
            <div>
                <div>{JSON.stringify(response)}</div>
                <div>Canvas</div>
            </div>
        )
    }

}