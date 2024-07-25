function verifyAdmin(request, response, next) {
    if (!request.body.isAdmin) {
        return response.json({message: "Usuário não autorizado."})
    }

    return next()
}