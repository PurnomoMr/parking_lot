"use strict"

class Parking {
    constructor () {
        this.MAXS_SLOTS = 0
        this.Slots = new Array()
    }

    createParking (input) {
        this.MAXS_SLOTS = parseInt(input.split(' ')[1]);
		if (this.MAXS_SLOTS <= 0) {
			// minimum: 1 slot
			throw new Error('Minimum one slot is required to create parking slot');
		}
        for (let i = 0; i < this.MAXS_SLOTS; i++) {
            this.Slots.push(null);
        }
        return this.MAXS_SLOTS;
    }
}

module.exports = Parking