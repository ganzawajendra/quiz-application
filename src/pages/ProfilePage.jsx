import React from 'react'
import FormInput from '../components/FormInput'

const ProfilePage = () => {
  return (
    <div className='pt-[140px] px-100 pb-20'>
        {/* Profile Header */}
      <div className='flex gap-10 items-center'>
        {/* <img src="" alt="" /> */}
        <div className='size-30 rounded-full bg-gray-300'></div>
        <div>
          <h1 className='text-4xl'>Your Full Name</h1>
          <p className='text-[var(--text-muted)] text-lg'>your.email@example.com</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className='p-5 border border-[var(--border)] rounded-md mt-[70px]'>
        <form action="">
        <div className='flex justify-between items-center'>
            <h2 className='font-semibold'>Personal Information</h2>
            <button type="submit" className='bg-[var(--accent-dark)] text-white px-4 py-2 rounded-md text-sm tracking-wider cursor-pointer hover:bg-[var(--text-primary)] transition-all duration-200 hover:scale-99'>Save Changes</button>
        </div>
        <div className='grid grid-cols-2 gap-5 pt-5'>
            <FormInput type={"text"} label={"Full Name"} placeholder={"Full Name"} value={"Your Name"} className={"col-span-2"}/>
            <FormInput type={"text"} label={"Email Address"} placeholder={"Email Address"} value={"your.email@example.com"} className={"col-span-1"}/>
            <FormInput type={"password"} label={"Password"} placeholder={"Password"} value={"Your Password"} className={"col-span-1"}/>
        </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage