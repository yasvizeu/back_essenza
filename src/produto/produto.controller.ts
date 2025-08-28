import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get('categoria/:categoria')
  findByCategoria(@Param('categoria') categoria: string) {
    return this.produtoService.findByCategoria(categoria);
  }

  @Get('baixo-estoque')
  getProdutosBaixoEstoque() {
    return this.produtoService.getProdutosBaixoEstoque();
  }

  @Get('vencendo')
  getProdutosVencendo(@Query('dias') dias: number = 30) {
    return this.produtoService.getProdutosVencendo(dias);
  }

  @Get('inativos')
  getProdutosInativos() {
    return this.produtoService.getProdutosInativos();
  }

  @Get('estatisticas')
  getEstatisticasEstoque() {
    return this.produtoService.getEstatisticasEstoque();
  }

  @Get('buscar')
  buscarProdutos(@Query('termo') termo: string) {
    return this.produtoService.buscarProdutos(termo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }

  // ===== ENDPOINTS DE ESTOQUE =====

  @Post(':id/adicionar-estoque')
  adicionarEstoque(
    @Param('id') id: string,
    @Body() data: { quantidade: number }
  ) {
    const quantidade = typeof data.quantidade === 'string' ? parseInt(data.quantidade) : data.quantidade;
    return this.produtoService.adicionarEstoque(+id, quantidade);
  }

  @Post(':id/remover-estoque')
  removerEstoque(
    @Param('id') id: string,
    @Body() data: { quantidade: number }
  ) {
    const quantidade = typeof data.quantidade === 'string' ? parseInt(data.quantidade) : data.quantidade;
    return this.produtoService.removerEstoque(+id, quantidade);
  }

  @Patch(':id/ajustar-estoque')
  ajustarEstoque(
    @Param('id') id: string,
    @Body() data: { quantidade: number }
  ) {
    const quantidade = typeof data.quantidade === 'string' ? parseInt(data.quantidade) : data.quantidade;
    return this.produtoService.ajustarEstoque(+id, quantidade);
  }
}
