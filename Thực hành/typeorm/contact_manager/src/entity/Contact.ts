import {

    Column,

    Entity,

    PrimaryGeneratedColumn,

} from "typeorm";


@Entity()

export class Contact {

    @PrimaryGeneratedColumn()

    public readonly id: number;


    @Column()

    public name: string;


    @Column({type: "varchar"})

    public address: string;


    @Column({type: "varchar"})

    public email: string;


    @Column({type: "varchar"})

    public phone: string;

}