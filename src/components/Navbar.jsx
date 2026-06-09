import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ variant }) => {
  // Tampilan sebelum login (Navbar) 
  if (variant === 'public') {
    return (
      <nav className='h-[64px] fixed flex items-center px-40 w-full z-50 border-b border-[var(--border)]'>
        <h1 className='text-xl font-semibold'>Quiz Application</h1>
      </nav>
    );
  }

  // Tampilan setelah login (Navbar)
  return (
    <nav>
        <h1>Quiz Application</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quizzes">Quiz</Link></li>
            <li><Link to="/stats">Stats</Link></li>
        </ul>
        <Link to="/profile">
            Profile
        </Link>
    </nav>
  );
}

export default Navbar