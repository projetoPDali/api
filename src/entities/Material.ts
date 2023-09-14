import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "materials" })
export class Material {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 20, unique:true })
    name: string
}