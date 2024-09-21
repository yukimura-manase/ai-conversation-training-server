import { Module } from '@nestjs/common';
import { KimerasController } from './controllers/kimeras.controller';
import { KimerasService } from './services/kimeras.service';

@Module({
  imports: [],
  controllers: [KimerasController],
  providers: [KimerasService],
})
export class AppModule {}
