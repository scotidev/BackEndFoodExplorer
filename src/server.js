const express = require('express')

const app = express()

const PORT = 3333

// método get, acesse usando localhost:3333/message
app.get("/message/:id", (request, response) => {
    response.send('Hello')
})

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))