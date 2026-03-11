const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Запрос: ${req.url}`);

    // Определяем путь к файлу в зависимости от запроса
    let filePath = '';
    switch (req.url) {
        case '/':
        case '/main.html':
            filePath = path.join(__dirname, 'public', 'main.html');
            break;
        case '/mars.html':
            filePath = path.join(__dirname, 'public', 'mars.html');
            break;
        case '/moon.html':
            filePath = path.join(__dirname, 'public', 'moon.html');
            break;
        case '/jupiter.html':
            filePath = path.join(__dirname, 'public', 'jupiter.html');
            break;
        case '/style.css':
            filePath = path.join(__dirname, 'public', 'style.css');
            break;
        default:
            // Страница 404
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <!DOCTYPE html>
                <html lang="ru">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Страница не найдена</title>
                    <link rel="stylesheet" href="/style.css">
                </head>
                <body>
                    <div class="container error-page">
                        <h1>404 - Страница не найдена</h1>
                        <p>Извините, запрошенная вами страница не существует.</p>
                        <a href="/" class="nav-link">Вернуться на главную</a>
                    </div>
                </body>
                </html>
            `);
            return;
    }

    // Определяем тип контента
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    if (extname === '.css') {
        contentType = 'text/css';
    }

    // Читаем и отдаем файл
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end(`Ошибка сервера: ${err.code}`);
        } else {
            res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
            res.end(content);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`Доступные страницы:`);
    console.log(`- Главная: http://localhost:${PORT}/`);
    console.log(`- Марс: http://localhost:${PORT}/mars`);
    console.log(`- Луна: http://localhost:${PORT}/moon`);
    console.log(`- Юпитер: http://localhost:${PORT}/jupiter`);
});