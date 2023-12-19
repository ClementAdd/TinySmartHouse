import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
    );

    const viewsDir = join(__dirname, '..', '..', 'views');

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(viewsDir);
    app.setViewEngine('hbs');

    await app.listen(3000);
}

bootstrap();
