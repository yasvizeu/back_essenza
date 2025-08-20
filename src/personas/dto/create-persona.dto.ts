export class CreatePersonaDto {
    name: string;
    age: number;
    email: string;
    password: string;
    cell: string;
    address: string;
    type: 'cliente'| 'profissional';
}
