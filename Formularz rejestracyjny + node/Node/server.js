const express = require('express');
const path = require('path');

const app = express();

// Ścieżki do katalogów
const apiDir = '\\\\MYCLOUD-00A2RY\\kawjorek\\STUDIA\\SEMESTR 4\\Zaawansowane technologie internetowe\\Projektzzajęć\\Zajecia2API';
const formDir = '\\\\MYCLOUD-00A2RY\\kawjorek\\STUDIA\\SEMESTR 4\\Zaawansowane technologie internetowe\\Projektzzajęć';

// Serwuj /api → Zajecia2API
app.use('/api', express.static(apiDir));

// Serwuj /form → folder nadrzędny, np. zawiera form.html
app.use('/form', express.static(formDir));

// Strona główna
app.get('/', (req, res) => {
    res.send('<h1>Witaj na stronie głównej</h1><p>Przejdź do <a href="/api">API</a> lub <a href="/form/form.html">Formularza</a></p>');
});

// Obsługa błędów 404
app.use((req, res) => {
    res.status(404).send('<h2>Strona nie istnieje</h2>');
});

// Uruchomienie serwera
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
