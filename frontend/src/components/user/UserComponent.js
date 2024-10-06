// src/components/UserComponent.js
import React, { useState } from 'react';
import { createUser, getUserById, updateUserById, deleteUserById } from '../api/userApi';

const UserComponent = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    weight: '',
    height: '',
    dailyCaloriesGoal: '',
    dailyProteinGoal: '',
    dailyCarbohydratesGoal: '',
    dailyFatsGoal: '',
  });

  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);

  // Manejar el cambio en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Crear un nuevo usuario
  const handleCreateUser = async () => {
    try {
      const response = await createUser(userData);
      alert('Usuario creado exitosamente');
    } catch (error) {
      alert('Error creando usuario');
    }
  };

  // Obtener un usuario por ID
  const handleGetUser = async () => {
    try {
      const response = await getUserById(userId);
      setUser(response);
    } catch (error) {
      alert('Error obteniendo usuario');
    }
  };

  // Actualizar un usuario por ID
  const handleUpdateUser = async () => {
    try {
      const response = await updateUserById(userId, userData);
      alert('Usuario actualizado exitosamente');
    } catch (error) {
      alert('Error actualizando usuario');
    }
  };

  // Eliminar un usuario por ID
  const handleDeleteUser = async () => {
    try {
      await deleteUserById(userId);
      alert('Usuario eliminado exitosamente');
    } catch (error) {
      alert('Error eliminando usuario');
    }
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>

      <h3>Crear/Actualizar Usuario</h3>
      <input type="text" name="name" placeholder="Nombre" onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleInputChange} />
      <input type="date" name="dateOfBirth" placeholder="Fecha de Nacimiento" onChange={handleInputChange} />
      <input type="text" name="gender" placeholder="Género" onChange={handleInputChange} />
      <input type="number" name="weight" placeholder="Peso" onChange={handleInputChange} />
      <input type="number" name="height" placeholder="Altura" onChange={handleInputChange} />
      <input type="number" name="dailyCaloriesGoal" placeholder="Meta diaria de Calorías" onChange={handleInputChange} />
      <input type="number" name="dailyProteinGoal" placeholder="Meta diaria de Proteínas" onChange={handleInputChange} />
      <input type="number" name="dailyCarbohydratesGoal" placeholder="Meta diaria de Carbohidratos" onChange={handleInputChange} />
      <input type="number" name="dailyFatsGoal" placeholder="Meta diaria de Grasas" onChange={handleInputChange} />
      <button onClick={handleCreateUser}>Crear Usuario</button>
      <button onClick={handleUpdateUser}>Actualizar Usuario</button>

      <h3>Buscar/Eliminar Usuario</h3>
      <input type="text" placeholder="ID de Usuario" onChange={(e) => setUserId(e.target.value)} />
      <button onClick={handleGetUser}>Buscar Usuario</button>
      <button onClick={handleDeleteUser}>Eliminar Usuario</button>

      {user && (
        <div>
          <h4>Usuario encontrado:</h4>
          <p>Nombre: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Peso: {user.weight} kg</p>
          {/* Añadir más detalles del usuario según lo que recuperes */}
        </div>
      )}
    </div>
  );
};

export default UserComponent;
