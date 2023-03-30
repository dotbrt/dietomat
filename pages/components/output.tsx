import React from 'react'
import ReactMarkdown from 'react-markdown'

export const Output = () => {

    return (

        <>
            <div className="flex flex-col items-center justify-center h-screen w-1/2">
                {/* <div className="p-4 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-lg">{data ? JSON.stringify(data) : 'No data to display.'}</div> */}
                <ReactMarkdown># Hello, *world*!</ReactMarkdown>
            </div>

        </>
    );
};