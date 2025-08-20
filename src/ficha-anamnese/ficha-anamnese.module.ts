import { Module } from '@nestjs/common';
import { FichaAnamneseService } from './ficha-anamnese.service';
import { FichaAnamneseController } from './ficha-anamnese.controller';

@Module({
  controllers: [FichaAnamneseController],
  providers: [FichaAnamneseService],
})
export class FichaAnamneseModule {}
