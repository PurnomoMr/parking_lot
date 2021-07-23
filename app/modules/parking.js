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

    setParkingCar (input) {
        if(this.MAXS_SLOTS > 0) {
            let car, carNumber, carColor
            if(this.nearestAvailableSlots(this.Slots) == true) {
                for (let key = 0; key < this.Slots.length; key++) {
                    if(this.Slots[key] == null) {
                        carNumber = input.split(" ")[1]
                        carColor = input.split(" ")[2]
                        if(carNumber && carColor) {
                            car = {carNumber, carColor}
                            this.Slots[key] = car
                            key++
                            return key
                        } else {
                            throw new Error('Please provide registration number and color for Parking your car.')
                        }
                    }
                }
            }
        }
    }

    nearestAvailableSlots () {
        let nearestSlots = Object.keys(this.Slots).find(key => this.Slots[key] == null ? key : 0 )
        if(!nearestSlots) {
            return false
        }
        return true
    }
}

module.exports = Parking