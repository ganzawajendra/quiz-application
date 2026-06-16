import { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import FormInput from '../../components/FormInput'
import { supabase } from '../../config/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { gooeyToast } from 'goey-toast'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    const {data: authData, error: authError} = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName
        }
      }
    })

    if (authError) {
      gooeyToast.error('Registration failed', {
        description: authError.message,
        fillColor: '#FCF8F8',
        borderColor: '#E0E0E0',
        borderWidth: 2,
        showTimestamp: false,
      })
    } else {
      const user_id = authData.user.id;
      const {error: profileError} = await supabase.from('users').insert({
        id: user_id,
        email: formData.email,
        full_name: formData.fullName
      })

      if (profileError) {
        gooeyToast.error('Failed to save profile', {
          description: profileError.message,
        })
      }else{
        gooeyToast.success('Registration successful', {
          description: 'Please log in using your registered account',
          fillColor: '#FCF8F8',
          borderColor: '#E0E0E0',
          borderWidth: 2,
          showTimestamp: false,
        })

        setFormData({
          fullName: '',
          email: '',
          password: ''
        })
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    }
  }

  return (
      <AuthLayout 
      headline="Begin Your Journey" 
      subHeadline="Join a community of scholars pursuing excellence through clarity and refined focus" 
      variant='register'>
        <form onSubmit={handleRegister} className='mt-20 border border-[var(--border)] p-15 space-y-5 w-full rounded-lg bg-[var(--bg-secondary)]' autoComplete='off'>
            <FormInput type='text' placeholder='John Doe' label='Full Name' name='fullName' onChange={handleChange} required={true}/>
            <FormInput type='email' placeholder='john.doe@example.com' label='Email Address' name='email' onChange={handleChange} required={true}/>
            <FormInput type='password' placeholder='••••••••' label='Password' name='password' onChange={handleChange} required={true}/>
            {/* Tombol login */}
            <button type='submit' className='cursor-pointer w-full bg-[var(--accent-dark)] text-white py-2 rounded-md hover:bg-[var(--text-primary)] transition-all duration-300 ease-in-out hover:scale-99'>Register</button>
          </form>
      </AuthLayout>
  )
}

export default RegisterPage