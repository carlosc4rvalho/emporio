require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { corsMiddleware } = require('./middlewares/corsMiddleware');
const apiRoutes = require('./routes');

const app = express();

// Configura o Multer para armazenar arquivos como buffers
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Diretório onde as imagens serão salvas
const UPLOAD_DIR = path.join(__dirname, './uploads');

// Middleware para servir arquivos estáticos da pasta 'uploads'
app.use('/api/uploads', express.static(UPLOAD_DIR));

// Configure middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(upload.any());

// Configure routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// cadastro de loja
// cadastro de campos personalizados
// middlewares para proteção
// token de autenticação
// e muito mais