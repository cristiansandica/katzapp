import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity('katz')
export class Katz {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    imageUrl: string;

    @Column()
    userUid: string;

    @OneToOne(() => User, (user) => user.kat, { eager: false })
    @JoinColumn({ name: "userUid", referencedColumnName: 'uid'})
    user: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}  