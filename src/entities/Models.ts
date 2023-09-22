import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "models" })
export class Models {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50, unique: true })
  name: string;

  public static enum = {
    MTB: "mtb",
    DH_FR_DIRT: "dh-fr-dirt",
    SPEED: "speed",
    GRAVEL: "gravel",
    BMX: "bmx",
    FULL_SUSPENSION: "full suspension",
    HIBRIDO: "hibrido",
    OTHER: "outro",
  };
}