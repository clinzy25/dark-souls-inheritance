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

export default class State {
  constructor(
    level = "Undead Asylum",
    positionX = 0,
    positionY = 0,
    souls = 0,
    lastBonfire = undefined,
    inventory = new Inventory()
  ) {
    this.level = level;
    this.positionX = positionX;
    this.positionY = positionY;
    this.souls = souls;
    this.lastBonfire = lastBonfire;
    this.inventory = inventory;
  }
  updateLevel(newLevel) {
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
