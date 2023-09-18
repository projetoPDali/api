import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "materials" })
export class Material {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 20, unique: true })
    name: string;

    // Defina um enum para as opções desejadas
    public static enum = {
        STEEL: 'aço',
        ALUMINUM: 'alumínio',
        CARBON_FIBER: 'fibra de carbono',
        OTHER: 'outro',
    };
}
