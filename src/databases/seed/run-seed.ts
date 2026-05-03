import { NestFactory } from "@nestjs/core";
import { SeedModule } from "./seed.module";
import { SeedService } from "./seed.service";


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  const seedService = app.get(SeedService);
  try {
    await seedService.runSeed();
  } catch (error) {
    console.error('Error ejecutando el seed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();