let log = console.log;

function Character(name, sex, gift, physique, stats, inventory) {
  //Supertype and its behaviors to be passed
  this.name = name;
  this.sex = sex;
  this.gift = gift;
  this.physique = physique;
  this.inventory = {
    weapon: null,
    shield: null,
    magic: null,
    other: null,
  };
  this.stats = [
    "level",
    "vitality",
    "attunement",
    "endurance",
    "strength",
    "dexterity",
    "resistance",
    "intellegence",
    "faith",
  ];
}

Character.prototype.move = function () {
  log("move");
};
Character.prototype.lightAttack = function () {
  log("light attack");
};
Character.prototype.strongAttack = function () {
  log("strong attack");
};
Character.prototype.select = function () {
  log("select");
};

function setStats(statVals) {
  this.stats = {
    ...statVals.forEach((val, i) => (this[this.stats[i]] = val)),
  };
  return this.stats;
}

function Warrior(name, sex, gift, physique, stats, inventory) {
  Character.call(this, name, sex, gift, physique, stats, inventory); //Call Character constructor, see MDN .call()
  this.stats = setStats.call(this, [4, 11, 8, 12, 13, 13, 11, 9, 9]);
  this.inventory.weapon = "Longsword";
  this.inventory.shield = "Heater Shield";
}
Warrior.prototype = Object.create(Character.prototype); //creates new object with the value of Warrior.prototype
Warrior.prototype.constructor = Warrior;

const guy = new Warrior("conner", "M", "Pendant", "Thin");
log(guy);
// Warrior {
//     name: 'conner',
//     sex: 'M',
//     gift: 'Pendant',
//     physique: 'Thin',
//     inventory: {
//       weapon: 'Longsword',
//       shield: 'Heater Shield',
//       magic: null,
//       other: null
//     },
//     stats: {}, // Put stats in Warrior.stats ?? *********************************************************
//     level: 4,
//     vitality: 11,
//     attunement: 8,
//     endurance: 12,
//     strength: 13,
//     dexterity: 13,
//     resistance: 11,
//     intellegence: 9,
//     faith: 9
//   }

function Knight(name, sex, gift, physique, stats, inventory) {
  Character.call(this, name, sex, gift, physique, stats, inventory);
  [5, 14, 10, 10, 11, 11, 10, 9, 11].forEach((val, i) => {
    this[this.stats[i]] = val;
  });
  this.inventory.weapon = "Browdsword";
  this.inventory.shield = "Tower Kite Shield";
}
Knight.prototype = Object.create(Character.prototype);
Knight.prototype.constructor = Knight;

function Wanderer(name, sex, gift, physique, stats, inventory) {
  Character.call(this, name, sex, gift, physique, stats, inventory);
  [3, 10, 11, 10, 10, 14, 12, 11, 8].forEach((val, i) => {
    this[this.stats[i]] = val;
  });
  this.inventory.weapon = "Scimitar";
  this.inventory.shield = "Leather Shield";
}
Wanderer.prototype = Object.create(Character.prototype);
Wanderer.prototype.constructor = Wanderer;

function Thief(name, sex, gift, physique, stats, inventory) {
  Character.call(this, name, sex, gift, physique, stats, inventory);
  [5, 9, 11, 9, 9, 15, 10, 12, 11].forEach((val, i) => {
    this[this.stats[i]] = val;
  });
  this.inventory.weapon = "Bandit's Knife";
  this.inventory.shield = "Target Shield";
}
Thief.prototype = Object.create(Character.prototype);
Thief.prototype.constructor = Thief;

function Bandit(name, sex, gift, physique, stats, inventory) {
  Character.call(this, name, sex, gift, physique, stats, inventory);
  [4, 12, 8, 14, 14, 9, 11, 8, 10].forEach((val, i) => {
    this[this.stats[i]] = val;
  });
  this.inventory.weapon = "Battle Axe";
  this.inventory.shield = "Spider Shield";
}
Bandit.prototype = Object.create(Character.prototype);
Bandit.prototype.constructor = Bandit;

function Hunter(name, sex, gift, physique, stats, inventory) {
  Character.call(this, name, sex, gift, physique, stats, inventory);
  [4, 11, 9, 11, 12, 14, 11, 9, 9].forEach((val, i) => {
    this[this.stats[i]] = val;
    this.inventory.weapon = "Shortsword, Short Bow";
  });
  this.inventory.shield = "Large Leather Shield";
  this.inventory.other = "Standard Arrow x30";
}
Hunter.prototype = Object.create(Character.prototype);
Hunter.prototype.constructor = Hunter;

function Sorcerer(name, sex, gift, physique, stats, inventory) {
  Character.call(this, name, sex, gift, physique, stats, inventory);
  [3, 8, 15, 8, 9, 11, 8, 15, 8].forEach((val, i) => {
    this[this.stats[i]] = val;
  });
  this.inventory.weapon = "Dagger";
  this.inventory.shield = "Small Leather Shield";
  this.inventory.magic = "Scorcerer's Catylist";
  this.inventory.other = "Soul Arrow";
}
Sorcerer.prototype = Object.create(Character.prototype);
Sorcerer.prototype.constructor = Sorcerer;

function Pyromancer(name, sex, gift, physique, stats, inventory) {
  Character.call(this, name, sex, gift, physique, stats, inventory);
  [1, 10, 12, 11, 12, 9, 12, 10, 8].forEach((val, i) => {
    this[this.stats[i]] = val;
  });
  this.inventory.weapon = "Hand Axe";
  this.inventory.shield = "Cracked Round Shield";
  this.inventory.magic = "Pyromancy Flame";
  this.inventory.other = "Fireball";
}
Pyromancer.prototype = Object.create(Character.prototype);
Pyromancer.prototype.constructor = Pyromancer;

function Cleric(name, sex, gift, physique, stats, inventory) {
  Character.call(this, name, sex, gift, physique, stats, inventory);
  [2, 11, 11, 9, 12, 8, 11, 8, 14].forEach((val, i) => {
    this[this.stats[i]] = val;
  });
  this.inventory.weapon = "Mace";
  this.inventory.shield = "East-West Shield";
  this.inventory.magic = "Canvas Talisman";
  this.inventory.other = "Heal";
}
Cleric.prototype = Object.create(Character.prototype);
Cleric.prototype.constructor = Cleric;

function Deprived(name, sex, gift, physique, stats, inventory) {
  Character.call(this, name, sex, gift, physique, stats, inventory);
  [6, 11, 11, 11, 11, 11, 11, 11, 11].forEach((val, i) => {
    this[this.stats[i]] = val;
  });
  this.inventory.weapon = "Club";
  this.inventory.shield = "Plank Shield";
}
Deprived.prototype = Object.create(Character.prototype);
Deprived.prototype.constructor = Deprived;

//C H E C K S

// let guy = new Warrior("Conner", "Male", "Twin Humanities", "Heavy");

// log(guy)
// //boiler
// log(guy.level)
// //4
// log(guy.gift)
// //Twin Humanitites

// //Check for prototype inheritance
// log(Warrior.prototype.isPrototypeOf(guy)) //confirms that Warrior is in guy's prototype chain
// //true
// log(Character.prototype.isPrototypeOf(guy))
// //true
// log(guy instanceof Warrior) //same but checks for constuctor prototype property
// //true
// log(guy.lightAttack())
// //lightAttack

// Warrior.prototype.skreech = () => log('skreee');
// log(guy.skreech())
// //skreee

// log(Object.getPrototypeOf(guy))
// // Character {
// //     constructor: [Function: Warrior],
// //     skreech: [Function (anonymous)]
// //   }
