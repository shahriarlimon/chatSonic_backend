const app = require('./app');
const colors = require('colors');
const connectDatabase = require("./db/connectDb");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log("shutting down the server for handling uncaught exception");
})

// config 
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config()
}

/* CONNECT TO DB */
connectDatabase()

// create server 
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`.bgCyan
    .white
)
})

// unhandles promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`.bgRed.white)
    console.log('Shutting down the server for unhandles promise rejection')
    server.close(() => {
        process.exit(1)
    })
})