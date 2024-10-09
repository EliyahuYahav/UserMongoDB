import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: '3.0.0',
    info:{
        title : "College swagger",
        version: '1.0.0',
        description: 'show all the api request of the collage'
    },
    server: [
        {
            url : 'http://localhost:3000'
        }
    ]
}

const options = {
    swaggerDefinition,
    apis: ['./routes/*js', './server.js']
}

export const swaggerSpec = swaggerJSDoc(options);