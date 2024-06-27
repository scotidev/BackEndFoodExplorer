const express = require('express')

const app = express()
// para que a aplicação possa lidar com dados .json
app.use(express.json())

// enable routes
const routes = require("./routes")
app.use(routes)

//porta do servidor
const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))