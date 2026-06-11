import React from 'react'
import { QuizCard } from '../components/QuizCard'

const QuizzesPage = () => {
  return (
    <div className='pt-[140px] px-100 pb-20'>
        <h1 className='font-medium text-5xl leading-tight'>Master your craft.</h1>
        <p className='text-[var(--text-muted)] w-2/3'>Explore curated challeges designed to deepen your understanding and certification readiness.</p>

        {/* Category */}
        <div className='mt-[70px]'>
            <button className='text-xs uppercase tracking-wider font-semibold border border-[var(--border)] px-6 py-1 rounded-full cursor-pointer bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)]'>
                General Knowledge
            </button>
        </div>

        {/* Card Quiz */}
        <QuizCard type="Multiple" category="General Knowledge" totalQuestion="10" difficulty="Medium" to='/'/>
    </div>
  )
}

export default QuizzesPage