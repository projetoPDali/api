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
import { Models } from "./Models";
import { Material } from "./Material";
import { User } from "./User";
import { Rent } from "./Rent";

export type Gender = "masculino" | "feminino" | "unissex";

@Entity({ name: "bikes" })
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 30 })
  color: string;

  @Column({ nullable: false, length: 10 })
  size: string;

  @ManyToOne(() => Material, { nullable: false })
  @JoinColumn({ name: "materialId" })
  material: Material;

  @Column({
    nullable: false,
    type: "enum",
    enum: ["feminino", "masculino", "unissex"],
  })
  gender: Gender;

  @Column({ nullable: false, length: 10 })
  speedkit: string;

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

  @Column({ nullable: false, type: "float" })
  latitude: number;

  @Column({ nullable: false, type: "float" })
  longitude: number;

  @ManyToOne(() => Brand, { nullable: false })
  @JoinColumn({ name: "brandId" })
  brand: Brand;

  @ManyToOne(() => Models, { nullable: false })
  @JoinColumn({ name: "categoryId" })
  category: Models;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Photo, (photo) => photo.bike)
  photos: Photo[];

  @OneToMany(() => Rent, (rent) => rent.bike)
  rents: Rent[];
}
