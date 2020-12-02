class ProductNotFoundException extends Error {
    constructor(message) {
      super(message)
    }
}

module.exports = {
    ProductNotFoundException
}