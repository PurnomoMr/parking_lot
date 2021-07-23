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
})