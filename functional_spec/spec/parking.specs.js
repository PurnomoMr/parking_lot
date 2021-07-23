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
    it('Creating a Parking lot', (done) => {
        slots = parkingLot.createParking(inputCommands[0])
        assert.equal(slots, 6)
        done()
    })

    it('Set Location Parking to car 1', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[1])
        assert.equal(result, 1, 'The numbers slots are equal')
        done()
    })
    
    it('Set Location Parking to car 2', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[2])
        assert.equal(result, 2, 'The numbers slots are equal')
        done()
    })
    
    it('Set Location Parking to car 3', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[3])
        assert.equal(result, 3, 'The numbers slots are equal')
        done()
    })
    
    it('Set Location Parking to car 4', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[4])
        assert.equal(result, 4, 'The numbers slots are equal')
        done()
    })
    
    it('Set Location Parking to car 5', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[5])
        assert.equal(result, 5, 'The numbers slots are equal')
        done()
    })
    
    it('Set Location Parking to car 6', (done) => {
        let result = parkingLot.setParkingCar(inputCommands[6])
        assert.equal(result, 6, 'The numbers slots are equal')
        done()
    })

    it('Leave Location Parking from slot 4', (done) => {
        let result = parkingLot.leaveParkingCar(inputCommands[7])
        assert.equal(result, 4, 'The numbers slot 4 is Free.')
        done()
    })
})