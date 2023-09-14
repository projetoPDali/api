import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Bike } from "./Bike";
import { User } from "./User";

export type Valuation = 1 | 2 | 3 | 4 | 5;

@Entity({ name: "rents" })
export class Rent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "date" })
    date: Date;

    @Column({
        nullable: false,
        type: "enum",
        enum: [1, 2, 3, 4, 5],
    })
    ownervaluation: Valuation;

    @Column({
        nullable: true,
        type: "enum",
        enum: [1, 2, 3, 4, 5],
    })
    clientvaluation: Valuation;

    @ManyToOne(() => Bike, { nullable: false })
    @JoinColumn({ name: "bikeId", referencedColumnName: "id" })
    bike: Bike;

   

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    users: User;
}
