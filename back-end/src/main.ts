import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const options_api = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 200,
        credentials: true,
        allowedHeaders: 'Content-Type, Accept, Authorization',
    };
    app.enableCors(options_api);

    const options = new DocumentBuilder()
        .setTitle('UsuImóveis')
        .setDescription('mini classificado de imóveis')
        .setVersion('1.0')
        .addTag('imoveis')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
