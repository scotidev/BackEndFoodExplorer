class ProductsController {
    async create(request, response) {
        const { title, prince, description, category, ingredients} = request.body

    }

    async show(request, response) {
        const { id } = request.params
    }

    async delete(request, response) {
        const { id } = request.params
    }

    async index(request, response) {
        const { filter } = request.query
    }
}

module.exports = ProductsController