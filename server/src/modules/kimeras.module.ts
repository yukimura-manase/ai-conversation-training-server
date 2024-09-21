import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KimerasService } from '../services/kimeras.service';
import { KimerasController } from '../controllers/kimeras.controller';
import { Kimera } from '../entity/Kimera';

@Module({
  imports: [
    TypeOrmModule.forFeature([Kimera]), // Kimeraエンティティに対するリポジトリ
  ],
  providers: [KimerasService],
  controllers: [KimerasController],
})
export class KimerasModule {}
