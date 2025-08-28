import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from '@nestjs/typeorm';
import { seedDatabase } from './seed/seed-data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', // libera só seu Angular
    methods: 'GET,POST,PUT,DELETE', // quais métodos pode usar
    allowedHeaders: 'Content-Type, Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  await app.listen(process.env.PORT ?? 3000);

  // Executar seed do banco de dados
  try {
    const dataSource = app.get(DataSource);
    await seedDatabase(dataSource);
  } catch (error) {
    console.log('⚠️ Erro ao executar seed:', error.message);
  }

  console.log('🚀 Backend Essenza rodando na porta 3000');
  console.log('📊 Banco de dados configurado e populado');
  console.log('🔗 Frontend pode acessar: http://localhost:4200');
}
bootstrap();