# Fithub Web App

Este es el proyecto **Fithub**, una plataforma web que ayuda a los usuarios a llevar un seguimiento de su salud mediante el registro de calorías, ejercicio y sueño. 

## Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas antes de comenzar a trabajar en el proyecto:

1. **Node.js** (Versión >= 14)
   - [Descargar Node.js](https://nodejs.org/)
   
2. **MySQL** (Versión >= 5.7)
   - Asegúrate de tener una base de datos configurada.

3. **Docker** (Opcional)
   - Si prefieres usar contenedores, asegúrate de tener Docker instalado. [Descargar Docker](https://www.docker.com/get-started)

4. **Git**
   - Clona este repositorio usando Git: `git clone https://github.com/Christ02/Fithub-App.git`

## Tecnologías Utilizadas

- **Frontend:**
  - React.js (CRA - Create React App)
  - CSS Modules
  - React Router DOM

- **Backend:**
  - Node.js con Express
  - MySQL como base de datos
  - Cors y Body-Parser para manejo de peticiones
  - bcrypt para el hash de contraseñas
  - JWT para autenticación

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/fithub.git
cd fithub
```

### 2. Instalación de dependencias
```bash
cd frontend
npm install
npm install react react-dom react-router-dom axios sweetalert2 react-sweetalert2

cd backend
npm install
npm install express mysql2 body-parser cors bcryptjs jsonwebtoken
```

### 3. Configuración de la Base de Datos

Crea una base de datos en MySQL llamada fithub_db (o como prefieras).

Carga el esquema de la base de datos que se encuentra en el archivo /backend/schema.sql.

Configura las credenciales de la base de datos en el archivo backend/config/db.js:

```bash

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost', // Cambia a tu host de MySQL si es diferente
  user: 'root', // Usuario de MySQL
  password: 'your-password', // Contraseña de MySQL
  database: 'fithub_db', // Nombre de la base de datos
});
```


