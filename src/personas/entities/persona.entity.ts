import {Column} from "typeorm";

export abstract class Persona {
    @Column()
    name:string;

    @Column()
    age:number;

    @Column()
    email:string;

    @Column()
    password: string;

    @Column()
    cell: string;

    @Column()
    address: string;

    @Column()
    type: 'cliente'|'profissional';
}
