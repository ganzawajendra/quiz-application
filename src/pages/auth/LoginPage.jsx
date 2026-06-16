import { useState } from 'react'
import FormInput from '../../components/FormInput'
import AuthLayout from '../../layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabaseClient'
import { gooeyToast } from 'goey-toast'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {error} = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })
      if (error) {
        gooeyToast.error('Login failed', {
          description: error.message,
          fillColor: '#FCF8F8',
          borderColor: '#E0E0E0',
          borderWidth: 0.5,
          preset: 'smooth',
          showTimestamp: false,
          timing: {
            displayDuration: 3000,
          },
        })
      }
      gooeyToast.success('Login Successful', {
        fillColor: '#FCF8F8',
        borderColor: '#E0E0E0',
        borderWidth: 0.5,
        preset: 'smooth',
        showTimestamp: false,
        timing: {
          displayDuration: 3000,
        },
      })
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/')
    } catch (error) {
      gooeyToast.error('Login failed', {
        description: error.message,
        fillColor: '#FCF8F8',
        borderColor: '#E0E0E0',
        borderWidth: 0.5,
        preset: 'smooth',
        showTimestamp: false,
        timing: {
          displayDuration: 3000,
        },
      })
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  return (
    <AuthLayout 
      headline='Welcome Back' 
      subHeadline='The persuit of refined knowledge continues' 
      variant='login'
    >
      {/* Form Login */}
        <form onSubmit={handleSubmit} className='mt-20 border border-[var(--border)] p-15 space-y-5 w-full rounded-lg bg-[var(--bg-secondary)]' autoComplete='off'>
          <FormInput type='email' placeholder='john.doe@example.com' label='Email Address' name='email' onChange={handleChange} required={true} />
          <FormInput type='password' placeholder='••••••••' label='Password' name='password' onChange={handleChange} required={true} />
          {/* Tombol login */}
          <button type='submit' className='cursor-pointer w-full bg-[var(--accent-dark)] text-white py-2 rounded-md hover:bg-[var(--text-primary)] transition-all duration-300 ease-in-out hover:scale-99'>Login</button>
        </form>
    </AuthLayout>
  )
}

export default LoginPage