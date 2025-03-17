// index.mjs
import { createServer } from 'node:http';
import express from 'express';
import pool from './src/database/connection.mjs';
import personaRoutes from './src/routes/personaRoutes.mjs';
import cors from 'cors';


const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Función para probar la conexión con la base de datos
const testDBConnection = async () => {
  try {
    const [rows] = await pool.query('SELECT 1 AS result');
    console.log('Conexión exitosa a la base de datos:', rows);
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
    process.exit(1); // Termina el proceso si hay error de conexión
  }
};

// Configuración de CORS
const corsOptions = {
  origin: '*', // Dominios permitidos, ajustar según sea necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

// Habilitar CORS para todas las solicitudes
app.use(cors(corsOptions));

// Rutas
app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando correctamente!');
});

app.use('/api/personas', personaRoutes);
// Usar las rutas de personas2


// Crear un servidor HTTP usando Express
const server = createServer(app);

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Servidor escuchando en http://127.0.0.1:${PORT}`);
});

// Verificar la conexión a la base de datos antes de iniciar el servidor
testDBConnection();