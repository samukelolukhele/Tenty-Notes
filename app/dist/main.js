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
    const host = '0.0.0.0';
    const port = process.env.PORT || 8082;
    await app.listen(port, host, () => console.log(`Server running on localhost:${port}`));
}
exports.default = bootstrap;
bootstrap();
//# sourceMappingURL=main.js.map