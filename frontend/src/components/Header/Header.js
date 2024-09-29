// frontend/src/components/Header.js
import React from 'react';
import './Header.css'; 

function Header() {
  return (
    <header className='header'>
      <div className='header__logo'>
        <h1 className='logo__text'>Fithub</h1> 
      </div>
      <div className='header__auth'>
        <button className='header__login'>INICIA SESIÓN</button>
      </div>
    </header>
  );
}

export default Header;
