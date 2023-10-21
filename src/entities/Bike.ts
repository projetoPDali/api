import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brand } from "./Brand";
import { Photo } from "./Photo";
import { Material } from "./Material";
import { User } from "./User";
import { Rent } from "./Rent";
import { Address } from "./Address";
import { Gender } from "./Gender";



@Entity({ name: "bikes" })
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  title: string;

  @Column({ nullable: false, length: 10 })
  size: string;

  @Column({ nullable: false, length: 10 })
  gear: string;

  @Column({ nullable: false, type: "float" })
  rim: number;

  @Column({ nullable: false })
  suspension: boolean;

  @Column({ nullable: false, length: 200 })
  description: string;

  @Column({ nullable: false, type: "decimal", precision: 10, scale: 2 })
  hourlyvalue: number;

  @Column({ nullable: false, type: "decimal", precision: 10, scale: 2 })
  dailyvalue: number;

  @ManyToOne(() => Brand, { nullable: false })
  @JoinColumn({ name: "idbrand" })
  brand: Brand;

  @ManyToOne(() => Gender, { nullable: false })
  @JoinColumn({ name: "idgender" })
  gender: Gender;

  @ManyToOne(() => Material, { nullable: false })
  @JoinColumn({ name: "idmaterial" })
  material: Material;

  @ManyToOne(() => Address, { nullable: false })
  @JoinColumn({ name: "idaddress" })
  address: Address;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "iduser" })
  user: User;

  @OneToMany(() => Photo, (photo) => photo.bike)
  photos: Photo[];

  @OneToMany(() => Rent, (rent) => rent.bike)
  rents: Rent[];
}
