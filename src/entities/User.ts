import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rent } from "./Rent";
import { Address } from "./Address";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 40, unique: true })
  name: string;

  @Column({ nullable: false, length: 30 })
  alias: string;

  @Column({ nullable: false, length: 50, unique: true })
  mail: string;

  @Column({ nullable: true, length: 20, unique: true })
  phone: string;

  @Column({ nullable: true, length: 50,})
  password: string;

  @OneToMany(() => Rent, (rent) => rent.bike)
  rents: Rent[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
}
