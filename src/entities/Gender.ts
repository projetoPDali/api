import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "gender" })
export class Gender {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 50, unique:true })
    name: string

    public static enum = {
        FEMALE: 'feminino',
        MALE: 'masculino',
        UNISSEX: 'unissex',
    };
}


