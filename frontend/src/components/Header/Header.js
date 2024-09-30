import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Header.css';

function Header() {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <header className='header'>
      <div className='header__logo'>
        <h1 className='logo__text'>Fithub</h1>
      </div>
      <div className='header__auth'>
        <button className='header__login' onClick={handleLoginClick}>
          INICIA SESIÓN
        </button>
      </div>
    </header>
  );
}

export default Header;
