# workoutbuddyserver
## Description
    This is the server side of my workout buddy application. The backend of this application used a database, PostgreSQL to house the data for the models created within Node.js. I used node packages such as express and sequelize to map the data being accepted to the database and make it clear how to organize the data. Database associations were used between models to connect the datatables within the postgres database. Within each database association in the Db.js file their was more logic to be implemented within the controllers for them to be accurate. You have to include each database association on a specific router endpoint that needs it for the posgres database to gather the correct data that coorelates to two different sets of data. 

## Testing
    Use postman collections to test endpoints within the server controllers and made sure data is being posted correctly and accurately. 

## Installation

    Use the package manager [node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install dependencies 

    ```
    npm init # this will set up the package.json file that holds and reads the new dependencies
    npm update 
    ```
    I first ran npm init to create a package.json and access the node_modules. Then I installed these specific packages Express, Sequelize, pg, Jsonwebtoken, Bcrypt, Dotenv, and nodemon to allow for connection to the database, sessionValidation, and token authorization. To run the server type "nodemon" into the terminal.  

## Usage 
    ```
    const Express = require('express');#import express to use it in the app file 
    const app = Express(); #This line shows an instance of Express that let us use express methods in the app file  
    const router = require('express').Router(); #used at the top of controller files to connect express methods 
    ```