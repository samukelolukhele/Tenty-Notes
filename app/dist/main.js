"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
    });
    await app.listen(process.env.PORT || 8080);
}
exports.default = bootstrap;
bootstrap();
//# sourceMappingURL=main.js.map