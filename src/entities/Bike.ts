import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Brand } from "./Brand";
import { Photo } from "./Photo";
import { Models } from "./Models";
import { Material } from "./Material";
import { User } from "./User";
import { Address } from "./Address";


export enum BikeGender {
  FEMININO = "feminino",
  MASCULINO = "masculino",
  UNISSEX = "unissex",
}

@Entity({ name: "bikes" })
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 10 })
  size: string;

  @ManyToOne(() => Material, { nullable: false })
  @JoinColumn({ name: "materialId" })
  material: Material;

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

  @ManyToOne(() => Address, { nullable: false })
  @JoinColumn({ name: "addressId" })
  address: Address;

  
  @ManyToOne(() => Brand, { nullable: false })
  @JoinColumn({ name: "brandId" })
  brand: Brand;

  @ManyToOne(() => Models, { nullable: false })
  @JoinColumn({ name: "categoryId" })
  category: Models;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({
    type: "enum",
    enum: BikeGender,
    default: BikeGender.UNISSEX, // Valor padrão
  })
  gender: BikeGender;

  @OneToMany(() => Photo, (photo) => photo.bike)
  photos: Photo[];

}
