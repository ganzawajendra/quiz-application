import React from 'react'

const AvailableQuiz = ({ quizTitle, quizQuestions, quizProgress, quizDifficulty }) => {
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

export default AvailableQuiz