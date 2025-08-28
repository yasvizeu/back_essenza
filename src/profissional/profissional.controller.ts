import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfissionalService } from './profissional.service';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';

@Controller('profissional')
export class ProfissionalController {
  constructor(private readonly profissionalService: ProfissionalService) {}

  @Post()
  create(@Body() createProfissionalDto: CreateProfissionalDto) {
    return this.profissionalService.create(createProfissionalDto);
  }

  @Post('login')
  login(@Body() loginData: { email: string; password: string }) {
    return this.profissionalService.login(loginData);
  }

  @Get()
  findAll() {
    return this.profissionalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profissionalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfissionalDto: UpdateProfissionalDto) {
    return this.profissionalService.update(+id, updateProfissionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profissionalService.remove(+id);
  }
}
