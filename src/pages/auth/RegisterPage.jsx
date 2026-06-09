import React from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import FormInput from '../../components/FormInput'

const RegisterPage = () => {
  return (
    <AuthLayout 
    headline="Begin Your Journey" 
    subHeadline="Join a community of scholars pursuing excellence through clarity and refined focus" 
    variant='register'>
      <form action="" className='mt-20 border border-[var(--border)] p-15 space-y-5 w-full rounded-lg bg-[var(--bg-secondary)]'>
          <FormInput type='text' placeholder='John Doe' label='Full Name' name='fullName' />
          <FormInput type='email' placeholder='john.doe@example.com' label='Email Address' name='email' />
          <FormInput type='password' placeholder='••••••••' label='Password' name='password' />
          {/* Tombol login */}
          <button type='submit' className='cursor-pointer w-full bg-[var(--accent-dark)] text-white py-2 rounded-md hover:bg-[var(--text-primary)] transition-all duration-300 ease-in-out hover:scale-99'>Register</button>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage