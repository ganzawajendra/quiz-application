// import React from 'react'
import { Link } from 'react-router-dom'
import {AvailableQuiz} from '../components/QuizCard'
import { useEffect, useState } from 'react'
import { supabase } from '../config/supabaseClient'
import { getXpUser } from '../services/userService'

const HomePage = () => {
  const [xpUser, setXpUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    const loadXpUser = async () => {
      try {
        const {data: {session}} = await supabase.auth.getSession()
        // console.log(session.user.id)
        if(session){
          const userData = await getXpUser(session.user.id)
          if(userData){
            setXpUser(userData.xp)
            // console.log(userData)
          }
        }
      } catch (error) {
        console.log("Gagal memuat XP: " + error.message)
        setIsError(error)
      }finally{
        setIsLoading(false)
      }
    }

    loadXpUser()
  }, [])

  // console.log(xpUser)
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
    <div className='pt-[140px] h-screen w-full px-40'>
      <h1 className='text-5xl text-[var(--text-primary)] leading-tight'>Welcom Back, Student!</h1>
      <p className='text-[var(--text-muted)] w-1/2'>Your intellectual journey continues. Challenge yourself with new quizzes and sharpen your mind.</p>
      
      {/* Start Quiz */}
      <div className='bg-[var(--bg-secondary)] border border-[var(--border)] rounded-md mt-[140px] flex'>
        <div id="left-content" className='w-1/2 flex flex-col gap-7 p-10'>
          <p className='text-xs uppercase font-semibold tracking-wider text-[var(--text-muted)]'>start for Quiz</p>
          <h2 className='text-4xl w-3/4 leading-tight'>Advance Cognitive Architectures</h2>
          <p className='text-md text-[var(--text-muted)]'>Master the principles of neural processing and information hierarchy in modern learning system.</p>
          <Link to="/test-quiz" className='block w-40 text-center bg-[var(--accent-dark)] text-white text-sm py-2 rounded-md hover:bg-[var(--text-primary)] transition-all duration-300 ease-in-out hover:scale-99'>Start Quiz</Link>
        </div>
        <div id="right-content" className='w-1/2 relative'>
          <img src="/image.jpeg" alt="image" className='absolute inset-0 w-full h-full object-cover rounded-tr-md rounded-br-md'/>
          <div className='absolute inset-0 bg-gradient-to-r from-[var(--bg-secondary)] via-transparent to-transparent rounded-tr-md rounded-br-md'></div>
        </div>
      </div>

      <div className='mt-[140px] flex gap-5 pb-20'>
        {/* Available Quiz */}
        <div id="left-content" className='w-3/5'>
          <h3 className='text-2xl'>Available Quiz</h3>
          <div>

            {/* Card */}
            <AvailableQuiz 
              quizTitle="Epistemological Frameworks"
              quizQuestions="8 Question"
              quizDifficulty="Intermediate"
              quizProgress="65%"
            />
            <AvailableQuiz 
              quizTitle="Classical Rhetoric"
              quizQuestions="12 Question"
              quizDifficulty="Advanced"
              quizProgress="12%"
            />
            <AvailableQuiz 
              quizTitle="Modern Design Theory"
              quizQuestions="10 Question"
              quizDifficulty="Beginner"
              quizProgress="0%"
            />

          </div>
        </div>

        {/* Your Performance */}
        <div id="right-content" className='w-2/5'>
          <h3 className='text-2xl'>Your Performance</h3>
          <div className='bg-[var(--bg-secondary)] border border-[var(--border)] rounded-md mt-5 p-5 flex flex-col items-center'>
            <h4 className='text-4xl font-semibold text-[var(--text-primary)]'>{xpUser}</h4>
            <div className='bg-[var(--accent-gold)] rounded-full px-5'>
              <p className='font-semibold text-[var(--bg-secondary)]'>Total Score (XP)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage