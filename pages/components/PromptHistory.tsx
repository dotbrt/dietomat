import React from 'react'
import ReactMarkdown from 'react-markdown'

interface PromptHistoryProps {
    props?: {
        id: number,
        created_at: string,
        user_prompt: string,
        gpt_answer: string
    }[]
}

const def = {
    props: [
        {
            id: 1,
            created_at: '2021-08-01T12:00:00.000Z',
            user_prompt: '## User Prompt',
            gpt_answer: '## GPT Answer'
        },
    ]
}
export default function PromptHistory({ props }: PromptHistoryProps = { props: def.props }) {
    return (
        <div className="overflow-x-auto">
            <table className="table-zebra table-auto">
                {/* head*/}
                <thead>
                    <tr className=''>
                        <th className='w-1/12'>ID</th>
                        <th className='w-2/12'>Created_at</th>
                        <th className='w-7/12'>User Prompt</th>
                        <th className='w-2/12'>GPT Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row */}
                    {props.map((prompt, index) => (
                        <tr key={index} className='h-20'>
                            <th> {index}</th>
                            <td>{new Date(prompt.created_at).toLocaleString()}</td>
                            <td>{prompt.user_prompt}</td>
                            <td>{/* The button to open modal */}
                                <label htmlFor={index.toString()} className="btn">open diet</label>

                                {/* Put this part before </body> tag */}
                                <input type="checkbox" id={index.toString()} className="modal-toggle" hidden />
                                <div className="modal">
                                    <div className="modal-box max-w-5xl flex flex-col gap-3 p-8">
                                        <h3 className="font-bold text-2xl">Twoja dieta:</h3>
                                        <ReactMarkdown className="prose prose-slate">{prompt.gpt_answer}</ReactMarkdown>
                                        <div className="modal-action">
                                            <label htmlFor={index.toString()} className="btn">Thanks!</label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                    }
                    {/* end row */}
                </tbody>
            </table >
        </div >
    )
}