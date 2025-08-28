import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const produto = this.produtoRepository.create(createProdutoDto);
    return await this.produtoRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: ['profissional'],
      order: { nome: 'ASC' }
    });
  }

  async findByCategoria(categoria: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { categoria, ativo: true },
      relations: ['profissional'],
      order: { nome: 'ASC' }
    });
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['profissional']
    });
    
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    
    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id);
    Object.assign(produto, updateProdutoDto);
    return await this.produtoRepository.save(produto);
  }

  async remove(id: number): Promise<void> {
    const produto = await this.findOne(id);
    await this.produtoRepository.remove(produto);
  }

  // ===== FUNCIONALIDADES DE ESTOQUE =====

  async adicionarEstoque(id: number, quantidade: number): Promise<Produto> {
    if (quantidade <= 0) {
      throw new BadRequestException('Quantidade deve ser maior que zero');
    }

    const produto = await this.findOne(id);
    produto.quantidade += quantidade;
    return await this.produtoRepository.save(produto);
  }

  async removerEstoque(id: number, quantidade: number): Promise<Produto> {
    if (quantidade <= 0) {
      throw new BadRequestException('Quantidade deve ser maior que zero');
    }

    const produto = await this.findOne(id);
    
    if (produto.quantidade < quantidade) {
      throw new BadRequestException('Quantidade insuficiente em estoque');
    }

    produto.quantidade -= quantidade;
    return await this.produtoRepository.save(produto);
  }

  async ajustarEstoque(id: number, novaQuantidade: number): Promise<Produto> {
    if (novaQuantidade < 0) {
      throw new BadRequestException('Quantidade não pode ser negativa');
    }

    const produto = await this.findOne(id);
    produto.quantidade = novaQuantidade;
    return await this.produtoRepository.save(produto);
  }

  // ===== RELATÓRIOS DE ESTOQUE =====

  async getProdutosBaixoEstoque(): Promise<Produto[]> {
    return await this.produtoRepository
      .createQueryBuilder('produto')
      .leftJoinAndSelect('produto.profissional', 'profissional')
      .where('produto.quantidade <= produto.quantidadeMinima')
      .andWhere('produto.ativo = :ativo', { ativo: true })
      .orderBy('produto.quantidade', 'ASC')
      .getMany();
  }

  async getProdutosVencendo(dias: number = 30): Promise<Produto[]> {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + dias);

    return await this.produtoRepository
      .createQueryBuilder('produto')
      .leftJoinAndSelect('produto.profissional', 'profissional')
      .where('produto.dataValidade IS NOT NULL')
      .andWhere('produto.dataValidade <= :dataLimite', { dataLimite })
      .andWhere('produto.ativo = :ativo', { ativo: true })
      .orderBy('produto.dataValidade', 'ASC')
      .getMany();
  }

  async getProdutosInativos(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { ativo: false },
      relations: ['profissional'],
      order: { nome: 'ASC' }
    });
  }

  async getEstatisticasEstoque(): Promise<any> {
    const totalProdutos = await this.produtoRepository.count();
    const produtosAtivos = await this.produtoRepository.count({ where: { ativo: true } });
    const produtosBaixoEstoque = await this.produtoRepository.count({
      where: 'quantidade <= quantidadeMinima'
    });
    
    const valorTotalEstoque = await this.produtoRepository
      .createQueryBuilder('produto')
      .select('SUM(produto.preco * produto.quantidade)', 'valorTotal')
      .where('produto.ativo = :ativo', { ativo: true })
      .getRawOne();

    return {
      totalProdutos,
      produtosAtivos,
      produtosBaixoEstoque,
      valorTotalEstoque: parseFloat(valorTotalEstoque.valorTotal || '0')
    };
  }

  async buscarProdutos(termo: string): Promise<Produto[]> {
    return await this.produtoRepository
      .createQueryBuilder('produto')
      .leftJoinAndSelect('produto.profissional', 'profissional')
      .where('produto.nome LIKE :termo', { termo: `%${termo}%` })
      .orWhere('produto.descricao LIKE :termo', { termo: `%${termo}%` })
      .orWhere('produto.categoria LIKE :termo', { termo: `%${termo}%` })
      .orWhere('produto.codigoBarras = :termo', { termo })
      .andWhere('produto.ativo = :ativo', { ativo: true })
      .orderBy('produto.nome', 'ASC')
      .getMany();
  }
}
