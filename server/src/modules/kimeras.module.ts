import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KimerasService } from '../services/kimeras.service';
import { KimerasController } from '../controllers/kimeras.controller';
import { Kimera } from '../entities/kimera.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Kimera]), // Kimeraエンティティに対するリポジトリ
  ],
  providers: [KimerasService],
  controllers: [KimerasController],
})
export class KimerasModule {}
