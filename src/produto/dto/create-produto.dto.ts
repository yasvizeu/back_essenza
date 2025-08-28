import { IsString, IsNumber, IsOptional, IsBoolean, IsDateString, Min, IsPositive, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsString()
  categoria: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsPositive()
  preco: number;

  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  @IsNumber()
  @IsPositive()
  precoCusto?: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  quantidade: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  quantidadeMinima: number;

  @IsString()
  unidade: string;

  @IsOptional()
  @IsString()
  codigoBarras?: string;

  @IsOptional()
  @IsString()
  fornecedor?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsString()
  imagem?: string;

  @IsOptional()
  @IsDateString()
  dataValidade?: string;

  @IsOptional()
  @IsString()
  lote?: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  profissionalId: number;
}
