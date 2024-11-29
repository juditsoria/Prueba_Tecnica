import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate en lugar de useHistory

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usamos navigate en lugar de history

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Primero, intentamos iniciar sesión
      let response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Si la respuesta no es exitosa, intentamos registrar al usuario
      if (!response.ok) {
        // Si el login falla (es decir, usuario no existe), intentamos el registro
        response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }), // Usamos la misma información para registro
        });

        // Si el registro tampoco es exitoso, mostramos el error
        if (!response.ok) {
          throw new Error('No se pudo registrar el usuario, o las credenciales son incorrectas');
        }

        // Si el registro es exitoso, nos aseguramos de que el usuario pueda iniciar sesión
        alert('Usuario registrado exitosamente. Ahora iniciando sesión...');
        response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
      }

      // Si la respuesta es exitosa, obtenemos el token
      const data = await response.json();
      const { token } = data;

      // Guardar el token en localStorage
      localStorage.setItem('authToken', token);

      // Redirigir al usuario a la página principal o dashboard
      navigate('/dashboard'); // Cambia la ruta según corresponda

    } catch (error) {
      // Manejar errores
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
