import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implementasi logika login (misalnya panggil API)
    // Untuk saat ini, kita set status login palsu di localStorage
    localStorage.setItem('isAuthenticated', 'true');
    
    // Arahkan ke halaman utama setelah "login"
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Halaman Login</h2>
      <p>Silakan login untuk mengakses aplikasi.</p>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Username" 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
