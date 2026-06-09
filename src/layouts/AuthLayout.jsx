import React from 'react'
import { Link } from 'react-router-dom'

const AuthLayout = ({ children, headline, subHeadline, variant = 'login' }) => {
    return (
        <div className='pt-[70px] h-screen w-full flex justify-center items-center'>
            <div className='w-1/3 bg-[var(--bg-primary)] flex flex-col justify-center items-center'>
                <h1 className='text-3xl text-[var(--text-primary)] font-semibold'>{headline}</h1>
                <p className='text-[var(--text-muted)] mt-2 text-center'>{subHeadline}</p>
                {children}

                {/* Redirect */}
                {variant === 'login' ? (
                    <p className='mt-5 text-[var(--text-muted)]'>Don't have an account? <Link to="/register" className='text-[var(--accent-dark)]'>Register</Link></p>
                ) : (
                    <p className='mt-5 text-[var(--text-muted)]'>Already have an account? <Link to="/login" className='text-[var(--accent-dark)]'>Login</Link></p>
                )}
            </div>
        </div>
    )
}

export default AuthLayout