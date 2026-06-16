import React, { useEffect, useState } from 'react'
import FormInput from '../components/FormInput'
import { getUser } from '../services/userService'
import { supabase } from '../config/supabaseClient'
import { gooeyToast } from 'goey-toast'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(null)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    const loadUser = async () => {
      try {
        const {data : {session}} = await supabase.auth.getSession()
        if (session) {
          const response = await getUser(session.user.id)
          if (response){
            setUser(response)
            // console.log(response)
          }
        }
      } catch (error) {
        gooeyToast.error('Failed to load user data', {
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
        setIsError(error)
      }finally{
        setIsLoading(false)
      }
    }
    
    loadUser()
  },[])
  // console.log(user)

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        password: user.password || ''
      })
    }
  },[user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userUpdate = {
        data: {
          full_name : formData.full_name
        }
      }
      if(formData.password && formData.password.trim() !== ''){
        userUpdate.password = formData.password
      }

      const {error: authError} = await supabase.auth.updateUser(userUpdate)
      if(authError) {
        gooeyToast.error('Failed to update the data', {
          description: authError.message,
          fillColor: '#FCF8F8',
          borderColor: '#E0E0E0',
          borderWidth: 0.5,
          preset: 'smooth',
          showTimestamp: false,
          timing: {
            displayDuration: 3000,
          },
        })
        return
      }

      const {error: dbError} = await supabase.from('users').update({
        full_name: formData.full_name,
      }).eq('id', user.id)
      if(dbError) {
        gooeyToast.error('Failed to update the data to database', {
          description: dbError.message,
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
      gooeyToast.success('Successfully Updated', {
        fillColor: '#FCF8F8',
        borderColor: '#E0E0E0',
        borderWidth: 0.5,
        preset: 'smooth',
        showTimestamp: false,
        timing: {
          displayDuration: 3000,
        },
      })
      navigate('/')
    } catch (error) {
      gooeyToast.error('Failed to update the data', {
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

  const handleLogout = (e) => {
    e.preventDefault()
    try {
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      gooeyToast.error('Failed to logout', {
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
    }finally{
      navigate("/login")
    }
  }

  if (isLoading) return (
    <div className='w-full h-screen flex items-center justify-center bg-[var(--bg-primary)]'>
      <p className='text-[var(--text-primary)] tracking-wider animate-pulse'>
        Loading...
      </p>
    </div>
  )
  if (isError) return (
    <div className='w-full h-screen flex items-center justify-center bg-[var(--bg-primary)]'>
      <p className='text-[var(--text-primary)] tracking-wider animate-pulse'>
        Error: {isError}
      </p>
    </div>
  )

  return (
    <div className='pt-[140px] px-100 pb-20'>
        {/* Profile Header */}
      <div className='flex gap-10 items-center'>
        {/* <img src="" alt="" /> */}
        <div className='size-30 rounded-full bg-gray-300'></div>
        <div>
          <h1 className='text-4xl'>{user.full_name}</h1>
          <p className='text-[var(--text-muted)] text-lg'>{user.email}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className='p-5 border border-[var(--border)] rounded-md mt-[70px]'>
        <form onSubmit={handleSubmit} autoComplete='off'>
        <div className='flex justify-between items-center'>
            <h2 className='font-semibold'>Personal Information</h2>
            <button type="submit" className='bg-[var(--accent-dark)] text-white px-4 py-2 rounded-md text-sm tracking-wider cursor-pointer hover:bg-[var(--text-primary)] transition-all duration-200 hover:scale-99'>Save Changes</button>
        </div>
          <div className='grid grid-cols-2 gap-5 pt-5'>
              <FormInput type={"text"} name={'full_name'} label={"Full Name"} placeholder={"Full Name"} value={formData.full_name || ''} className={"col-span-2"} onChange={handleChange}/>
              <FormInput type={"text"} name={'email'} label={"Email Address"} placeholder={"Email Address"} value={formData.email || ''} className={"col-span-1"} onChange={handleChange} disabled={true}/>
              <FormInput type={"password"} name={'password'} label={"New Password (Opsional)"} placeholder={"Leave blank to keep current password"} value={formData.password || ''} className={"col-span-1"} onChange={handleChange}/>
          </div>
        </form>
      </div>

      {/* Logout Button */}
      <div className='w-full mt-[70px] flex justify-end'>
        <button onClick={handleLogout} className='bg-[var(--accent-red)] text-white px-4 py-2 rounded-md text-sm tracking-wider cursor-pointer hover:bg-red-800 transition-all duration-200 hover:scale-99'>Logout</button>
      </div>
    </div>
  )
}

export default ProfilePage