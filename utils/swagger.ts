import { Request, Response, NextFunction, Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "student management docs",
            version:"1.0"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'jwt'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]

    },
    apis: ["./routes/user.ts", "./routes/task.ts"]
}

const swaggerSpec = swaggerJSDoc(options);

function swaggersDocs(app: Express, port: number) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Corrected the parentheses placement here
    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

export default swaggersDocs;
