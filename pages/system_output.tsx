'use client'
// import useSWR from 'swr'
// import { useRef, useState, useContext } from 'react'
// import { DataContext } from './context/data-context';
// import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function SystemOutput({ props }: any) {
    const response = props
    return (
        <>
            <div className='' id='reply'>
                {response.map((response, index) => (
                    <div key={index}>
                        <ReactMarkdown className="prose prose-slate">{response}</ReactMarkdown>
                    </div>
                ))}
            </div>
        </>
    )
}
