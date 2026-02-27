let hero = {
    name: 'Рыцарь',
    health: 100,
    attack: 10,
    armor: 2,

    attackEnemy: function (enemy) {
        let damage = Math.max(0, this.attack - enemy.armor);
        enemy.health -= damage;
        
        console.log(`
        ⚔️ ${this.name} атаковал ${enemy.name}!
        Нанесено ${damage} урона.
        Здоровье ${enemy.name} = ${Math.max(0, enemy.health)}
        `);
    },
    
    takeDamage: function (damage) {
        let actualDamage = Math.max(0, damage - this.armor);
        this.health -= actualDamage;
        
        console.log(`
        💢 ${this.name} получил урон!
        Нанесено ${actualDamage} урона.
        Здоровье ${this.name} = ${Math.max(0, this.health)}
        `);
    }
}

let enemy = {
    name: 'Орк',
    health: 120,
    attack: 6,
    armor: 0,
    
    attackHero: function (hero) {
        let damage = Math.max(0, this.attack - hero.armor);
        hero.health -= damage;
        
        console.log(`
        👹 ${this.name} атаковал ${hero.name}!
        Нанесено ${damage} урона.
        Здоровье ${hero.name} = ${Math.max(0, hero.health)}
        `);
    }
}

console.log('⚔️ НАЧАЛО БИТВЫ! ⚔️');
console.log(`${hero.name} (❤️ ${hero.health}) VS ${enemy.name} (❤️ ${enemy.health})`);
console.log('='.repeat(40));

let round = 1;

while (hero.health > 0 && enemy.health > 0) {
    console.log(`\n--- РАУНД ${round} ---`);
    
    console.log(`Ход ${hero.name}:`);
    hero.attackEnemy(enemy);
    
    if (enemy.health <= 0) {
        console.log(`\n🏆 ПОБЕДА! ${hero.name} одержал победу над ${enemy.name}! 🏆`);
        break;
    }
    
    console.log(`Ход ${enemy.name}:`);
    enemy.attackHero(hero);
    
    if (hero.health <= 0) {
        console.log(`\n💀 ПОРАЖЕНИЕ! ${enemy.name} победил ${hero.name}! 💀`);
        break;
    }
    
    console.log(`\n📊 Статус после ${round} раунда:`);
    console.log(`${hero.name}: ❤️ ${hero.health} | ${enemy.name}: ❤️ ${enemy.health}`);
    
    round++;
}

console.log('='.repeat(40));
console.log('⚔️ БИТВА ОКОНЧЕНА ⚔️');