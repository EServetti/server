import __dirname from "../../utils.js"

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Everithing for your home",
            description: "The API documentation"
        }
    },
    apis: [__dirname+"/src/docs/*.yaml"]
}

export default swaggerOptions