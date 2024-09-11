require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")

const express = require('express')
const routes = require("./routes")

// configurando a aplicação
const app = express()
app.use(express.json())

// habilitar rotas
app.use(routes)

// para executar o banco de dados
migrationsRun() 

// lidando com erros da aplicação e retornando uma mensagem
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