import React from 'react'
import FormInput from '../../components/FormInput'
import AuthLayout from '../../layouts/AuthLayout'

const LoginPage = () => {
  return (
    <AuthLayout 
      headline='Welcome Back' 
      subHeadline='The persuit of refined knowledge continues' 
      variant='login'
    >
      {/* Form Login */}
        <form action="" className='mt-20 border border-[var(--border)] p-15 space-y-5 w-full rounded-lg bg-[var(--bg-secondary)]'>
          <FormInput type='email' placeholder='john.doe@example.com' label='Email Address' name='email' />
          <FormInput type='password' placeholder='••••••••' label='Password' name='password' />
          {/* Tombol login */}
          <button type='submit' className='cursor-pointer w-full bg-[var(--accent-dark)] text-white py-2 rounded-md hover:bg-[var(--text-primary)] transition-all duration-300 ease-in-out hover:scale-99'>Login</button>
        </form>
    </AuthLayout>
  )
}

export default LoginPage