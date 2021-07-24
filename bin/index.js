'use strict'

const fs = require('fs'),
    chalk = require('chalk'),
	readLine = require('readline'); 

var	commandLineInputs = process.argv, // processing command line inputs
    interactiveMode = false;

/**
 * @description load the parking class
 */
var Parking = require('../app/modules/parking.js'),
	Parking = new Parking();

// to avoid memory leaks errors, default max listeners = 10
require('events').EventEmitter.defaultMaxListeners = 0;

if (commandLineInputs[commandLineInputs.length - 1].endsWith('.txt')) {
    interactiveMode = false;
    fs.readFile(commandLineInputs[2], 'utf-8', (err, data) => {
        if (err) {
            console.log('Error in reading file');
        }
        var inputCommands = data.split('\n');
		for (let key = 0; key < inputCommands.length; key++) {
			processUserCommands(inputCommands[key]);
        }

        // returning to console once all the inputs are processed
        process.exit(1);
    });
} else {
    interactiveMode = true;
    openInteractiveConsole();
}

/**
 * @description called when users want to interact via console
 * it process one command at a time
 */
function openInteractiveConsole () {

    var prompts = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    // option for user to enter commands
    if (interactiveMode) {
        prompts.question('Input: ', async (data) => {
            processUserCommands(data);
        });
    }
}

/**
 *
 * @param {String} input entered via console
 * @description driver function for different commands for entered by users
 * calls respective functions of Parking class based on commands
 */
function processUserCommands (input) {
	var userCommand = input.split(' ')[0],
		totalParkingSlots,
		parkingSlotNumber,
		parkingSlotNumbers;
    switch (userCommand) {
        case 'create_parking_lot':
            try {
                totalParkingSlots = Parking.createParking(input);
                console.log(chalk.yellow.bold('Created a parking lot with ' + totalParkingSlots + ' slots.'));
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }

            break;
        case 'park':
            try {
                parkingSlotNumber = Parking.setParkingCar(input);
                console.log(chalk.green('Allocated slot number: ' + parkingSlotNumber));
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }
            break;
        case 'leave':
            try {
                parkingSlotNumber = Parking.leaveParkingCar(input);
                console.log(chalk.white('Registration number ' + parkingSlotNumber.number + ' with Slot Number ' + parkingSlotNumber.slots + ' is free with Charge ' + parkingSlotNumber.charge));
            }
            catch (err) {
                console.log(chalk.red(err.message)); // handling exceptions
            }
            break;
        case 'status':
            try {
                var parkingSlotStatus = Parking.getParkingStatus();
                if (parkingSlotStatus.length > 1) {
                    console.log(parkingSlotStatus.join('\n'));
                }
                else {
                    console.log(chalk.yellow('Sorry, parking lot is empty')); // what if it's empty
                }
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }
            break;
        case 'exit':
			process.exit(0);
			break;
        default:
            console.log(chalk.red.bold(input, 'is an invalid command'));
            break;
    }
    openInteractiveConsole();
}
