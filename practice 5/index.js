const { Bot, Keyboard, InlineKeyboard } = require('grammy');
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Замените на свой токен

// Создание экземпляра бота
const bot = new Bot(BOT_TOKEN);

// Хранилище пользователей в памяти (Map)
// Ключ: user_id, Значение: { win: number, lose: number }
const userList = new Map();

// Главное меню (после /start)

const menuKeyboard = new Keyboard()
    .text('Играть')
    .resized() // Компактная клавиатура
    .oneTime(); // Скрывается после нажатия

// Игровая клавиатура выбор орла/решки и статистика

const gameKeyboard = new InlineKeyboard()
    .text('Орёл', 'orel')
    .text('Решка', 'reshka')
    .row() // Новая строка
    .text('Статистика', 'stat');

// Клавиатура для повтора игры после результата
const replayKeyboard = new InlineKeyboard()
    .text('🔄 Сыграть ещё', 'replay');

// сохранение пользователя по Ключ: user_id, Значение: { win: number, lose: number }
function saveUser(userId) {
    // Проверяем, есть ли пользователь в списке
    if (!userList.has(userId)) {
        // Добавляем нового пользователя с нулевой статистикой
        userList.set(userId, { win: 0, lose: 0 });
        console.log(`[SAVE] Пользователь ${userId} сохранен. Статистика: { win: 0, lose: 0 }`);
    }
    
    return userList.get(userId);
}

// обнолевние статистики пользоватлея после игры
function changeUserStat(userId, isWin) {
    // Получаем пользователя
    let user = userList.get(userId);
    
    if (!user) {
        // Если пользователя нет сохраняем и получаем заново
        user = saveUser(userId);
    }
    
    // Обновляем статистику в зависимости от результата
    if (isWin) {
        user.win += 1;
        console.log(`[UPDATE] Пользователь ${userId} победил. Новая статистика:`, user);
    } else {
        user.lose += 1;
        console.log(`[UPDATE] Пользователь ${userId} проиграл. Новая статистика:`, user);
    }
    
    // Сохраняем обновленные данные обратно в Map
    userList.set(userId, user);
    
    return user;
}

//Основная функция игры
async function play(ctx, choice) {
    try {
        const userId = ctx.from.id;
        
        // Генерируем случайное число для определения результата
        // Если num >= 0.5 - орёл победа, если < 0.5 - решка поражение
        const num = Math.random();
        const isWin = num >= 0.5;
        
        // Определяем результаты для отображения
        const resultEmoji = isWin ? '🎉' : '😢';
        const resultText = isWin ? 'ВЫИГРАЛ' : 'ПРОИГРАЛ';
        const computerChoice = num >= 0.5 ? '🦅 Орёл' : '💀 Решка';
        const userChoiceText = choice === 'orel' ? '🦅 Орёл' : '💀 Решка';
        
        // Обновляем статистику пользователя
        changeUserStat(userId, isWin);
        
        // Получаем актуальную статистику
        const userStat = userList.get(userId);
        
        // Формируем сообщение с результатом
        const resultMessage = 
            `${resultEmoji} **${resultText}** ${resultEmoji}\n\n` +
            `Твой выбор: ${userChoiceText}\n` +
            `Выпавший выбор: ${computerChoice}\n\n` +
            `**Статистика:**\n` +
            `Побед: ${userStat.win}\n` +
            `Поражений: ${userStat.lose}`;
        
        // Удаляем предыдущее сообщение (с выбором орёл/решка)
        await ctx.deleteMessage();
        
        // Отправляем результат с клавиатурой для повтора
        await ctx.reply(resultMessage, {
            parse_mode: 'Markdown',
            reply_markup: replayKeyboard
        });
        
        console.log(`[GAME] Пользователь ${userId} выбрал ${choice}, результат: ${isWin ? 'победа' : 'поражение'}`);
        
    } catch (error) {
        console.error('[ERROR] Ошибка в игровой логике:', error.message);
        await ctx.reply('Произошла ошибка во время игры. Попробуйте ещё раз.');
    }
}

// Команда /start Приветствует пользователя и показывает главное меню

bot.command('start', async (ctx) => {
    try {
        const userId = ctx.from.id;
        const userName = ctx.from.first_name || ctx.from.username || 'Пользователь';
        
        // Сохраняем пользователя (если его ещё нет)
        saveUser(userId);
        
        // Отправляем приветственное сообщение с главным меню
        await ctx.reply(
            `👋 Привет, ${userName}!\n\n` +
            `🎲 Добро пожаловать в игру «Орёл или Решка»!\n\n` +
            `Правила простые:\n` +
            `• Выбираешь Орла или Решку\n` +
            `• Я случайным образом определяю результат\n` +
            `• Статистика побед и поражений сохраняется\n\n` +
            `Нажми кнопку «Играть», чтобы начать!`,
            {
                reply_markup: menuKeyboard
            }
        );
        
        console.log(`[START] Пользователь ${userName} (ID: ${userId}) начал игру`);
        
    } catch (error) {
        console.error('[ERROR] Ошибка в /start:', error.message);
        await ctx.reply('Произошла ошибка. Попробуйте позже.');
    }
});

// Обработчик кнопки "Играть" из главного меню
bot.hears('🎮 Играть', async (ctx) => {
    try {
        // Показываем клавиатуру игры (выбор орёл/решка + статистика)
        await ctx.reply('🎲 Сделай свой выбор:', {
            reply_markup: gameKeyboard
        });
        
        console.log(`[MENU] Пользователь ${ctx.from.id} перешел в меню игры`);
        
    } catch (error) {
        console.error('[ERROR] Ошибка при переходе в меню игры:', error.message);
    }
});

// Обработка выбора "Орёл"

bot.callbackQuery('orel', async (ctx) => {
    try {
        // Отвечаем на callback-запрос (убираем "часики" на кнопке)
        await ctx.answerCallbackQuery();
        
        // Запускаем игру с выбором "орёл"
        await play(ctx, 'orel');
        
    } catch (error) {
        console.error('[ERROR] Ошибка при выборе Орла:', error.message);
    }
});

// Обработка выбора "Решка"
 
bot.callbackQuery('reshka', async (ctx) => {

    // Отвечаем на callback-запрос
    await ctx.answerCallbackQuery();
    
    // Запускаем игру с выбором "решка"
    await play(ctx, 'reshka');

});


// Обработка кнопки "Статистика"
bot.callbackQuery('stat', async (ctx) => {

    const userId = ctx.from.id;
    
    // Отвечаем на callback-запрос
    await ctx.answerCallbackQuery();
    
    // Сохраняем пользователя, если его нет
    const user = saveUser(userId);
    
    // Удаляем предыдущее сообщение (с выбором орёл/решка)
    await ctx.deleteMessage();
    
    // Отправляем статистику с главным меню
    await ctx.reply(
        `📊 **Ваша статистика:**\n\n` +
        `🏆 Побед: ${user.win}\n` +
        `💔 Поражений: ${user.lose}`,
        {
            parse_mode: 'Markdown',
            reply_markup: menuKeyboard
        }
    );
    
    console.log(`[STAT] Пользователь ${userId} запросил статистику:`, user);
});


// Обработка кнопки "Сыграть ещё"
bot.callbackQuery('replay', async (ctx) => {
    try {
        // Отвечаем на callback-запрос
        await ctx.answerCallbackQuery();
        
        // Удаляем предыдущее сообщение (с результатом игры)
        await ctx.deleteMessage();
        
        // Показываем клавиатуру игры
        await ctx.reply('🎲 Сделай свой выбор:', {
            reply_markup: gameKeyboard
        });
        
        console.log(`[REPLAY] Пользователь ${ctx.from.id} хочет сыграть ещё`);
        
    } catch (error) {
        console.error('[ERROR] Ошибка при повторе игры:', error.message);
    }
});


bot.start({
    onStart: (botInfo) => {
        console.log('='.repeat(50));
        console.log('🎲 БОТ "ОРЁЛ ИЛИ РЕШКА" УСПЕШНО ЗАПУЩЕН');
        console.log('='.repeat(50));
        console.log(`🤖 Имя бота: @${botInfo.username}`);
        console.log(`🆔 ID бота: ${botInfo.id}`);
        console.log(`📊 Хранилище: Map (в памяти)`);
        console.log(`👥 Пользователей в памяти: ${userList.size}`);
        console.log('='.repeat(50));
        console.log('📝 Ожидание сообщений...');
    }
});

// Обработка сигналов завершения
process.once('SIGINT', () => {
    console.log('\n👋 Бот остановлен (SIGINT)');
    console.log(`📊 Итоговая статистика:`);
    console.log(`Всего пользователей: ${userList.size}`);
    
    // Выводим статистику всех пользователей при остановке
    userList.forEach((stats, userId) => {
        console.log(`  • ID ${userId}: ${stats.win} побед, ${stats.lose} поражений`);
    });
    
    bot.stop();
});

process.once('SIGTERM', () => {
    console.log('\n👋 Бот остановлен (SIGTERM)');
    bot.stop();
});