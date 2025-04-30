import { Katz } from 'src/katz/entities/katz.entity';
import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn()
    uid: string;

    @Column()
    email: string;

    @OneToOne(() => Katz, (katz) => katz.user)
    kat: Katz
}