import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  
import { createUser } from '../../api/userApi'; 
import './Signup.css';  

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [weightLbs, setWeightLbs] = useState('');  // Peso en libras
  const [heightCm, setHeightCm] = useState('');  // Altura en centímetros
  const [workType, setWorkType] = useState('');  // Tipo de trabajo
  const [exerciseLevel, setExerciseLevel] = useState('');  // Nivel de ejercicio físico
  const [goal, setGoal] = useState('');  // Objetivo: perder peso, mantener peso o ganar masa muscular
  const navigate = useNavigate();

  const convertUnits = () => {
    const weightKg = weightLbs * 0.453592;  // 1 libra = 0.453592 kg
    const heightM = heightCm / 100;  // 1 cm = 0.01 metros
    return { weightKg, heightM };
  };

  const adjustActivityLevel = () => {
    if (workType === 'sedentary') {
      if (exerciseLevel === 'none') return 1.2;
      if (exerciseLevel === 'low') return 1.3;
      if (exerciseLevel === 'moderate') return 1.5;
      if (exerciseLevel === 'high') return 1.7;
    } else if (workType === 'moderately-active') {
      if (exerciseLevel === 'none') return 1.4;
      if (exerciseLevel === 'low') return 1.5;
      if (exerciseLevel === 'moderate') return 1.7;
      if (exerciseLevel === 'high') return 1.9;
    } else if (workType === 'physically-active') {
      if (exerciseLevel === 'none') return 1.6;
      if (exerciseLevel === 'low') return 1.7;
      if (exerciseLevel === 'moderate') return 1.8;
      if (exerciseLevel === 'high') return 2.0;
    }
    return 1.2;  // Valor por defecto
  };

  const calculateHealthGoals = () => {
    const { weightKg, heightM } = convertUnits();  // Convertir unidades antes de calcular

    let bmr;
    if (gender === 'Male') {
      bmr = 10 * weightKg + 6.25 * (heightM * 100) - 5 * (new Date().getFullYear() - new Date(dateOfBirth).getFullYear()) + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * (heightM * 100) - 5 * (new Date().getFullYear() - new Date(dateOfBirth).getFullYear()) - 161;
    }

    const activityMultiplier = adjustActivityLevel();  // Obtener el multiplicador de actividad
    let calories = bmr * activityMultiplier;

    if (goal === 'lose') {
      calories -= 500;  // Reducir calorías para perder peso
    } else if (goal === 'gain') {
      calories += 500;  // Aumentar calorías para ganar masa muscular
    }

    return {
      dailyCaloriesGoal: calories.toFixed(0),
      dailyProteinGoal: (weightKg * 2).toFixed(0),
      dailyCarbohydratesGoal: ((calories * 0.55) / 4).toFixed(0),
      dailyFatsGoal: ((calories * 0.3) / 9).toFixed(0),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !gender || !dateOfBirth || !weightLbs || !heightCm || !workType || !exerciseLevel || !goal) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete todos los campos correctamente.',
      });
      return;
    }

    const { dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal } = calculateHealthGoals();

    try {
      const { weightKg, heightM } = convertUnits();

      await createUser({
        name,
        email,
        password,
        gender,
        dateOfBirth,
        weight: weightKg,
        height: heightM,
        dailyCaloriesGoal,
        dailyProteinGoal,
        dailyCarbohydratesGoal,
        dailyFatsGoal,
      });

      Swal.fire({
        icon: 'success',
        title: 'Usuario creado',
        text: 'Usuario creado con éxito. ¡Empieza tu camino hacia una mejor salud!',
      });

      navigate('/login');  // Redirigir al login después del registro
    } catch (error) {
      console.error('Error creando usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error creando el usuario. Por favor, inténtalo de nuevo.',
      });
    }
  };

  return (
    <div className="signup-container">
      <h2>Regístrate</h2>
      <form onSubmit={handleSubmit}>
        <section className="section-info">
          <h3>Información Personal</h3>
          <p>Proporciona información básica para comenzar tu perfil de salud.</p>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej: correo@ejemplo.com"
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
            />
          </div>
          <div>
            <label>Género</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Selecciona</option>
              <option value="Male">Hombre</option>
              <option value="Female">Mujer</option>
            </select>
          </div>
          <div>
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
        </section>

        <section className="section-health-goals">
          <h3>Metas de Salud</h3>
          <p>Ayudaremos a calcular tus necesidades calóricas y macronutrientes.</p>
          <div>
            <label>Peso (lbs)</label>
            <input
              type="number"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
              placeholder="Ej: 150"
              required
            />
          </div>
          <div>
            <label>Altura (cm)</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              placeholder="Ej: 170"
              required
            />
          </div>
          <div>
            <label>Tipo de trabajo</label>
            <select value={workType} onChange={(e) => setWorkType(e.target.value)} required>
              <option value="">Selecciona</option>
              <option value="sedentary">Sedentario</option>
              <option value="moderately-active">Moderadamente activo</option>
              <option value="physically-active">Físicamente activo</option>
            </select>
          </div>
          <div>
            <label>Nivel de ejercicio</label>
            <select value={exerciseLevel} onChange={(e) => setExerciseLevel(e.target.value)} required>
              <option value="">Selecciona</option>
              <option value="none">Ninguno</option>
              <option value="low">Bajo</option>
              <option value="moderate">Moderado</option>
              <option value="high">Alto</option>
            </select>
          </div>
          <div>
            <label>Objetivo</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
              <option value="">Selecciona</option>
              <option value="lose">Bajar de peso</option>
              <option value="maintain">Mantener peso</option>
              <option value="gain">Ganar masa muscular</option>
            </select>
          </div>
        </section>
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
    </div>
  );
};

export default Signup;
