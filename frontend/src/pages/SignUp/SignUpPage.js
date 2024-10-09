import React from 'react';
import Signup from '../../components/SignUp/Signup';  // Importa el componente Signup

const SignupPage = () => {
  return (
    <div className="signup-page">
      <h1>Regístrate en Fithub</h1>
      <Signup />  {/* Muestra el formulario de registro */}
    </div>
  );
};

export default SignupPage;