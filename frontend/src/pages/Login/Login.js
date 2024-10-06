import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../../api/userApi'; // Importamos la función de la API para buscar el usuario
import './Login.css'; // Estilos ya definidos

const Login = () => {
  const [email, setEmail] = useState('');  // Estado para el email
  const [password, setPassword] = useState('');  // Estado para la contraseña
  const [errorMessage, setErrorMessage] = useState('');  // Estado para los mensajes de error
  const navigate = useNavigate();  // Para redirigir al dashboard

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validamos si los campos están vacíos
    if (!email || !password) {
      setErrorMessage('Por favor ingrese ambos campos.');
      return;
    }

    try {
      // Intentamos obtener el usuario por su email desde la API
      const user = await getUserByEmail(email);
      
      // Verificamos si el usuario existe
      if (!user) {
        setErrorMessage('Usuario no encontrado');
        return;
      }

      // Verificamos si la contraseña ingresada coincide con la almacenada
      if (user.password !== password) {
        setErrorMessage('Contraseña incorrecta');
        return;
      }

      // Si el login es exitoso, mostramos un mensaje y redirigimos al dashboard
      alert(`Bienvenido ${user.name}`);
      navigate('/dashboard');  // Redirigir al dashboard si el login es exitoso
    } catch (error) {
      console.error('Error en el login:', error);
      setErrorMessage('Error en el inicio de sesión');
    }
  };

  return (
    <div className='login-container'>
      <h2>Iniciar Sesión</h2>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}  {/* Mostrar mensajes de error si existen */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Ingresa tu email'
            aria-label='Email'
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Contraseña</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Ingresa tu contraseña'
            aria-label='Contraseña'
            required
          />
        </div>
        <button type='submit'>Ingresar</button>
      </form>
      <p className='signup-redirect'>
        ¿No tienes una cuenta? <a href='/signup'>Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
