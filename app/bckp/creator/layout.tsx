import React from 'react'
import Navbar from './components/navbar';
export default function BuilderLayout({ children }) {

    return (
        <>
            <Navbar />
            {children}

        </>
    )
}
