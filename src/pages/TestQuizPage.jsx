import React, { useState } from 'react'

const TestQuizPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState('')

  const options = [
    { id: 'A', text: 'Calculated symmetry across all primary axes' },
    { id: 'B', text: 'Strategic placement of natural light apertures' },
    { id: 'C', text: 'The inclusion of contrasting tactile textures' },
    { id: 'D', text: 'Rigid adherence to monochromatic palettes' }
  ]

  return (
    <div className='pt-[140px] px-100 pb-20'>
      {/* Header */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <p className="text-sm tracking-wider text-[var(--text-primary)] uppercase">
            Question 1 of 10
          </p>
          <div className="flex items-center gap-2 bg-[var(--bg-primary)] px-4 py-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[var(--accent-dark)]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="font-semibold text-lg text-[var(--accent-dark)]">00:00</span>
          </div>
        </div>
        <div className="w-full bg-[var(--bg-icon-light)] h-[6px] rounded-full overflow-hidden">
          <div className="bg-[var(--accent-gold)] h-full w-[10%] rounded-full"></div>
        </div>
      </div>

      {/* Question */}
      <div className='mt-[70px]'>
        <h1 className="font-medium text-5xl leading-tight">In the context of minimalist architectural principles, which element is most critical for establishing "serenity through void"?</h1>
      </div>

      {/* Answer */}
      <div className='mt-[70px] flex flex-col gap-4'>
        {options.map((option) => {
          const isActive = selectedAnswer === option.id;
          return (
            <div 
              key={option.id}
              onClick={() => setSelectedAnswer(option.id)}
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
                <p className="font-medium">{option.id}</p>
              </div>
              <p className="text-lg">{option.text}</p>
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className='mt-[140px] flex justify-between'>
        <button className='bg-[var(--bg-primary)] px-20 py-3 rounded-md border border-[var(--border)] cursor-pointer transition-all duration-200 hover:scale-99'>
          <span className="font-semibold text-md text-[var(--text-muted)]">Previous</span>
        </button>
        <button className='bg-[var(--accent-dark)] px-20 py-2 rounded-md cursor-pointer hover:bg-[var(--text-primary)] transition-all duration-200 hover:scale-99'>
          <span className="font-semibold text-md text-[var(--bg-primary)]">Next</span>
        </button>
      </div>
    </div>
  )
}

export default TestQuizPage