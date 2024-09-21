import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kimera } from '../entity/Kimera';

@Injectable()
export class KimerasService {
  constructor(
    @InjectRepository(Kimera)
    private readonly kimeraRepository: Repository<Kimera>,
  ) {}

  // 全てのkimerasを取得
  findAll(): Promise<Kimera[]> {
    return this.kimeraRepository.find();
  }
}
