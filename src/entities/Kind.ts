import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "kinds" })
export class Kind {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 100, unique:true })
    male: string

    @Column({ nullable: false, length: 100, unique:true })
    female: string
}