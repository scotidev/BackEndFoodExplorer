const express = require('express')

const app = express()

// para que a aplicação possa lidar com dados .json
app.use(express.json())


// método get, acesse usando localhost:3333/message
app.post("/users", (request, response) => {
    const { name, email, password } = request.body

    response.json({name, email, password})
} ) 


const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))