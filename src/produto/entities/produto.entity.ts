import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Profissional } from "../../profissional/entities/profissional.entity";

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('text')
  descricao: string;

  @Column()
  categoria: string; // Ex: Limpeza, Tratamento, Maquiagem, etc.

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precoCusto: number;

  @Column()
  quantidade: number;

  @Column()
  quantidadeMinima: number; // Alerta quando estoque estiver baixo

  @Column()
  unidade: string; // Ex: ml, g, unidades, etc.

  @Column({ nullable: true })
  codigoBarras: string;

  @Column({ nullable: true })
  fornecedor: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ nullable: true })
  imagem: string; // URL da imagem do produto

  @Column({ type: 'date', nullable: true })
  dataValidade: Date;

  @Column({ nullable: true })
  lote: string;

  @ManyToOne(() => Profissional, { nullable: false })
  @JoinColumn({ name: 'profissionalId' })
  profissional: Profissional;

  @Column()
  profissionalId: number;

  @CreateDateColumn()
  dataCriacao: Date;

  @UpdateDateColumn()
  dataAtualizacao: Date;
}
