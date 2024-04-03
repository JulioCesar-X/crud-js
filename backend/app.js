const express = require('express');
const path = require('path');

const app = express();

// Defina o diretório onde seus arquivos estáticos serão armazenados
app.use(express.static(path.join(__dirname, 'public')));

// Defina uma rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicie o servidor na porta desejada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});