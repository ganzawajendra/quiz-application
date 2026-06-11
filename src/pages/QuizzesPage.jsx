import React, { useEffect, useState } from 'react'
import { QuizCard } from '../components/QuizCard'
import { GENERAL_KNOWLEDGE_QUIZ, SPORTS_QUIZ } from '../datas/quizData'
import { QUIZ_CATEGORIES } from '../datas/quizCategory'

const QuizzesPage = () => {
    const [activeCategory, setActiveCategory] = useState("General Knowledge")
    const quizMapper = {
        [QUIZ_CATEGORIES[0]]: GENERAL_KNOWLEDGE_QUIZ,
        [QUIZ_CATEGORIES[1]]: SPORTS_QUIZ,
    }

    const currentActiveCard = quizMapper[activeCategory]

  return (
    <div className='pt-[140px] px-100 pb-20'>
        <h1 className='font-medium text-5xl leading-tight'>Master your craft.</h1>
        <p className='text-[var(--text-muted)] w-2/3'>Explore curated challeges designed to deepen your understanding and certification readiness.</p>

        {/* Category */}
        <div className='mt-[70px] flex gap-3'>
            {QUIZ_CATEGORIES.map((category, index) => {
                return(
                    <button key={index}
                    onClick={() => setActiveCategory(category)}
                    className={`text-xs uppercase tracking-wider px-6 py-1 rounded-full cursor-pointer font-semibold ${activeCategory == category ? "bg-[var(--accent-dark)] text-[var(--bg-primary)]": "border border-[var(--border)]  bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)]"} `} 
                    >
                        {category}
                    </button>
                )
            })}
        </div>

        {/* Card Quiz */}
        {currentActiveCard.map((config) => {
            return(
                <QuizCard key={config.id} type={config.type} category={config.categoryName} totalQuestion={config.totalQuestion} difficulty={config.difficulty} to='/'/>
            )
        })}
    </div>
  )
}

export default QuizzesPage