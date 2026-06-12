import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { getQuizQuestion } from '../services/quizService';
import he from 'he';

const TestQuizPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [listUserAnsweres, setListUserAnsweres] = useState([])
  const [listQuestions, setListQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true)

  const categoryId = searchParams.get("category")
  const difficulty = searchParams.get("difficulty")
  const type = searchParams.get("type")

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  useEffect(() => {
    setIsLoading(true)
    const loadQuiz = async () => {
      if(!categoryId || !difficulty || ! type) return
      try {
        const response = await getQuizQuestion(categoryId, difficulty, type)
        if(response){
          const formattingQuestion = response.map((q) => {
            const combinedAnswer = [q.correct_answer, ...q.incorrect_answers]
            return{
              ...q,
              question: he.decode(q.question),
              correct_answer: he.decode(q.correct_answer),
              all_answer: shuffleArray(combinedAnswer.map((ans) => he.decode(ans)))
            }
          })
          setListQuestions(formattingQuestion)
        }
      } catch (error) {
        console.error("Gagal memuat data : ", error.message)
      }finally{
        setIsLoading(false)
      }
    }

    loadQuiz()
  }, [categoryId, difficulty, type]);

  const handleNextButton = () => {
    if(!selectedAnswer){
      alert("Silakan pilih jawaban terlebih dahulu")
      return
    }
    if (currentQuestionIndex < listQuestions.length - 1) {
      setListUserAnsweres((prev) => [...prev, selectedAnswer])
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setSelectedAnswer('')
    }else{
      const finalAnswerList = [...listUserAnsweres, selectedAnswer]
      alert("Kuis Selesai!")
      handleQuizResults(finalAnswerList)
      console.log(finalAnswerList)
    }
  }

  const handlePreviousButton = () => {
    if (currentQuestionIndex < listQuestions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
    }else{
      alert("Mentok")
    }
  }

  const handleQuizResults = (finalAnswerList) => {
    if(!finalAnswerList){
      return
    }
    let totalCorrectAnswer = 0
    let totalWrongAnswer = 0

    listQuestions.forEach((questionItem, index) => {
      const userAnswer = finalAnswerList[index]

      if(userAnswer == questionItem.correct_answer){
        totalCorrectAnswer += 1
      }else{
        totalWrongAnswer += 1
      }
    })

    const finalScore = (totalCorrectAnswer / listQuestions.length) * 100
    console.log(totalCorrectAnswer)
    console.log(totalWrongAnswer)
    console.log(finalScore)
  }

  const currentQuestion = listQuestions[currentQuestionIndex]
  // console.log(listQuestions[0]?.all_answer)

  if (isLoading) return (
    <div className='w-full h-screen flex items-center justify-center bg-[var(--bg-primary)]'>
      <p className='text-[var(--text-primary)] tracking-wider animate-pulse'>
        Loading...
      </p>
    </div>
  )

  return (
    <div className='pt-[140px] px-100 pb-20'>
      {/* Header */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <p className="text-sm tracking-wider text-[var(--text-primary)] uppercase">
            Question {currentQuestionIndex + 1} of 10
          </p>
          <div className="flex items-center gap-2 bg-[var(--bg-primary)] px-4 py-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[var(--accent-dark)]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="font-semibold text-lg text-[var(--accent-dark)]">00:00</span>
          </div>
        </div>
        <div className="w-full bg-[var(--bg-icon-light)] h-[6px] rounded-full overflow-hidden">
          <div className="bg-[var(--accent-gold)] h-full rounded-full" style={{ width: `${(currentQuestionIndex + 1) * 10}%` }}></div>
        </div>
      </div>
        {/* Question */}
        <div className='mt-[70px]'>
          <h1 className="font-medium text-5xl leading-tight">{currentQuestion?.question}</h1>
        </div>

            {/* Answer */}
            <div className='mt-[70px] flex flex-col gap-4'>
              {currentQuestion?.all_answer.map((answer, index) => {
                const alphabet = String.fromCharCode(65 + index)
                const isActive = selectedAnswer === answer

                return (
                  <div 
                    key={index}
                    onClick={() => setSelectedAnswer(answer)}
                    className={`flex items-center gap-5 rounded-lg p-5 cursor-pointer transition-all duration-200 ${
                      isActive 
                        ? 'border border-[var(--accent-dark)] ring-1 ring-[var(--accent-dark)] bg-[var(--bg-secondary)]' 
                        : 'border border-[var(--border)] bg-white hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <div className={`size-10 shrink-0 flex items-center justify-center rounded-md border ${
                      isActive 
                        ? 'bg-[var(--accent-dark)] border-[var(--accent-dark)] text-white' 
                        : 'bg-white border-[var(--border)] text-[var(--text-primary)]'
                    }`}>
                      <p className="font-medium">{alphabet}</p>
                    </div>
                    <p className="text-lg">{answer}</p>
                  </div>
                )
              })}
            </div>

      {/* Navigation */}
      <div className='mt-[140px] flex justify-between'>
        <button onClick={handlePreviousButton} className={`px-2 ${currentQuestionIndex === 0 ? 'hidden' : "bg-[var(--bg-primary)] px-20 py-3 rounded-md border border-[var(--border)] cursor-pointer transition-all duration-200 hover:scale-99"}`}>
          <span className="font-semibold text-md text-[var(--text-muted)]">Previous</span>
        </button>
        <button onClick={handleNextButton} className='bg-[var(--accent-dark)] px-20 py-2 rounded-md cursor-pointer hover:bg-[var(--text-primary)] transition-all duration-200 hover:scale-99'>
          <span className="font-semibold text-md text-[var(--bg-primary)]">{currentQuestionIndex === listQuestions.length - 1 ? "Finish" : "Next"}</span>
        </button>
      </div>
    </div>
  )
}

export default TestQuizPage