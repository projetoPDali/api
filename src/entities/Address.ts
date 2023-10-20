import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity({ name: "addresses" })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column({ nullable: false, length: 100 })
  street: string;

  @Column({ nullable: false, length: 50 })
  city: string;

  @Column({ nullable: true, length: 50 })
  neighborhood: string;

  @Column({ nullable: false, length: 50 })
  state: string;

  @Column({ nullable: false, })
  cep: number;

  @Column({ nullable: true, })
  number: number;
  // Outros campos de endereço, se necessário
}
