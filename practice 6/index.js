const { Bot, Keyboard, InlineKeyboard } = require('grammy');
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Замените на свой токен

// Создание экземпляра бота
const bot = new Bot(BOT_TOKEN);

// Хранилище пользователей в памяти
// Ключ: user_id, Значение: { questions: Array<string> }
const userHistory = new Map();


// 20 ответов: 8 положительных, 8 нейтральных, 4 отрицательных
const answers = {
    positive: [
        'Безусловно!',
        'Да, это так!',
        'Совершенно точно!',
        'Звёзды говорят "да"',
        'Это несомненно!',
        'Определённо да!',
        'Можешь быть уверен(а)',
        'Да, шар уверен в этом'
    ],
    neutral: [
        'Возможно',
        'Сложно сказать точно',
        'Спроси позже',
        'Пока неясно',
        'Обстоятельства могут измениться',
        'Сосредоточься и спроси снова',
        'Шар не может дать ответ',
        'Нужно больше информации'
    ],
    negative: [
        'Нет шансов',
        'Не стоит рассчитывать',
        'Шар говорит "нет"',
        'Мои источники говорят "нет"'
    ]
};

// Объединяем все ответы в один массив для случайного выбора
const allAnswers = [
    ...answers.positive,
    ...answers.neutral,
    ...answers.negative
];

// Главное меню после /start
const mainMenuKeyboard = new Keyboard()
    .text('Спросить шар')
    .text('История вопросов')
    .row() // Новая строка
    .text('Справка')
    .resized() // Компактная клавиатура
    .persistent(); // Остаётся всегда доступной

// Клавиатура после ответа
const askAgainKeyboard = new InlineKeyboard()
    .text('Спросить ещё', 'ask_again');

// Клавиатура для возврата в главное меню из истории
const backToMenuKeyboard = new Keyboard()
    .text('Спросить шар')
    .text('История вопросов')
    .row()
    .text('Справка')
    .resized()
    .persistent();


// сохранение вопросов пользователя в историю
function saveQuestionToHistory(userId, question) {
    // Получаем историю пользователя или создаём новую
    if (!userHistory.has(userId)) {
        userHistory.set(userId, { questions: [] });
    }
    
    const userData = userHistory.get(userId);
    
    // Добавляем новый вопрос в начало массива
    userData.questions.unshift(question);
    
    // Оставляем только последние 5 вопросов
    if (userData.questions.length > 5) {
        userData.questions.pop();
    }
    
    // Сохраняем обратно
    userHistory.set(userId, userData);
    
    console.log(`Пользователь ${userId}: сохранён вопрос "${question.substring(0, 30)}..."`);
}

// получение истории пользователя
function getUserHistory(userId) {
    if (!userHistory.has(userId)) {
        return [];
    }
    return userHistory.get(userId).questions || [];
}

// форматирование текста для красоты
function formatHistory(history) {
    if (history.length === 0) {
        return 'История вопросов пока пуста. Задайте свой первый вопрос!';
    }
    
    let formattedText = '**Последние вопросы:**\n\n';
    
    history.forEach((question, index) => {
        formattedText += `${index + 1}. «${question}»\n`;
    });
    
    return formattedText;
}


// Команда /start
bot.command('start', async (ctx) => {
    const userId = ctx.from.id;
    const userName = ctx.from.first_name || ctx.from.username || 'Пользователь';
    
    // Инициализируем историю пользователя, если её нет
    if (!userHistory.has(userId)) {
        userHistory.set(userId, { questions: [] });
    }
    
    // Отправляем приветственное сообщение с главным меню
    await ctx.reply(
        `**Привет, ${userName}!**\n\n` +
        `Я **Магический шар** — мудрый предсказатель из Telegram!\n\n` +
        `**Как я работаю:**\n` +
        `• Задай мне любой вопрос\n` +
        `• Я случайным образом выберу ответ\n` +
        `• Помни: мои предсказания — это просто игра \n\n` +
        `Нажми кнопку **«Спросить шар»**, чтобы начать!`,
        {
            parse_mode: 'Markdown',
            reply_markup: mainMenuKeyboard
        }
    );
    
    console.log(`Пользователь ${userName} (ID: ${userId}) запустил бота`);
});

// Команда /help
bot.command('help', async (ctx) => {

    await ctx.reply(
        '**Справка по использованию Магического шара**\n\n' +
        '**Как задавать вопросы:**\n' +
        '• Введите любой текстовый вопрос\n' +
        '• Или нажмите кнопку «Спросить шар»\n\n' +
        '**Примеры вопросов:**\n' +
        '• «Стоит ли мне идти на прогулку?»\n' +
        '• «Будет ли сегодня удачный день?»\n' +
        '• «Получить ли мне повышение?»\n\n' +
        '**Доступные команды:**\n' +
        '/start - Начать работу с ботом\n' +
        '/help - Показать эту справку\n\n' +
        '**Помните:** это всего лишь игра для хорошего настроения!',
        { parse_mode: 'Markdown' }
    );
    
    console.log(`Пользователь ${ctx.from.id} запросил справку`);
});

// Обработчик кнопки "Спросить шар"
bot.hears('🎱 Спросить шар', async (ctx) => {
    await ctx.reply(
        '🔮 Задай свой вопрос магическому шару...\n\n' +
        '✨ *Например:* "Стоит ли мне сегодня выходить из дома?"',
        {
            parse_mode: 'Markdown'
        }
    );
    
    console.log(`Пользователь ${ctx.from.id} хочет задать вопрос`);
});

// Обработчик кнопки "История вопросов"
bot.hears('📜 История вопросов', async (ctx) => {
    const userId = ctx.from.id;
    const history = getUserHistory(userId);
    const formattedHistory = formatHistory(history);
    
    await ctx.reply(formattedHistory, {
        parse_mode: 'Markdown',
        reply_markup: mainMenuKeyboard
    });
    
    console.log(`Пользователь ${userId} запросил историю`);
});

// Обработчик кнопки "Справка"
bot.hears('Справка', async (ctx) => {
        // Просто вызываем команду /help
        await ctx.reply(
            '**Справка по использованию Магического шара**\n\n' +
            '**Как задавать вопросы:**\n' +
            '• Введите любой текстовый вопрос\n' +
            '• Или нажмите кнопку «Спросить шар»\n\n' +
            '**Примеры вопросов:**\n' +
            '• «Стоит ли мне идти на прогулку?»\n' +
            '• «Будет ли сегодня удачный день?»\n' +
            '• «Получить ли мне повышение?»\n\n' +
            '**Доступные команды:**\n' +
            '/start - Начать работу с ботом\n' +
            '/help - Показать эту справку\n\n' +
            '**Помните:** это всего лишь игра для хорошего настроения!',
            { parse_mode: 'Markdown' }
        );
});

//Обработчик всех текстовых сообщений/вопросов
bot.on('message:text', async (ctx) => {
    const userId = ctx.from.id;
    const question = ctx.message.text;
    
    // Проверяем, не является ли сообщение командой или кнопкой
    if (question.startsWith('/') || 
        question === 'Спросить шар' || 
        question === 'История вопросов' || 
        question === 'Справка') {
        return; // Игнорируем, так как это обработано другими хендлерами
    }
    
    // Сохраняем вопрос в историю
    saveQuestionToHistory(userId, question);
    
    // Выбираем случайный ответ
    const randomIndex = Math.floor(Math.random() * allAnswers.length);
    const answer = allAnswers[randomIndex];
    
    // Формируем ответ
    const responseText = 
        `**Магический шар говорит...**\n\n` +
        `Твой вопрос: *"${question}"*\n\n` +
        `**Ответ:** ${answer}`;
    
    // Отправляем ответ с кнопкой "Спросить ещё"
    await ctx.reply(responseText, {
        parse_mode: 'Markdown',
        reply_markup: askAgainKeyboard
    });
    
    console.log(`Пользователь ${userId} получил ответ: "${answer}"`);
});

// Обработчик кнопки "Спросить ещё"
bot.callbackQuery('ask_again', async (ctx) => {
    // Отвечаем на callback-запрос (убираем "часики" на кнопке)
    await ctx.answerCallbackQuery();
    
    // Удаляем предыдущее сообщение с ответом
    await ctx.deleteMessage();
    
    // Предлагаем задать новый вопрос
    await ctx.reply(
        '🔮 Задай свой вопрос магическому шару...',
        {
            reply_markup: mainMenuKeyboard
        }
    );
    
    console.log(`Пользователь ${ctx.from.id} хочет задать ещё вопрос`);
});

// ================================================
// ЗАПУСК БОТА
// ================================================

bot.start({
    onStart: (botInfo) => {
        console.log('='.repeat(60));
        console.log('БОТ "МАГИЧЕСКИЙ ШАР" УСПЕШНО ЗАПУЩЕН');
        console.log('='.repeat(60));
        console.log(`Имя бота: @${botInfo.username}`);
        console.log(`ID бота: ${botInfo.id}`);
        console.log(`Ответов в базе: ${allAnswers.length}`);
        console.log(`   • Положительных: ${answers.positive.length}`);
        console.log(`   • Нейтральных: ${answers.neutral.length}`);
        console.log(`   • Отрицательных: ${answers.negative.length}`);
        console.log('='.repeat(60));
        console.log('Ожидание вопросов...');
    }
});

// Обработка сигналов завершения
process.once('SIGINT', () => {
    console.log('\nБот остановлен (SIGINT)');
    console.log(`Статистика сессии:`);
    console.log(`Всего пользователей: ${userHistory.size}`);
    bot.stop();
});

process.once('SIGTERM', () => {
    console.log('\nБот остановлен (SIGTERM)');
    bot.stop();
});