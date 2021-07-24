# Parking Lot Problem

[![GitHub license](https://img.shields.io/github/license/PurnomoMr/parking_lot?logo=github)](https://github.com/PurnomoMr/parking_lot/tree/master/LICENSE) [![GitHub last commit](https://img.shields.io/github/license/PurnomoMr/parking_lot?logo=github)](https://github.com/PurnomoMr/parking_lot/) 

## About Problem

To **design a parking lot system** with ability to find:

- Registration numbers of all cars of a particular colour.

- Accumulated charge when leave parking.

## Pre requisites

[![GitHub top language](https://img.shields.io/github/languages/top/PurnomoMr/parking_lot?label=NodeJS&logo=Node.js)](https://github.com/PurnomoMr/parking_lot/) 

The source code for this project is written using [Node.js](https://nodejs.org/). Make sure you have [Node.js](https://nodejs.org/) installed on your computer before running this application, **if not please install Node.js from [here](https://nodejs.org/en/download/)**.

To check if you have Node.js and NPM installed by running simple commands to see what version of each is installed:

 - **Test Node.js**: To see if Node is installed, type `node -v` in Terminal. This should print the version number so you’ll see something like this `v10.16.0`.

 - **Test NPM**. To see if NPM is installed, type `npm -v` in Terminal. This should print the version number so you’ll see something like this `6.9.0`.

> **Note:** [Node installer](https://nodejs.org/en/download/) installs both Node.js and npm on your system.

## How to run?

This is a console application written in `Node.js`. This can be run in two modes:

### Using Docker
If you want to run this program in docker, please following commands:
```bash
1. Open terminal and navigate (`cd`) to this folder
2. `.\docker-compose.sh` and wait until process finish
3. `docker ps -a` for make sure status images docker is running.
4. `docker exec -it --user=root parking_lot bin/sh` for running container.
5. navigate (`cd`) to this folder and do step below.
```

1. **Interactive Mode**: An interactive terminal based shell where commands can be typed in to perform different actions.

2. **File Mode**: It accepts a filename as a parameter at the terminal and read the commands from that file.

### Quick Start

**Proceed to the steps below only if you've `Node.js` installed.** If not, please refer [pre requisites](#pre-requisites) section.

#### For Interactive Mode

Open terminal and navigate (`cd`) to this folder and type the following commands:

```bash
1. npm install
2. npm start
```

#### For File Mode

Open terminal and type `node src/index.js functional_spec/fixtures/file_input.txt`.

```terminal
node src/index.js <path_to_file.txt>
```

**Note**: You can find a few sample input files inside `functional_spec/fixtures/` folder.

#### Explained

**STEP 1**: `npm install` or `npm i` will download all the dependencies defined in `package.json` file and generate a `node_modules/` folder with the installed modules. Learn more [here](https://docs.npmjs.com/cli/install).

**STEP 2**: `npm start` or `npm run start` will start the application. It is equivalent to `node src/index.js`

## List of User Commands

Users can interact with the Parking Lot system via a following simple set of commands which produce a specific output:

- **create_parking_lot**: `create_parking_lot 6` will create a parking lot with 6 slots.

- **park < REGISTRATION NUMBER > < COLOR >**: `park KA-01-HH-1234 White` will allocate the nearest slot from entry gate.

- **leave**: `leave KA-01-HH-1234 4` will make slots from car number KA-01-HH-1234 free and calculate charge

- **status**: `status` will display cars and their slot details

```bash
Slot No.  Registration No Color
1         KA-01-HH-1234  White
2         KA-01-HH-9999  Red
3         KA-01-BB-0001  White
5         KA-01-HH-2701  Black
6         KA-01-HH-3141  Black
```

## Test Scripts

Tests are written using [Mocha](https://mochajs.org/) and can be run using `npm test`

- `npm test` : Run all tests (lint tests + unit tests + system tests)

#### Unit tests

Unit tests are written for the methods of `parking` class.

#### System tests

System tests mainly include repository structure tests. It tests for the following:

Repository must contain:

- `package.json`
- `README.md`
- `.gitignore`
- `.eslintrc`
- `.env`
- `bin/` folder
- `functional_spec/` folder
- `app/` folder
- `config/` folder

`package.json`

`.gitignore` must contain `node_modules`, `config`, `functional_spec/fixtures/*` folders.
