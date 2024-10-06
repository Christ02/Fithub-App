// src/pages/SignUp/SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/userApi'; // Importar la función de la API
import './SignUpPage.css'; // Opcional para estilos

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de contraseñas
    if (userData.password !== userData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      // Llamada a la API para crear un nuevo usuario
      await createUser(userData);
      alert('Usuario registrado exitosamente');
      navigate('/login'); // Redirigir a la página de login después del registro
    } catch (error) {
      console.error('Error registrando usuario:', error);
      alert('Error registrando usuario');
    }
  };

  return (
    <div className="signup-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default SignUpPage;
