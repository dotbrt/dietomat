import type { NextPage } from 'next'
import SystemOutput from './system_output'
import { useEffect, useState } from 'react'
import { useUser, useSession } from '@supabase/auth-helpers-react'
import UserInput from './components/user_input';
import LoginPage from './components/loginPage';
import { useRouter } from 'next/router'
import { supabaseClient } from '../utils/SupabaseClient'

const Home: NextPage = () => {
    interface FormData {
        gender: string;
        age: number;
        weight: number;
        height: number;
        goal: string;
        activity: string;
    }
    const user = useUser()
    const session = useSession()
    const [age, setAge] = useState(0);
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [userPrompt, setUserPrompt] = useState<string>("")
    const [response, setResponse] = useState<string[]>([""])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loading, setLoading] = useState(true);
    const [systemPrompt, setSystemPrompt] = useState<string>("")
    const [formData, setFormData] = useState({
        gender: '',
        age: 0,
        weight: 0,
        height: 0,
        goal: '',
        activity: '',
    });

    const getStream = async (message: string) => {
        setIsLoading(true)
        const res = await fetch('/api/chat', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
            }),
        })
        // console.log('Edge function returned.')

        // console.log(response)

        if (!res.ok) {
            throw new Error(res.statusText)
        }
        const data = res.body
        if (!data) {
            return
        }
        const reader = data.getReader()
        const decoder = new TextDecoder()
        let done = false
        // setResponse((prev) => [...prev, user_input])
        let currentResponse: string[] = []
        while (!done) {
            const { value, done: doneReading } = await reader.read()
            done = doneReading
            const chunkValue = decoder.decode(value)
            // currentResponse = [...currentResponse, message, chunkValue];
            currentResponse = [...currentResponse, chunkValue]
            setResponse((prev) => [...prev.slice(0, -1), currentResponse.join('')])
        }
        // breaks text indent on refresh due to streaming
        // localStorage.setItem('response', JSON.stringify(currentResponse));
        setIsLoading(false)
        // if (done == true) {
        //     console.log('response state: ', response)

        //     // console.log('localstorage: ', localStorage.getItem('response'))
        //     // console.log(isLoading)
        //     // console.log("RES: ", res)
        //     // console.log("curr: ", currResponse)

        // }
    }

    const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event.target.value)
        setFormData({ ...formData, [event.target.name]: event.target.value });
        switch (event.target.name) {
            case 'weight':
                setWeight(event.target.value)
            case 'height':
                setHeight(event.target.value)
            case 'age':
                setAge(event.target.value)
        }
    };

    const formatPrompt = (formOutput: FormData) => {
        const { gender, age, weight, height, goal, activity } = formData;
        return `Jestem ${gender}, mam ${age} lat, ważę ${weight} kg i mam ${height} cm wzrostu. Zalezy mi na ${goal}. Moja aktywność fizyczna to ${activity}.`;
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        // console.log(formatPrompt(formData))
        getStream(formatPrompt(formData))
    };

    const handleSave = async () => {
        setIsLoading(true)
        console.log(formatPrompt(formData))
        console.log(response)
        const { data, error } = await supabaseClient
            .from('prompts')
            .insert([
                {
                    user_id: user.id,
                    user_prompt: formatPrompt(formData),
                    gpt_answer: response[0],
                }
            ])
        if (error) {
            console.log(error)
        }
        setIsLoading(false)
    }


    return (
        <>
            {!user ? (
                <LoginPage />
            ) : (
                <div>
                    <div className='flex h-screen w-screen flex-col sm:flex-row'>
                        <div className='md:w-1/3 p-8'>
                            <UserInput onSubmit={handleSubmit} handleChange={handleChange} isLoading={isLoading} />
                        </div>
                        <div className='md:w-2/3 p-8 gap-3'>
                            {/* <div>
                                {response[0] && <button onClick={handleSave} className='btn btn-outline btn-primary'>Zapisz dietę 💾</button>}
                            </div>
                            {response ? <SystemOutput props={response} /> : <p></p>} */}
                            <div>
                                {response[0] &&
                                    <div className='flex flex-row-reverse'>
                                        <div className='md:w-3/12'>
                                            <button onClick={handleSave} disabled={isLoading} className='btn btn-outline btn-primary btn-sm'>
                                                Zapisz dietę 💾
                                            </button>
                                        </div>
                                        <div className='md:w-9/12'>
                                            <SystemOutput props={response} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default Home


