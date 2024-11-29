Proyecto Full Stack - Autenticación y Registro de Usuario
Este proyecto es una aplicación web que permite a los usuarios registrarse, iniciar sesión y acceder a rutas protegidas. Está construido utilizando Node.js, Express, MongoDB (a través de Mongoose), JWT (JSON Web Tokens) para la autenticación y Bcrypt.js para la encriptación de contraseñas.

Tecnologías Utilizadas
Node.js: Entorno de ejecución de JavaScript.
Express.js: Framework web para Node.js.
MongoDB: Base de datos NoSQL.
Mongoose: ODM (Object Document Mapper) para MongoDB.
JWT (JSON Web Tokens): Autenticación mediante tokens.
Bcrypt.js: Biblioteca para encriptar contraseñas.
Vercel: Plataforma para despliegue.
Instalación
1. Clonar el repositorio
Clona este repositorio en tu máquina local:

bash
Copiar código
git clone <URL_DEL_REPOSITORIO>
cd <CARPETA_DEL_PROYECTO>
2. Instalar dependencias
Dentro del directorio del proyecto, ejecuta:

bash
Copiar código
npm install
Esto instalará todas las dependencias necesarias para el proyecto.

3. Variables de entorno
Asegúrate de tener las siguientes variables de entorno configuradas:

JWT_SECRET: La clave secreta utilizada para firmar los tokens JWT. Puedes definirla en un archivo .env en la raíz del proyecto.
MONGO_URI: La URL de conexión de tu base de datos MongoDB.
Ejemplo de archivo .env:
bash
Copiar código
JWT_SECRET=mi_clave_secreta
MONGO_URI=mongodb://localhost:27017/mi_basedatos
4. Ejecutar el servidor de desarrollo
Inicia el servidor de desarrollo ejecutando:

bash
Copiar código
npm run dev
El servidor se ejecutará en el puerto 5000 (por defecto).

Rutas de la API
Registro de Usuario
POST /api/register
Cuerpo de la solicitud:
json
Copiar código
{
  "username": "nombre_usuario",
  "password": "contraseña"
}
Respuesta:
201: Usuario registrado correctamente, con token de autenticación.
400: El usuario ya está registrado.
Login de Usuario
POST /api/login
Cuerpo de la solicitud:
json
Copiar código
{
  "username": "nombre_usuario",
  "password": "contraseña"
}
Respuesta:
200: Login exitoso, con token de autenticación.
400: Credenciales incorrectas.
Despliegue en Vercel
Instalar Vercel CLI:

bash
Copiar código
npm install -g vercel
Iniciar sesión en Vercel:

bash
Copiar código
vercel login
Desplegar la aplicación:

bash
Copiar código
vercel
Esto desplegará la aplicación en una URL proporcionada por Vercel.

Para desplegar nuevamente en producción, puedes usar:

bash
Copiar código
vercel --prod
Contribuir
Si deseas contribuir al proyecto, por favor abre un Pull Request o issue.

Licencia
Este proyecto está bajo la licencia MIT.

Este README te da una visión general de cómo configurar, ejecutar y desplegar tu proyecto. Si tienes alguna duda o necesitas más detalles, no dudes en preguntar.
