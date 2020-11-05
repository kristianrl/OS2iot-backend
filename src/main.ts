import { Logger } from "@nestjs/common";
import * as fs from "fs";
import * as express from "express";
import * as http from "http";
import * as https from "https";
import * as dotenv from "dotenv";

import { setupNestJs } from "@loaders/nestjs";
import { setupSwagger } from "@loaders/swagger";

async function bootstrap() {
    Logger.log("before env load")
    // Load .env file as environment before startup.
    dotenv.config({ path: "../.env", debug: true });
    Logger.log("after env load")

    const config = {
        NEST_PORT: 3000,
        API_PREFIX: "/api",
        CURRENT_VERSION_PREFIX: "/api" + "/v1",
        SWAGGER_PREFIX: "/api" + "/v1" + "/docs",
    };
    const server = express();

    const app = await setupNestJs(config, server);
    setupSwagger(app, config.SWAGGER_PREFIX);

    // The .listen call must happen after swagger is setup.
    // await app.listen(config.NEST_PORT);
    await app.init();
    const httpServer = http.createServer(server).listen(3000);
    try {
        const httpsOptions = {
            key: fs.readFileSync("../secrets/private.key"),
            cert: fs.readFileSync("../secrets/publiccert.crt"),
        };
        https.createServer(httpsOptions, server).listen(8443);    
    } catch (err) {
        Logger.log("Could not setup https, skipping.")
    }

    //const url = await httpServer.;
    // Logger.log(`Swagger on: ${url}${config.SWAGGER_PREFIX}`);
    // Logger.log(`Application started on: ${url}${config.CURRENT_VERSION_PREFIX}`);
}
void bootstrap();
