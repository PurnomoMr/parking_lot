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
            } else {
                throw new Error('Sorry, the Parking lot is Full.')
            }
        } else {
            throw new Error('Minimum create parking should be one slot.')
        }
    }

    nearestAvailableSlots () {
        let nearestSlots = Object.keys(this.Slots).find(key => this.Slots[key] == null ? key : 0 )
        if(!nearestSlots) {
            return false
        }
        return true
    }

    leaveParkingCar (input) {
    	if (this.MAXS_SLOTS > 0) {
			let index = parseInt(input.split(' ')[2] - 1);
			if (index >= this.MAXS_SLOTS) {
				throw new Error(`Slot number ${index + 1} is not found`);
			} else if (this.Slots[index] === null) {
				throw new Error(`Slot number ${index + 1} is already free`);
			} else if (index > -1 && index <= this.Slots.length) {
			    this.Slots[index] = null;
			    index = index + 1;
			    return index;
			}
		} else {
			throw new Error('Sorry, parking lot is empty');
		}
	}
}

module.exports = Parking