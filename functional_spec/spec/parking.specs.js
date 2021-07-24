const chai = require('chai')
const fs = require('fs')
const Parking = require('../../app/modules/parking.js')

var inputCommands = []
var slots
var parkingLot = new Parking()


describe('Test for read input data',  () => {
    it('reading txt file', (done) => {
        fs.readFile('./functional_spec/fixtures/file_input.txt', 'utf-8', (err, data) => {
            if(err) {
                throw 'Unable to read input test file txt'
            }
            inputCommands = JSON.parse(JSON.stringify(data)).split('\n')
            done()
        })
    })

    it('checking input Commands', (done) => {
        const assert = chai.assert
        assert.equal(inputCommands[0].split(' ')[0], 'create_parking_lot')
        assert.equal(inputCommands[2].split(' ')[0], 'park')
        assert.equal(inputCommands[7].split(' ')[0], 'leave')
        assert.equal(inputCommands[8], 'status')
        done()
    })
})

describe('Testing Functions in Parking class',  () => {
    const assert = chai.assert
    it('Creating a Parking lot with 6 slots', (done) => {
        slots = parkingLot.createParking(inputCommands[0])
        assert.equal(slots, 6)
        done()
    })

    it('Allocated slot number: 1', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[1])
        assert.equal(result, 1, 'The numbers slots are equal')
        done()
    })
    
    it('Allocated slot number: 2', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[2])
        assert.equal(result, 2, 'The numbers slots are equal')
        done()
    })
    
    it('Allocated slot number: 3', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[3])
        assert.equal(result, 3, 'The numbers slots are equal')
        done()
    })
    
    it('Allocated slot number: 4', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[4])
        assert.equal(result, 4, 'The numbers slots are equal')
        done()
    })
    
    it('Allocated slot number: 5', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[5])
        assert.equal(result, 5, 'The numbers slots are equal')
        done()
    })
    
    it('Allocated slot number: 6', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[6])
        assert.equal(result, 6, 'The numbers slots are equal')
        done()
    })

    it('Registration number KA-01-HH-3141 with Slot Number 6 is free with Charge 30', (done) => {
        let result = parkingLot.leaveParkingCar(inputCommands[7])
        assert.equal(result.number, "KA-01-HH-3141")
        assert.equal(result.slots, 6)
        assert.equal(result.charge,30)
        done()
    })
    
    it('Checking Parking status', (done) => {
        let result = parkingLot.getParkingStatus()
        assert.equal(result.length, 6)
        done()
    })

    it('Allocated slot number: 6', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[11])
        assert.equal(result, 6, 'The numbers slots are equal')
        done()
    })

    it('Registration number KA-01-BB-0001 with Slot Number 3 is free with Charge 50', (done) => {
        let result = parkingLot.leaveParkingCar(inputCommands[12])
        assert.equal(result.number, "KA-01-BB-0001")
        assert.equal(result.slots, 3)
        assert.equal(result.charge, 50)
        done()
    })
  
})