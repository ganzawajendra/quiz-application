import React from 'react'
import { Link } from 'react-router-dom'

export const AvailableQuiz = ({ quizTitle, quizQuestions, quizProgress, quizDifficulty }) => {
  return (
    <div className='bg-[var(--bg-secondary)] border border-[var(--border)] rounded-md mt-5 p-5 flex items-center gap-5 justify-between'>
        <div className='w-3/4'>
            <h4 className='text-xl font-semibold'>{quizTitle}</h4>
            <p className='text-[var(--text-muted)] tracking-wider'>{quizQuestions} | {quizDifficulty}</p>
        </div>
        <div className='flex flex-col items-end w-1/4'>
            <p className='text-[var(--text-primary)] font-semibold'>{quizProgress}</p>
            <p className='text-[var(--text-muted)] tracking-wider'>Progress</p>
        </div>
    </div>
  )
}

export const QuizCard = ({type, category, totalQuestion, difficulty, to = "/"}) => {
  return(
    <div className='border border-[var(--border)] p-5 rounded-md flex justify-between mt-5'>
      <div>
        <p className='font-semibold uppercase text-xs tracking-wider text-[var(--text-muted)]'>{type}</p>
        <h2 className='text-2xl font-semibold'>{category}</h2>
        <p className='text-[var(--text-muted)]'>{totalQuestion} Question</p>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <div className='bg-green-200 px-4 py-1 rounded-full'>
          <p className='text-[var(--accent-green)] text-xs uppercase tracking-wider font-semibold'>{difficulty}</p>
        </div>
        <Link to={to} className='block text-center bg-[var(--accent-dark)] text-white py-2 px-10 rounded-md hover:bg-[var(--text-primary)] transition-all duration-300 ease-in-out hover:scale-99'>Start Quiz</Link>
      </div>
    </div>
  )
}