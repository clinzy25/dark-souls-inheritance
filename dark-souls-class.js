let log = console.log

const { rawListeners } = require('process');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Inventory {
    constructor(_items = []) {
        this.items = _items;
    }

    /**
     * Add items to the inventory
     * @param {array} items
     * @returns {*[]}
     */
    addItems(items) {
        this.items = this.items.concat(items);
        return this.items;
    }

    /**
     * Remove an item from the inventory
     * @param {string} name
     */
    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
        return this.items;
    }
}

class Character {
    constructor(name, sex, gift, physique, stats, inventory = new Inventory()) {
        this.name = name;
        this.sex = sex;
        this.gift = gift;
        this.physique = physique;
        this.inventory = inventory;
        this._stats = stats;
    }

    // setters => change (mutate) properties, with validation
    set stats(newStats) {
        if (Object.keys(newStats).length < 1) {
            throw new Error('Please specify at least 1 stat');
        } else if (!Object.values(newStats).every(stat => typeof stat === 'number')) {
            throw new Error('All stat values must be type number');
        }

        // We need to access _stats with an underscore
        // to prevent an infinite loop
        this._stats = {
            ...this._stats, // any existing keys of newStats that exist in this._stats will be overwritten
            ...newStats,   // docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        };
    }

    // getters => access properties
    get stats() {
        return this._stats;
    }

    move() {

    }
    lightAttack() {

    }
    strongAttack() {

    }
    select() {

    }
}


class Warrior extends Character {
    constructor(name, sex, gift, physique) {
        super(name, sex, gift, physique);

        // Add initial inventory items.
        this.inventory.addItems([
            {
                name: 'Longsword',
                description: 'Widely-used standard straight sword, only matched in ubiquity by the shortsword.',
            },
            {
                name: 'Heater Shield',
                description: 'Small metal shield. A standard, widely-used shield.',
            }
        ]);

        // Set initial stats using setter.
        this.stats = {
            level: 4,
            vitality: 11,
            attunement: 8,
            endurance: 12,
            strength: 13,
            dexterity: 13,
            resistance: 11,
            intelligence: 9,
            faith: 9,
        };
    }
}

class Knight extends Character {
    constructor(name, sex, gift, physique) {
        super(name, sex, gift, physique);

        // Add initial inventory items.
        this.inventory.addItems([
            {
                name: 'Broadsword',
                description: 'A straight sword with a broad blade designed for slashing.',
            },
            {
                name: 'Tower Kite Shield',
                description: 'Medium metal shield. Decorated with a tower, the symbol of protection. A standard, widely-used shield.',
            }
        ]);

        // Set initial stats using setter.
        this.stats = {
            level: 5,
            vitality: 14,
            attunement: 10,
            endurance: 10,
            strength: 11,
            dexterity: 11,
            resistance: 10,
            intelligence: 9,
            faith: 11,
        };
    }
}

// TODO: refactor rest of classes
class Wanderer extends Character {
    constructor(name, sex, gift, physique, stats, inventory){
        super(name, sex, gift, physique, stats, inventory);
        [3, 10, 11, 10, 10, 14, 12, 11, 8]
        .forEach((val, i) => {
        this[this.stats[i]] = val;
        this.inventory.weapon = 'Scimitar';
        this.inventory.shield = 'Leather Shield';
        }); 
    }
}

class Thief extends Character {
    constructor(name, sex, gift, physique, stats, inventory){
        super(name, sex, gift, physique, stats, inventory);
        [5, 9, 11, 9, 9, 15, 10, 12, 11]
        .forEach((val, i) => {
        this[this.stats[i]] = val;
        this.inventory.weapon = 'Bandit\'s Knife';
        this.inventory.shield ='Target Shield';
        }); 
    }
}

class Bandit extends Character {
    constructor(name, sex, gift, physique, stats, inventory){
        super(name, sex, gift, physique, stats, inventory);
        [4, 12, 8, 14, 14, 9, 11, 8, 10]
        .forEach((val, i) => {
        this[this.stats[i]] = val;
        this.inventory.weapon = 'Battle Axe';
        this.inventory.shield = 'Spider Shield';
        }); 
    }
}

class Hunter extends Character {
    constructor(name, sex, gift, physique, stats, inventory){
        super(name, sex, gift, physique, stats, inventory);
        [4, 11, 9, 11, 12, 14, 11, 9, 9]
        .forEach((val, i) => {
        this[this.stats[i]] = val;
        this.inventory.weapon = 'Shortsword, Short Bow';
        this.inventory.shield = 'Large Leather Shield';
        this.inventory.other = 'Standard Arrow x30';
        }); 
    }
}

class Sorcerer extends Character {
    constructor(name, sex, gift, physique, stats, inventory){
        super(name, sex, gift, physique, stats, inventory);
        [3, 8, 15, 8, 9, 11, 8, 15, 8]
        .forEach((val, i) => {
        this[this.stats[i]] = val;
        this.inventory.weapon = 'Dagger';
        this.inventory.shield = 'Small Leather Shield';
        this.inventory.magic = 'Scorcerer\'s Catylist';
        this.inventory.other = 'Soul Arrow';
        }); 
    }
}

class Pyromancer extends Character {
    constructor(name, sex, gift, physique, stats, inventory){
        super(name, sex, gift, physique, stats, inventory);
        [1, 10, 12, 11, 12, 9, 12, 10, 8]
        .forEach((val, i) => {
        this[this.stats[i]] = val;
        this.inventory.weapon = 'Hand Axe';
        this.inventory.shield = 'Cracked Round Shield';
        this.inventory.magic = 'Pyromancy Flame';
        this.inventory.other = 'Fireball';
        }); 
    }
}

class Cleric extends Character {
    constructor(name, sex, gift, physique, stats, inventory){
        super(name, sex, gift, physique, stats, inventory);
        [2, 11, 11, 9, 12, 8, 11, 8, 14]
        .forEach((val, i) => {
        this[this.stats[i]] = val;
        this.inventory.weapon = 'Mace';
        this.inventory.shield = 'East-West Shield';
        this.inventory.magic = 'Canvas Talisman';
        this.inventory.other = 'Heal';
        }); 
    }
}

class Deprived extends Character {
    constructor(name, sex, gift, physique, stats, inventory){
        super(name, sex, gift, physique, stats, inventory);
        [6, 11, 11, 11, 11, 11, 11, 11, 11]
        .forEach((val, i) => {
        this[this.stats[i]] = val;
        this.inventory.weapon = 'Club';
        this.inventory.shield ='Plank Shield';
        }); 
    }
}

// let giftsOpt = ['None', 
//                'Goddess\'s BLessing', 
//                'Black Firebomb', 
//                'Twin Humanities', 
//                'Binoculars', 
//                'Pendant', 
//                'Master Key', 
//                'Tiny Being\'s Ring', 
//                'Old Witch\'s Ring'
//                ]
// let physiqueOpt = [ 'Thin',
//                    'Medium',
//                    'Heavy',
//                    'Large Head'
//                  ]
// let sexOpt = ['Male', 'Female']

// (function createCharacter() {
//     rl.question('Create character? y/n  ', (answer) => {
//         if (answer.match(/^y(es)?$/i)) {
//             rl.question('Give your character a name:  ', (name) => {
//                 if (answer. length != 0) {
//                     rl.question('Choose class:  ', (type) => {
//                         if (answer.length != 0) {
//                             rl.question('Choose gift:  ', (gift) => {
//                                 if (answer.length != 0) {
//                                     rl.question('Choose physique:  ', (physique) =>{
//                                         if(answer.length != 0) {
//                                             rl.question('Choose sex:  ', (sex) => {
//                                                 if (answer.length != 0) {
//                                                     global.userChar = new (eval(type))(name, sex, gift, physique)
//                                                     log(userChar);
//                                                 }
//                                             })
//                                         }
//                                     })
//                                 }
//                             })
//                         }
//                     })
//                 }
//             })
//         }
//         else {
//             log()
//         }   
//     })
// })()

// let guy = new Deprived('bob', 'shemale', 'divine', 'tall')
