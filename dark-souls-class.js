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
    constructor(name, sex, gift, physique, stats = {}, inventory = new Inventory()) {
        this.name = name;
        this.sex = sex;
        this.gift = gift;
        this.physique = physique;
        this.inventory = inventory;
        this._stats = stats;
    }

    /**
     * Setter for updating this._stats, which is accessible through Character.stats
     * @param {object} newStats
     */
    set stats(newStats) {
        if (Object.keys(newStats).length < 1) {
            throw new Error('Please specify at least 1 stat');
        } else if (!Object.values(newStats).every(stat => typeof stat === 'number')) {
            throw new Error('All stat values must be type number');
        }

        for (let key in newStats) {
            this[key] = newStats[key]; // sets each stat on the character individually
        }

        // We need to access _stats with an underscore
        // to prevent an infinite loop
        this._stats = {
            ...this._stats, // any existing keys of newStats that exist in this._stats will be overwritten
            ...newStats,   // docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        };
    }

    /**
     * Getter for accessing this._stats
     * @returns {*}
     */
    get stats() {
        return this._stats;
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

const warrior = new Warrior('Q', 'Male', 'Twin Humanities', 'Thin');

console.log(warrior.level);
// Initial stats, unique to Warrior class:
// {
//     level: 4,
//     vitality: 11,
//     attunement: 8,
//     endurance: 12,
//     strength: 13,
//     dexterity: 13,
//     resistance: 11,
//     intelligence: 9,
//     faith: 9
// }

// We only need to update the stats that are necessary
const newWarriorStats = {
    level: 10,
}

// Setter, not obvious that this is a function, therefore
// hiding implementation details from the consumer
warrior.stats = newWarriorStats;

console.log(warrior.stats);
// Updated stats, only level has changed:
// {
//     level: 10,
//     vitality: 11,
//     attunement: 8,
//     endurance: 12,
//     strength: 13,
//     dexterity: 13,
//     resistance: 11,
//     intelligence: 9,
//     faith: 9
// }

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

const knight = new Knight('Q', 'Male', 'Twin Humanities', 'Thin');

console.log(knight.stats);
// Initial stats, unique to Knight:
// {
//     level: 5,
//     vitality: 14,
//     attunement: 10,
//     endurance: 10,
//     strength: 11,
//     dexterity: 11,
//     resistance: 10,
//     intelligence: 9,
//     faith: 11
// }

// We only need to update the stats that are necessary
const newKnightStats = {
    level: 9,
}

// Setter, not obvious that this is a function, therefore
// hiding implementation details from the consumer
knight.stats = newKnightStats;

console.log(knight.stats);
// Updated stats, only level has changed:
// {
//     level: 9,
//     vitality: 14,
//     attunement: 10,
//     endurance: 10,
//     strength: 11,
//     dexterity: 11,
//     resistance: 10,
//     intelligence: 9,
//     faith: 11
// }