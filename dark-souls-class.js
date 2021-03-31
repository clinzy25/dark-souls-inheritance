let log = console.log;
/**
 * We can add methods to characters using composition
 */

const lightAttack = {};

class Character {
  constructor(name, sex, gift, physique, stats = {}, state = new State()) {
    this.name = name;
    this.sex = sex;
    this.gift = gift;
    this.physique = physique;
    this._stats = stats;
    this.state = state;
  }

  /**
   * Setter for updating this._stats, which is accessible through Character.stats
   * @param {object} newStats
   */
  set stats(newStats) {
    if (Object.keys(newStats).length < 1) {
      throw new Error("Please specify at least 1 stat");
    } else if (
      !Object.values(newStats).every((stat) => typeof stat === "number")
    ) {
      throw new Error("All stat values must be type number");
    }

    for (let key in newStats) {
      this[key] = newStats[key]; // sets each stat on the character individually
    }

    // We need to access _stats with an underscore
    // to prevent an infinite loop
    this._stats = {
      ...this._stats, // any existing keys of newStats that exist in this._stats will be overwritten
      ...newStats, // docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    };
  }

  /**
   * Getter for accessing this._stats
   * @returns {*}
   */
  get stats() {
    return this._stats;
  }

  /**
   * This is a sync state function that I'm not sure about. I think it would be called
   * at the end of certain actions (like adding to inventory or resting at a BF) to make sure we don't accidentally
   * make changes that don't persist. Not sure if it's necessary, and its not even working sooo...
   * @param {object} state
   */
  syncState(state) {
    for (let prop in this.state) {
      if (!(prop in state) || !syncState(this.state[prop], state[prop])) {
        this.state = state;
        throw new Error("A state change was not captured");
      }
    }
    return this.state;
  }
}

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
    this.items = this.items.filter((item) => item.name !== name);
    return this.items;
  }
}

class State {
  constructor(
    level = "Undead Asylum",
    positionX = 0,
    positionY = 0,
    souls = 0,
    lastBonfire = "",
    inventory = new Inventory()
  ) {
    this.level = level;
    this.positionX = positionX;
    this.positionY = positionY;
    this.souls = souls;
    this.lastBonfire = lastBonfire;
    this.inventory = inventory;
  }
  updateLevel() {
    this.level = newLevel;
  }

  updateBonfire(newBonfire) {
    this.lastBonfire = newBonfire;
  }

  /**
   * Sets position (curently arbitrary)
   * @param {number} x
   * @param {number} y
   * @returns {[]}
   */
  updatePosition(x, y) {
    this.positionX += x;
    this.positionY += y;
    return [x, y];
  }

  /**
   * Updates soul count, supports negative numbers
   * @param {number} numSouls
   */
  updateSouls(numSouls) {
    this.souls += numSouls;
  }
}

class Warrior extends Character {
  constructor(name, sex, gift, physique) {
    super(name, sex, gift, physique);

    // Add initial inventory items.
    this.state.inventory.addItems([
      {
        name: "Longsword",
        type: "Weapon",
        description:
          "Widely-used standard straight sword, only matched in ubiquity by the shortsword.",
      },
      {
        name: "Heater Shield",
        type: "Shield",
        description: "Small metal shield. A standard, widely-used shield.",
      },
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

const conner = new Warrior("boah", "M", "pendant", "thin");
conner.state.updateBonfire("Firelink");
conner.state.updatePosition(50, -90);
conner.state.updatePosition(-25, 90);
conner.state.updateSouls(100);
conner.state.inventory.addItems({
  name: "Giant Club",
  type: "Weapon",
  description: "Big ass club",
});
log(conner);
log(conner.state.inventory);

class Knight extends Character {
  constructor(name, sex, gift, physique) {
    super(name, sex, gift, physique);

    // Add initial inventory items.
    this.inventory.addItems([
      {
        name: "Broadsword",
        type: "Weapon",
        description:
          "A straight sword with a broad blade designed for slashing.",
      },
      {
        name: "Tower Kite Shield",
        type: "Shield",
        description:
          "Medium metal shield. Decorated with a tower, the symbol of protection. A standard, widely-used shield.",
      },
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

class Wanderer extends Character {
  constructor(name, sex, gift, physique) {
    super(name, sex, gift, physique);

    this.inventory.addItems([
      {
        name: "Scimitar",
        type: "Weapon",
        description:
          "Small, curved sword. Each hit inflicts little damage, but fluid chain attacks are deadly. The scimitar's sharp slashing attacks are effective against cloth and flesh, but not against metal armor or tough scales.",
      },
      {
        name: "Leather Shield",
        type: "Shield",
        description:
          "Round leather-covered shield. A standard, widely-used shield. Small shields are always less stable, but landing critical hits after parry is easier.",
      },
    ]);

    this.stats = {
      level: 3,
      vitality: 10,
      attunement: 11,
      endurance: 10,
      strength: 10,
      dexterity: 14,
      resistance: 12,
      intelligence: 11,
      faith: 8,
    };
  }
}

class Thief extends Character {
  constructor(name, sex, gift, physique) {
    super(name, sex, gift, physique);

    this.inventory.addItems([
      {
        name: "Bandit's Knife",
        type: "Weapon",
        description:
          "This wide single-edged shortsword is the favorite of lowly thieves and bandits. Primarily a slicing weapon, but highly effective when used for critical hits, such as after parrying or from behind.",
      },
      {
        name: "Target Shield",
        type: "Shield",
        description:
          "Small round metal shield. Four protrusions used to parry attacks. Small shields are always less stable, but landing critical hits after parry is easier. This shield is specialized for parrying.",
      },
    ]);

    this.stats = {
      level: 5,
      vitality: 9,
      attunement: 11,
      endurance: 9,
      strength: 9,
      dexterity: 15,
      resistance: 10,
      intelligence: 12,
      faith: 11,
    };
  }
}

class Bandit extends Character {
  constructor(name, sex, gift, physique) {
    super(name, sex, gift, physique);

    this.inventory.addItems([
      {
        name: "Battle Axe",
        type: "Weapon",
        description:
          "Standard battle axe. Inflicts regular damage, making it effective in various situations. Powerful attack due to its weight, but one wrong swing leaves the wielder wide open, so timing and proximity to the enemy must be judged carefully.",
      },
      {
        name: "Spider Shield",
        type: "Shield",
        description:
          "Shield of the savage mountain bandits. Uniquely-shaped with a large black spider etched upon it. Has resistance to poison.",
      },
    ]);

    this.stats = {
      level: 4,
      vitality: 12,
      attunement: 8,
      endurance: 14,
      strength: 14,
      dexterity: 9,
      resistance: 11,
      intelligence: 8,
      faith: 10,
    };
  }
}

class Hunter extends Character {
  constructor(name, sex, gift, physique) {
    super(name, sex, gift, physique);

    this.inventory.addItems([
      {
        name: "Shortsword",
        type: "Weapon",
        description:
          "This small straight sword is widely used, to an extent only matched by the longsword. An accessible sword which inflicts consistent regular damage and high slash damage, making it applicable to a variety of situations.",
      },
      {
        name: "Short Bow",
        type: "Ranged Weapon",
        description:
          "Small bow. Standard projectile weapon. Equip arrows to use. Hold bow and press L1 or LB to aim. Aim. for heads of humanoid foes. Press L2/R2 or LT/R/T to change type of arrows. The Short Bow is the standard bow and very useful for luring things. This bow has both a lighter weight and a faster shooting speed than a longbow.",
      },
      {
        name: "Large Leather Shield",
        type: "Shield",
        description:
          "Large, leather-covered round shield. Choice shield for hunters. Wood shields are lighter than metal shields, but with lower physical damage reductions, and reduced shield stability.",
      },
      {
        name: "Standard Arrow x30",
        type: "Ammunition",
        description: "Standard Arrow. Arrow must be equipped to be fired.",
      },
    ]);

    this.stats = {
      level: 4,
      vitality: 11,
      attunement: 9,
      endurance: 11,
      strength: 12,
      dexterity: 14,
      resistance: 11,
      intelligence: 9,
      faith: 9,
    };
  }
}

class Sorcerer extends Character {
  constructor(name, sex, gift, physique) {
    super(name, sex, gift, physique);

    this.inventory.addItems([
      {
        name: "Dagger",
        type: "Weapon",
        description:
          "This standard small dagger has only a modest attack but can be jabbed in rapid succession, and is effective in critical hits such as after a parry or when stabbing in the back. With both slash and thrust attacks this dagger is useful in various situations.",
      },
      {
        name: "Small Leather Shield",
        type: "Shield",
        description:
          "Small, leather-covered round shield, reinforced in critical spots with metal. Small shields are always less stable, but landing critical hits after parry is easier.",
      },
      {
        name: "Scorcerer's Catylist",
        type: "Catalyst",
        description:
          "Sorcery catalyst used by sorcerers of Vinheim Dragon School. Equip catalyst to use sorceries. Attune sorceries from a scroll at a bonfire. Most sorceries have limited number of uses.",
      },
      {
        name: "Soul Arrow",
        type: "Spell",
        description:
          "Elementary sorcery. Fire a soul arrow. Soul arrows inflict magic damage, making them effective against iron armor, tough scales, and other physically resilient materials.",
      },
    ]);

    this.stats = {
      level: 3,
      vitality: 8,
      attunement: 15,
      endurance: 8,
      strength: 9,
      dexterity: 11,
      resistance: 8,
      intelligence: 15,
      faith: 8,
    };
  }
}

class Pyromancer extends Character {
  constructor(name, sex, gift, physique) {
    super(name, sex, gift, physique);

    this.inventory.addItems([
      {
        name: "Hand Axe",
        type: "Weapon",
        description:
          "Small hand axe. Appears identical to a lumberjack's tool, but has an ideal weight and strength, and is easy to handle. One wrong swing leaves the wielder wide open, so timing and proximity to the enemy must be judged carefully.",
      },
      {
        name: "Cracked Round Shield",
        type: "Shield",
        description:
          "Round wooden shield. Cracked and nearly broken. Wood shields are lighter than metal shields, but this one has lower physical damage reduction stability, partly due to cracking.",
      },
      {
        name: "Pyromancy Flame",
        type: "Catalyst",
        description:
          "Flame medium used by Great Swamp pyromancers. Pyromancers arouse this flame to produce various fire arts. Equip pyromancer flame to produce pyromancy. Attune pyromancies from a scroll at bonfire. Most pyromancies have limited number of uses.",
      },
      {
        name: "Fireball",
        type: "Pyromancy",
        description:
          "Standard pyromancy of the Great Swamp. Hurl fireball. The fire damage caused by fireballs makes them effective against corporeal beasts and Undead, who by nature fear flame.",
      },
    ]);

    this.stats = {
      level: 1,
      vitality: 10,
      attunement: 12,
      endurance: 11,
      strength: 12,
      dexterity: 9,
      resistance: 12,
      intelligence: 10,
      faith: 8,
    };
  }
}

class Cleric extends Character {
  constructor(name, sex, gift, physique) {
    super(name, sex, gift, physique);

    this.inventory.addItems([
      {
        name: "Mace",
        type: "Weapon",
        description:
          "Iron hammer with a protrusive pommel. This simple bladeless strike weapon is effective against most foes, and can break the guard of a shield. However, one miss leaves one wide open.",
      },
      {
        name: "East-West Shield",
        type: "Shield",
        description:
          "A wooden kite shaped shield. It is decorated with the ancient symbol of a double-headed eagle, painted yellow. Wooden shields are lighter than metal shields, but with lower physical damage reduction, and reduced shield stability.",
      },
      {
        name: "Canvas Talisman",
        type: "Talisman",
        description:
          "Medium for casting miracles of the Gods. Canvas Talisman is for clerics on a pilgrimage. Equip talisman to cast miracles. Attune miracles from a scroll at a bonfire. Most miracles have limited number of uses.",
      },
      {
        name: "Heal",
        type: "Miracle",
        description:
          "Elementary miracle cast by clerics. Restores HP. To cast a miracle, the caster learns a tale of the Gods, and says a prayer to be blessed by its revelations. Heal is the shortest of such miraculous tales.",
      },
    ]);

    this.stats = {
      level: 2,
      vitality: 11,
      attunement: 11,
      endurance: 9,
      strength: 12,
      dexterity: 8,
      resistance: 11,
      intelligence: 8,
      faith: 14,
    };
  }
}

class Deprived extends Character {
  constructor(name, sex, gift, physique) {
    super(name, sex, gift, physique);

    this.inventory.addItems([
      {
        name: "Club",
        type: "Weapon",
        description:
          "A simple wooden club. This simple bladeless strike weapon is effective against most foes, is easily handled, and can break the guard of a shield. However, a single miss makes one wide open, so timing and proximities are crucial.",
      },
      {
        name: "Plank Shield",
        type: "Shield",
        description:
          "Makeshift shield built from wood planks. Provides minimal protection, but at a cost of moderate humiliation.",
      },
    ]);

    this.stats = {
      level: 6,
      vitality: 11,
      attunement: 11,
      endurance: 11,
      type: "",
      strength: 11,
      dexterity: 11,
      resistance: 11,
      intelligence: 11,
      faith: 11,
    };
  }
}

/**
 * Tests
 */

// const warrior = new Warrior("Q", "Male", "Twin Humanities", "Thin");

// console.log(warrior.level);
// // Initial stats, unique to Warrior class:
// // {
// //     level: 4,
// //     vitality: 11,
// //     attunement: 8,
// //     endurance: 12,
// //     strength: 13,
// //     dexterity: 13,
// //     resistance: 11,
// //     intelligence: 9,
// //     faith: 9
// // }

// // We only need to update the stats that are necessary
// const newWarriorStats = {
//   level: 10,
// };

// // Setter, not obvious that this is a function, therefore
// // hiding implementation details from the consumer
// warrior.stats = newWarriorStats;

// console.log(warrior.stats);
// // Updated stats, only level has changed:
// // {
// //     level: 10,
// //     vitality: 11,
// //     attunement: 8,
// //     endurance: 12,
// //     strength: 13,
// //     dexterity: 13,
// //     resistance: 11,
// //     intelligence: 9,
// //     faith: 9
// // }

// const knight = new Knight("Q", "Male", "Twin Humanities", "Thin");

// console.log(knight.stats);
// // Initial stats, unique to Knight:
// // {
// //     level: 5,
// //     vitality: 14,
// //     attunement: 10,
// //     endurance: 10,
// //     strength: 11,
// //     dexterity: 11,
// //     resistance: 10,
// //     intelligence: 9,
// //     faith: 11
// // }

// // We only need to update the stats that are necessary
// const newKnightStats = {
//   level: 9,
// };

// // Setter, not obvious that this is a function, therefore
// // hiding implementation details from the consumer
// knight.stats = newKnightStats;

// console.log(knight.stats);
// // Updated stats, only level has changed:
// // {
// //     level: 9,
// //     vitality: 14,
// //     attunement: 10,
// //     endurance: 10,
// //     strength: 11,
// //     dexterity: 11,
// //     resistance: 10,
// //     intelligence: 9,
// //     faith: 11
// // }
