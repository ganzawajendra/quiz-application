import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { getQuizQuestion } from '../services/quizService';
import he from 'he';
import { finalTime, formatTimer, shuffleArray } from '../utils/quizHelper';

const TestQuizPage = () => {
  // Inisialisasi waktu pengerjaan
  const INITIAL_TIME = 300
  // React hook
  const timerRef = useRef(null)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [listUserAnsweres, setListUserAnsweres] = useState([])
  const [listQuestions, setListQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true)
  const [timer, setTimer] = useState(INITIAL_TIME)
  const [isQuizFinished,setIsQuizFinished] = useState(false)
  const navigate = useNavigate()


  // Mengambil query parameter
  const categoryId = searchParams.get("category")
  const difficulty = searchParams.get("difficulty")
  const type = searchParams.get("type")

  // Security kalau query parameter kosong
  if(!categoryId || !difficulty || !type){
    // Kembalikan pada menu /quizzes
    return <Navigate to="/quizzes" replace />;
  }
  
  useEffect(() => {
    // seting loading (true)
    setIsLoading(true)
    // Fungsi untuk menerima API Quiz
    const loadQuiz = async () => {
      try {
        // Menaruh respon API ke variabel
        const response = await getQuizQuestion(categoryId, difficulty, type)
        if(response){
          // Format pertanyaan dengan library "he" (decode)
          const formattingQuestion = response.map((q) => {
            // Menggabungkan jawaban benar dan salah
            const combinedAnswer = [q.correct_answer, ...q.incorrect_answers]
            return{
              ...q,
              question: he.decode(q.question),
              correct_answer: he.decode(q.correct_answer),
              all_answers: shuffleArray(combinedAnswer.map((ans) => he.decode(ans)))
            }
          })
          // Memasukkan format pertanyaan ke state list pertanyaan
          setListQuestions(formattingQuestion)
        }
      } catch (error) {
        // Tampilkan pesan error
        console.error("Gagal memuat data : ", error.message)
      }finally{
        // Seting loading (false)
        setIsLoading(false)
      }
    }

    // Jalankan fungsi menerima API Quiz
    loadQuiz()
  }, [categoryId, difficulty, type]);

  useEffect(() => {
    // Jika timer kurang dari sama dengan 0 atau kuis telah dikerjakan
    if(timer <= 0 || isQuizFinished ) return
    // Membersihkan interval lama
    if(timerRef.current) clearInterval(timerRef.current)

    // Membuat interval baru berjalan setiap 1 detik 
    timerRef.current = setInterval(() => {
      // Seting state timer
      setTimer((prevTimer) => {
        // Jika timer menyentuh kurang dari sama dengan 1
        if (prevTimer <= 1) {
          // Bersihkan interval
          clearInterval(timerRef.current)
          // Seting interval jadi null
          timerRef.current = null

          // setTimeout untuk menunggu proses dengan 10ms 
          setTimeout(() => {
            // Tampilkan pesan waktu habis
            alert("Waktu habis!")
            // Kirim data ke handleQuizResult
            handleQuizResults(listUserAnsweres, 0)
          }, 10);
          // Kunci state ke nilai 0
          return 0
        }
        // Kurangi timer dengan 1
        return prevTimer - 1
      })
    }, 1000)

    // Bersihkan interval
    return () => clearInterval(timerRef.current)
  }, [listUserAnsweres, listQuestions])

  // Fungsi untuk handle tombol next
  const handleNextButton = () => {
    // Jika user belum memilih jawaban
    if(!selectedAnswer){
      // Tampilkan pesan untuk segera mengisi jawaban
      alert("Silakan pilih jawaban terlebih dahulu")
      return
    }

    // Mengambil list jawaban user
    const updateAnswers = [...listUserAnsweres]
    // Meng-update jawaban sesuai dengan index sekarang
    updateAnswers[currentQuestionIndex] = selectedAnswer
    // Memasukkan update jawaban baru ke list jawaban user
    setListUserAnsweres(updateAnswers)

    // Jika index sekarang kurang dari panjang pertanyaan
    if (currentQuestionIndex < listQuestions.length - 1) {
      // Menyimpan index selanjutnya ke variabel
      const nextIndex = currentQuestionIndex + 1
      // Index selanjutnya dimasukkan ke state
      setCurrentQuestionIndex(nextIndex)

      // Memasukkan list jawaban baru ke state jawaban user
      setSelectedAnswer(updateAnswers[nextIndex] || '')
      // console.log(updateAnswers)
    }else{
      setIsQuizFinished(true)
      // Jika waktu masih ada
      if(timerRef.current){
        // Bersihkan interval
        clearInterval(timerRef.current)
        // Set interval menjadi null
        timerRef.current = null
      }
      // Tampilkan pesan quiz telah selesai
      alert("Kuis Selesai!")
      // Memasuukan list jawaban user ke fungsi untuk handle quiz
      handleQuizResults(updateAnswers, timer)
      }
  }

  // Fungsi untuk handle tombol prev
  const handlePreviousButton = () => {
    // Jika index sekarang lebih besar dari 0
    if (currentQuestionIndex > 0) {
      // Mengambil list jawaban user
      const updateAnswers = [...listUserAnsweres]
      // Menyimpan index sebelumnya ke variabel
      const prevIndex = currentQuestionIndex - 1

      // Meng-update jawaban sesuai dengan index sekarang
      updateAnswers[currentQuestionIndex] = selectedAnswer
      // Memasukkan update jawaban baru ke list jawaban user
      setListUserAnsweres(updateAnswers)

      // Index sebelumnya dimasukkan ke state
      setCurrentQuestionIndex(prevIndex)
      // Memasukkan list jawaban baru ke state jawaban user
      setSelectedAnswer(updateAnswers[prevIndex])
    }else{
      // Tampilkan pesan jika tidak dapat mundur lagi
      alert("Tidak bisa mundur lagi")
    }
  }

  // Fungsi untuk handle hasil dari quiz
  const handleQuizResults = (finalAnswerList, quizReminingTime) => {
    // Pindahkan parameter ke variabel supaya mudah dimanipulasi
    const finalAnswer = finalAnswerList || []

    // Mencatat waktu sisa pengerjaan quiz
    const quizRemining = quizReminingTime !== undefined ? quizReminingTime : timer

    // Inisialisasi total jawaban benar dan salah
    let totalCorrectAnswer = 0
    let totalWrongAnswer = 0
    let totalNotAnswer = 0
    // Inisalisasi list untuk menampung pertanyaan yang salah
    const wrongQuestionList = []

    // Lakukan perulangan (foreach) dari list quiz
    listQuestions.forEach((questionItem, index) => {
      // Menyimpan jawaban user sesuai dengan index
      const userAnswer = finalAnswer[index]

      // Jika tidak ada jawaban
      if(userAnswer === null || userAnswer === undefined || userAnswer === ''){
        // Variabel totalNotAnswer ditambah 1
        totalNotAnswer += 1
        // Dan jika jawaban sama dengan jawaban benar
      }else if(userAnswer === questionItem.correct_answer){
        // Variabel totalCorrectAnswer ditambah 1
        totalCorrectAnswer += 1
        // Selain itu
      }else{
        // Variabel totalWrongAnswer ditambah 1
        totalWrongAnswer += 1
        // Tambahkan jawaban salah ke list untuk menampung pertanyaan yang salah
        wrongQuestionList.push({
          ...questionItem,
          userAnswer,
          indexQuestion : index + 1
        })
      }
    })

    // Menghitung total final score (skala 10-100) lalu dimasukkan ke variabel
    const finalScore = listQuestions.length > 0 ? ((totalCorrectAnswer / listQuestions.length) * 100) : 0
    // console.log("Jawaban Benar: ", totalCorrectAnswer)
    // console.log("Jawaban Salah: ", totalWrongAnswer)
    // console.log("Tidak dijawab: ", totalNotAnswer)
    // console.log("Hasil akhir: ", finalScore)
    // console.log("Total waktu: ", finalTime(INITIAL_TIME, quizRemining))
    // console.log(wrongQuestionList)
    navigate("/test-quiz-complete", {
      state: {
        totalCorrectAnswer,
        totalWrongAnswer,
        wrongQuestionList,
        totalNotAnswer,
        finalScore,
        finalTime: finalTime(INITIAL_TIME, quizRemining) 
      }
    })
  }

  

  // Menampilkan pertanyaan sekarang (sesuai index) lalu dimasukkan ke variabel
  const currentQuestion = listQuestions[currentQuestionIndex]
  // console.log(timer)

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
            <span className="font-semibold text-lg text-[var(--accent-dark)]">{formatTimer(timer)}</span>
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
              {(currentQuestion?.all_answers || []).map((answer, index) => {
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