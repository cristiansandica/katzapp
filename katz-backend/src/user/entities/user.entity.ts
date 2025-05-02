import { Katz } from "src/katz/entities/katz.entity";
import { IsEmail, IsStrongPassword } from "class-validator";
import { Entity, PrimaryColumn, Column, OneToOne } from "typeorm";

@Entity("users")
export class User {
  @PrimaryColumn()
  uid: string;

  @IsEmail()
  @Column()
  email: string;

  @IsStrongPassword()
  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  isGoogleAccount: boolean;

  @OneToOne(() => Katz, (katz) => katz.user)
  kat: Katz;
}
