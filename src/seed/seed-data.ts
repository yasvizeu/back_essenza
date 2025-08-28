import { DataSource } from 'typeorm';
import { Produto } from '../produto/entities/produto.entity';
import { Profissional } from '../profissional/entities/profissional.entity';

export async function seedDatabase(dataSource: DataSource) {
  const produtoRepository = dataSource.getRepository(Produto);
  const profissionalRepository = dataSource.getRepository(Profissional);

  // Criar profissional de teste
  let profissional = await profissionalRepository.findOne({ where: { email: 'admin@essenza.com' } });
  
  if (!profissional) {
    profissional = profissionalRepository.create({
      name: 'Administrador Essenza',
      email: 'admin@essenza.com',
      password: 'admin123',
      cpf: '12345678901',
      cell: '11999999999',
      address: 'Rua das Flores, 123 - São Paulo/SP',
      birthDate: '1990-01-01',
      type: 'profissional',
      especialidade: 'Administrador',
      admin: true,
      cnec: 12345
    });
    await profissionalRepository.save(profissional);
  }

  // Produtos de teste para clínica de estética
  const produtosTeste = [
    {
      nome: 'Protetor Solar FPS 50',
      descricao: 'Protetor solar facial com FPS 50, textura leve e não comedogênico',
      categoria: 'Proteção Solar',
      preco: 89.90,
      precoCusto: 45.00,
      quantidade: 25,
      quantidadeMinima: 5,
      unidade: 'ml',
      codigoBarras: '7891234567890',
      fornecedor: 'La Roche Posay',
      ativo: true,
      profissionalId: profissional.id
    },
    {
      nome: 'Ácido Hialurônico 2%',
      descricao: 'Sérum com ácido hialurônico para hidratação profunda da pele',
      categoria: 'Tratamento',
      preco: 120.00,
      precoCusto: 60.00,
      quantidade: 15,
      quantidadeMinima: 3,
      unidade: 'ml',
      codigoBarras: '7891234567891',
      fornecedor: 'The Ordinary',
      ativo: true,
      profissionalId: profissional.id
    },
    {
      nome: 'Retinol 0.5%',
      descricao: 'Sérum com retinol para renovação celular e tratamento de rugas',
      categoria: 'Tratamento',
      preco: 150.00,
      precoCusto: 75.00,
      quantidade: 8,
      quantidadeMinima: 2,
      unidade: 'ml',
      codigoBarras: '7891234567892',
      fornecedor: 'The Ordinary',
      ativo: true,
      profissionalId: profissional.id
    },
    {
      nome: 'Vitamina C 20%',
      descricao: 'Sérum com vitamina C para clareamento e proteção antioxidante',
      categoria: 'Tratamento',
      preco: 95.00,
      precoCusto: 47.50,
      quantidade: 12,
      quantidadeMinima: 3,
      unidade: 'ml',
      codigoBarras: '7891234567893',
      fornecedor: 'The Ordinary',
      ativo: true,
      profissionalId: profissional.id
    },
    {
      nome: 'Gel Limpeza Facial',
      descricao: 'Gel de limpeza suave para todos os tipos de pele',
      categoria: 'Limpeza',
      preco: 65.00,
      precoCusto: 32.50,
      quantidade: 30,
      quantidadeMinima: 5,
      unidade: 'ml',
      codigoBarras: '7891234567894',
      fornecedor: 'CeraVe',
      ativo: true,
      profissionalId: profissional.id
    },
    {
      nome: 'Hidratante Facial',
      descricao: 'Creme hidratante com ceramidas para pele seca e sensível',
      categoria: 'Hidratação',
      preco: 75.00,
      precoCusto: 37.50,
      quantidade: 20,
      quantidadeMinima: 4,
      unidade: 'ml',
      codigoBarras: '7891234567895',
      fornecedor: 'CeraVe',
      ativo: true,
      profissionalId: profissional.id
    },
    {
      nome: 'Máscara de Argila',
      descricao: 'Máscara facial com argila verde para controle de oleosidade',
      categoria: 'Tratamento',
      preco: 45.00,
      precoCusto: 22.50,
      quantidade: 18,
      quantidadeMinima: 3,
      unidade: 'g',
      codigoBarras: '7891234567896',
      fornecedor: 'L\'Oréal',
      ativo: true,
      profissionalId: profissional.id
    },
    {
      nome: 'Tônico Facial',
      descricao: 'Tônico sem álcool para equilibrar o pH da pele',
      categoria: 'Limpeza',
      preco: 55.00,
      precoCusto: 27.50,
      quantidade: 22,
      quantidadeMinima: 4,
      unidade: 'ml',
      codigoBarras: '7891234567897',
      fornecedor: 'Neutrogena',
      ativo: true,
      profissionalId: profissional.id
    },
    {
      nome: 'Óleo Facial',
      descricao: 'Óleo facial com ácidos graxos essenciais para nutrição',
      categoria: 'Hidratação',
      preco: 85.00,
      precoCusto: 42.50,
      quantidade: 10,
      quantidadeMinima: 2,
      unidade: 'ml',
      codigoBarras: '7891234567898',
      fornecedor: 'The Ordinary',
      ativo: true,
      profissionalId: profissional.id
    },
    {
      nome: 'Esfoliante Facial',
      descricao: 'Esfoliante suave com partículas de jojoba para renovação',
      categoria: 'Tratamento',
      preco: 70.00,
      precoCusto: 35.00,
      quantidade: 15,
      quantidadeMinima: 3,
      unidade: 'ml',
      codigoBarras: '7891234567899',
      fornecedor: 'Neutrogena',
      ativo: true,
      profissionalId: profissional.id
    }
  ];

  // Verificar se já existem produtos
  const produtosExistentes = await produtoRepository.count();
  
  if (produtosExistentes === 0) {
    console.log('🌱 Populando banco de dados com produtos de teste...');
    
    for (const produtoData of produtosTeste) {
      const produto = produtoRepository.create(produtoData);
      await produtoRepository.save(produto);
      console.log(`✅ Produto criado: ${produto.nome}`);
    }
    
    console.log('🎉 Banco de dados populado com sucesso!');
  } else {
    console.log('📦 Produtos já existem no banco de dados');
  }
}
