import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { Produto } from './entities/produto.entity';
import { ProfissionalModule } from '../profissional/profissional.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]),
    ProfissionalModule
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [ProdutoService]
})
export class ProdutoModule {}
