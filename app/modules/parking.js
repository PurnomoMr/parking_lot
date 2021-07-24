"use strict"

class Parking {
    constructor () {
        this.MAXS_SLOTS = 0
        this.Slots = []
    }

    /**
     * 
     * @param {String} input 
     * @returns {Number} MAX Slots if start command with `create_parking_lot`and total number lots
     */
    createParking (input) {
        this.MAXS_SLOTS = parseInt(input.split(' ')[1])
		if (this.MAXS_SLOTS <= 0 || isNaN(this.MAXS_SLOTS)) {
			// minimum: 1 slot
			throw new Error('Minimum 1 slot is required to create parking slot')
		}
        for (let i = 0; i < this.MAXS_SLOTS; i++) {
            this.Slots.push(null)
        }
        return this.MAXS_SLOTS
    }

    /**
     * 
     * @param {String} input 
     * @returns {Number} key if carNumber & carColos has value
     */
    setParkingCar (input) {
        if(this.MAXS_SLOTS > 0) {
            let car, carNumber, carColor
            if(this.nearestAvailableSlots(this.Slots) == true) {
                for (let key = 0; key < this.Slots.length; key++) {
                    if(this.Slots[key] == null) {
                        carNumber = String(input.split(" ")[1])
                        carColor =String(input.split(" ")[2])
                        if(carNumber && carColor) {
                            car = {
                                "number":carNumber, 
                                "color":carColor
                            }
                            this.Slots[key] = car
                            key++
                            return key
                        } else {
                            throw new Error('Please provide registration number and color for Parking your car.')
                        }
                    }
                }
            } else {
                throw new Error('Sorry, Parking lot is Full.')
            }
        } else {
            throw new Error('Minimum create parking should be one slot.')
        }
    }

    /**
     * 
     * @description return nearest available slot
     * @returns {Boolean} this.Slots if still have null value.
     * 
     */
    nearestAvailableSlots () {
        let nearestSlots = Object.keys(this.Slots).find(key => this.Slots[key] == null ? key : 0 )
        if(!nearestSlots) {
            return false
        }
        return true
    }

    /**
     * 
     * @param {Number} input 
     * @returns {String} information slots with cost charge for leave parking if carNumber exist
     */
    leaveParkingCar (input) {
    	if (this.MAXS_SLOTS > 0) {
			let carNumber = input.split(' ')[1]
			let hours = parseInt(input.split(' ')[2])
            let isMatchNumber = false
            let slotNumber = 0
            this.Slots.forEach( 
                (val, key) => {
                    if(val != null && val.number == carNumber) {
                        this.Slots[key] = null
                        slotNumber = key + 1
                        isMatchNumber = true
                    }
                }
            )

            if(!isMatchNumber) {
                throw new Error('Registration number '+ carNumber +' not found.')
            }

            let charge = this.countCharge(hours)
            let result = {
                "number": carNumber,
                "slots": slotNumber,
                "charge": charge
            }
            return result
		} else {
			throw new Error('Sorry, parking lot is empty')
		}
	}

    /**
     * 
     * @param {Number} hours 
     * @returns {Number} accumulated charge with hours
     */
    countCharge (hours) {
        if(isNaN(hours) || hours <= 0) {
            throw new Error('Sorry, minimum one hour for leave parking.')
        }
        let minCharge = 10
        return hours - 2 > 0 ? (hours - 2 ) * minCharge + minCharge : minCharge
    }

    /**
     * 
     * @returns {Array} All list parking slots have been taken
     */
    getParkingStatus () {
    	let listParking = []
    	if (this.MAXS_SLOTS > 0) {
			listParking.push('Slot No. Registration No. Color ')

            //search slots by key
            this.Slots.forEach(
                (val, key) => {
                    if(this.Slots[key] != null) {
                        let number = key + 1
                        listParking.push(number + '.  ' + this.Slots[key].number + '  ' + this.Slots[key].color)
                    }
                }
            )

        	return listParking
		} else {
			throw new Error('Sorry, parking lot is empty')
		}
	}
}

module.exports = Parking