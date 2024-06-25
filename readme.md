app.get("/message/:id/:user", (request, response) => {
    const { id, user } = request.params

    response.send(`id: ${id}. usuário: ${user}.`)
})