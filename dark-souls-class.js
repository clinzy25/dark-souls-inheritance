let log = console.log

const { rawListeners } = require('process');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

class Character {
    constructor(name, sex, gift, physique, stats, inventory) {
        this.name = name;
        this.sex = sex;
        this.gift = gift;
        this.physique = physique;
        this.inventory = {
                        'weapon': null,
                        'shield': null,
                        'magic': null,
                        'other': null
                        }
        this.stats = [ 
                    'level', 
                    'vitality',
                    'attunement', 
                    'endurance', 
                    'strength', 
                    'dexterity', 
                    'resistance', 
                    'intellegence', 
                    'faith'
                    ] 
 
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
    constructor(name, sex, gift, physique, stats, inventory){
        super(name, sex, gift, physique, stats, inventory);
        [4, 11, 8, 12, 13, 13, 11, 9, 9]
        .forEach((val, i) => {
            this[this.stats[i]] = val;
            this.inventory.weapon = 'Longsword';
            this.inventory.shield = 'Heater Shield';
        }); 
    }
}

class Knight extends Character {
    constructor(name, sex, gift, physique, stats, inventory){
        super(name, sex, gift, physique, stats, inventory);
        [5, 14, 10, 10, 11, 11, 10, 9, 11]
        .forEach((val, i) => {
        this[this.stats[i]] = val;
        this.inventory.weapon = 'Browdsword';
        this.inventory.shield = 'Tower Kite Shield';
        }); 
    }
}

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
