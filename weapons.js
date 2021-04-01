/**
 * @property {multiplier} multiplied by damage of attack type
 */

class Weapon {
  constructor(name, multiplier, description) {
    this.name = name;
    this.multiplier = multiplier;
    this.description = description;
  }
}

class Shield {
  constructor(name, multiplier, description) {
    this.name = name;
    this.multiplier = multiplier;
    this.description = description;
  }
}

const longsword = new Weapon(
  "Longsword",
  1.1,
  "Widely-used standard straight sword, only matched in ubiquity by the shortsword."
);

const broadsword = new Weapon(
  "Broadsword",
  1.3,
  "A straight sword with a broad blade designed for slashing."
);

const heaterShield = new Shield(
  "heater Shield",
  1,
  "Small metal shield. A standard, widely-used shield. This shield is easy to use, and is one of the smallest shields that offers 100% physical damage reduction."
);

export { longsword, heaterShield, broadsword };
