import { Injectable } from '@nestjs/common';
import { CreateFichaAnamneseDto } from './dto/create-ficha-anamnese.dto';
import { UpdateFichaAnamneseDto } from './dto/update-ficha-anamnese.dto';

@Injectable()
export class FichaAnamneseService {
  create(createFichaAnamneseDto: CreateFichaAnamneseDto) {
    return 'This action adds a new fichaAnamnese';
  }

  findAll() {
    return `This action returns all fichaAnamnese`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fichaAnamnese`;
  }

  update(id: number, updateFichaAnamneseDto: UpdateFichaAnamneseDto) {
    return `This action updates a #${id} fichaAnamnese`;
  }

  remove(id: number) {
    return `This action removes a #${id} fichaAnamnese`;
  }
}
