import { Controller, Get } from '@nestjs/common';
import { KimerasService } from '../services/kimeras.service';
import { Kimera } from '../entity/Kimera';

@Controller('kimeras')
export class KimerasController {
  constructor(private readonly kimerasService: KimerasService) {}

  @Get()
  findAll(): Promise<Kimera[]> {
    return this.kimerasService.findAll();
  }
}
