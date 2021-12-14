import Link from 'next/link';
import React from 'react';
import { useAuth } from "../context/AuthContext";


const Nav:React.FC = () => {
    
    const { user  } = useAuth();

    return (
        <header className="bg-slate-800 text-white">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <span className="ml-3 text-xl">Quick Poll</span>
                <nav className="md:ml-auto flex flex-wrap item-center text-base justify-center">
                    <span className='mr-5 hover:text-red-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mx-1 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <Link href="/">Home</Link>
                    </span>
                    {user===false && <span className='mr-5 hover:text-red-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mx-1 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <Link href="/login">Login</Link>
                    </span>}

                    {user===false && <span className='mr-5 hover:text-red-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mx-1 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <Link href="/">Register</Link>
                    </span>}

                    {user===true && <span className='mr-5 hover:text-red-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mx-1 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <Link href="/">Create Poll</Link>
                    </span>}

                    {user===true && <span className='mr-5 hover:text-red-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mx-1 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <Link href="/">Log Out</Link>
                    </span>}

                </nav>
            </div>
        </header>
    )
}

export default Nav;