require("express-async-errors")

const database = require("./database/sqlite")
database()

const AppError = require("./utils/AppError")
const express = require('express')

const app = express()
// para que a aplicação possa lidar com dados .json
app.use(express.json())

// enable routes
const routes = require("./routes")
app.use(routes)

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

//porta do servidor
const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))