import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

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

  @Column({ nullable: false })
  cep: number;

  @Column({ nullable: true })
  number: number;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: "iduser" })
  user: User;
}
