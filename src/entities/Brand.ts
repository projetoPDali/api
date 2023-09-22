import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "brands" })
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50, unique: true })
  name: string;

  public static enum = {
    CALOI: "caloi",
    MONARK: "monark",
    OGGI: "oggi",
    SENSE: "sense",
    SOULS_CYCLES: "souls_cycles",
    AUDAX: "audax",
    SENSE_CARBON: "sense_carbon",
    VZAN: "vzan",
    MERIDA: "merida",
    SPECIALIZED: "specialized",
    CANNONDALE: "cannondale",
    TREK: "trek",
    SCOTT: "scott",
    GIANT: "giant",
    ORBEA: "orbea",
    GT: "gt",
    SANTA_CRUZ: "santa_cruz",
    OTHER: "outro",
  };
}