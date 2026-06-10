import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  
  const [activePath, setActivePath] = useState(location.pathname)

  useEffect(() => {
    setActivePath(location.pathname)
  }, [location.pathname])

  const isAuthenticated = localStorage.getItem('isAuthenticated')

  const getLinkClass = (path) => {
    const baseClass = "transition-all duration-300 ease-in-out hover:scale-99 hover:text-[var(--text-primary)]"
    const colorClass = activePath === path 
      ? "text-[var(--text-primary)] underline underline-offset-8 decoration-2 font-semibold" 
      : "text-[var(--text-muted)]"
    return `${baseClass} ${colorClass}`
  }

  if (!isAuthenticated) {
    // Tampilan navbar sebelum login
    return (
      <nav className='h-[64px] fixed flex items-center px-40 w-full z-50 border-b border-[var(--border)] bg-[var(--bg-secondary)]'>
        <h1 className='text-xl font-semibold'>Quiz Application</h1>
      </nav>
    )
  } else {
    // Tampilan navbar setelah login
    return (
      <nav className='h-[64px] fixed px-40 w-full z-50 border-b border-[var(--border)] bg-[var(--bg-secondary)] flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Quiz Application</h1>
          <ul className='flex gap-15 items-center'>
              <li>
                <Link to="/" onClick={() => setActivePath('/')} className={getLinkClass('/')}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/quizzes" onClick={() => setActivePath('/quizzes')} className={getLinkClass('/quizzes')}>
                  Quiz
                </Link>
              </li>
              <li>
                <Link to="/stats" onClick={() => setActivePath('/stats')} className={getLinkClass('/stats')}>
                  Stats
                </Link>
              </li>
          </ul>
          <Link to="/profile" onClick={() => setActivePath('/profile')} className={getLinkClass('/profile')}>
              Profile
          </Link>
      </nav>
    );
  }
}

export default Navbar