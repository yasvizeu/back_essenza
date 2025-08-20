import { Module } from '@nestjs/common';
import { FichaAnamneseService } from './ficha-anamnese.service';
import { FichaAnamneseController } from './ficha-anamnese.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaAnamnese } from './entities/ficha-anamnese.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FichaAnamnese])],
  controllers: [FichaAnamneseController],
  providers: [FichaAnamneseService],
  exports: [TypeOrmModule],
})
export class FichaAnamneseModule {}
