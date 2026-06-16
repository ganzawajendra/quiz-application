import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const TestQuizCompletePage = () => {
    const location = useLocation()

    const quizData = location.state.statistics
    const infoQuiz = location.state.infoQuiz

  return (
    <div className='pt-[140px] px-100 pb-20'>
      <h1 className='font-medium text-5xl leading-tight text-center'>Quiz Completed</h1>
      <p className='text-[var(--text-muted)] text-center w-2/3 mx-auto'>Excellent work. You've successfully completed the <span>Advence Architecture & Design</span> module assessment.</p>

      <div className='flex mt-[140px] gap-5'>
        <div className='w-2/5 flex flex-col gap-5 sticky top-[100px] h-fit'>
            {/* Accumulation Score */}
            <div className='bg-[var(--bg-secondary)] p-5 border border-[var(--border)] rounded-md flex flex-col items-center gap-2'>
                <h2 className='text-5xl'>{quizData.finalScore}<span className='text-2xl'>%</span></h2>
                <p className='uppercase text-xs text-[var(--text-muted)] tracking-wider font-semibold'>Total Score</p>
            </div>

            {/* Detail Result */}
            <div className='grid grid-cols-2 gap-3'>
                <div className='bg-[var(--bg-secondary)] p-2 border border-[var(--border)] rounded-md flex flex-col items-start'>
                    <p className='uppercase text-xs text-[var(--text-muted)] tracking-wider font-semibold'>Correct</p>
                    <h3 className='text-3xl text-[var(--accent-green)] font-semibold'>{quizData.totalCorrectAnswer}<span className='text-lg font-normal'>/10</span></h3>
                </div>
                <div className='bg-[var(--bg-secondary)] p-2 border border-[var(--border)] rounded-md flex flex-col items-start'>
                    <p className='uppercase text-xs text-[var(--text-muted)] tracking-wider font-semibold'>Wrong</p>
                    <h3 className='text-3xl text-[var(--accent-red)] font-semibold'>{quizData.totalWrongAnswer}<span className='text-lg font-normal'>/10</span></h3>
                </div>
                <div className='bg-[var(--bg-secondary)] p-2 border border-[var(--border)] rounded-md flex flex-col items-start'>
                    <p className='uppercase text-xs text-[var(--text-muted)] tracking-wider font-semibold'>Not Answered</p>
                    <h3 className='text-3xl text-[var(--accent-dark)] font-semibold'>{quizData.totalNotAnswer}<span className='text-lg font-normal'>/10</span></h3>
                </div>
                <div className='bg-[var(--bg-secondary)] p-2 border border-[var(--border)] rounded-md flex flex-col items-start'>
                    <p className='uppercase text-xs text-[var(--text-muted)] tracking-wider font-semibold'>Time</p>
                    <h3 className='text-3xl text-[var(--accent-dark)] font-semibold'>{quizData.finalTime}</h3>
                </div>
            </div>

            {/* Navigate */}
            <div className='flex flex-col gap-5'>
                <Link to='/' className='bg-[var(--accent-dark)] w-full py-2 rounded-md cursor-pointer hover:bg-[var(--text-primary)] transition-all duration-200 hover:scale-99 text-[var(--bg-primary)] text-center'>Back to Home</Link>
                <Link to={`/test-quiz?category=${infoQuiz.categoryId}&difficulty=${infoQuiz.difficulty}&type=${infoQuiz.type}`} className='bg-[var(--bg-primary)] w-full py-2 rounded-md border border-[var(--border)] cursor-pointer transition-all duration-200 hover:scale-99 text-center'>Retake Quiz</Link>
            </div>
        </div>
        <div className='w-3/5 border border-[var(--border)] p-5 rounded-md'>
            <div className='flex justify-between border-b border-[var(--border)] pb-2'>
                <h3 className='font-semibold'>Detail Breakdown</h3>
                <div className='flex gap-5'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center size-4 bg-[var(--accent-green)] rounded-full shrink-0'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className='text-xs text-[var(--accent-green)] tracking-wider uppercase'>Correct</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center size-4 bg-[var(--accent-red)] rounded-full shrink-0'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <p className='text-xs text-[var(--accent-red)] tracking-wider uppercase'>Wrong</p>
                    </div>
                </div>
            </div>

            {/* Wrong Question List */}
            <div>
                {quizData.wrongQuestionList.map((wrongQuestion, index) => {
                    return (
                        <div key={index} className='py-4 border-b border-[var(--border)]'>
                            <h4 className='text-[var(--text-primary)]'>{wrongQuestion.question}</h4>
                            <div className='flex items-center gap-2 mt-4'>
                                <div className='flex items-center justify-center size-4 bg-[var(--accent-red)] rounded-full shrink-0'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <p className='text-[var(--accent-red)] text-sm'>{wrongQuestion.userAnswer}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center justify-center size-4 bg-[var(--accent-green)] rounded-full shrink-0'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className='text-[var(--accent-green)] text-sm'>{wrongQuestion.correct_answer}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      </div>
    </div>
  )
}

export default TestQuizCompletePage