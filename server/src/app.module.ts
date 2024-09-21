import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KimerasModule } from './modules/kimeras.module'; // KimerasModuleをインポート

@Module({
  imports: [
    TypeOrmModule.forRoot(), // TypeORMの設定をここに追加
    KimerasModule, // KimerasModuleをインポート
  ],
})
export class AppModule {}
