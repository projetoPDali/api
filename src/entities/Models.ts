import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "models" })
export class Models {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 20, unique:true })
    name: string
}