const express = require('express');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const PORT = 3000;

// Настройка шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница с формой
app.get('/', (req, res) => {
    res.render('index', { 
        qrcode: null, 
        error: null,
        text: '',
        darkColor: '#000000',
        lightColor: '#ffffff'
    });
});

// Обработка генерации QR-кода
app.post('/generate', async (req, res) => {
    try {
        const { text, darkColor, lightColor } = req.body;
        
        // Валидация
        if (!text || text.trim() === '') {
            return res.render('index', {
                qrcode: null,
                error: 'Пожалуйста, введите текст или URL для генерации QR-кода',
                text: '',
                darkColor: darkColor || '#000000',
                lightColor: lightColor || '#ffffff'
            });
        }
        
        // Опции для QR-кода с цветами
        const options = {
            color: {
                dark: darkColor || '#000000',
                light: lightColor || '#ffffff'
            },
            width: 300,
            margin: 2
        };
        
        // Генерация QR-кода
        const qrCodeDataURL = await QRCode.toDataURL(text.trim(), options);
        
        res.render('index', {
            qrcode: qrCodeDataURL,
            error: null,
            text: text.trim(),
            darkColor: darkColor || '#000000',
            lightColor: lightColor || '#ffffff'
        });
        
    } catch (error) {
        console.error('Ошибка генерации QR-кода:', error);
        res.render('index', {
            qrcode: null,
            error: 'Произошла ошибка при генерации QR-кода',
            text: req.body.text || '',
            darkColor: req.body.darkColor || '#000000',
            lightColor: req.body.lightColor || '#ffffff'
        });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📱 Генератор QR-кодов доступен по адресу: http://localhost:${PORT}`);
});