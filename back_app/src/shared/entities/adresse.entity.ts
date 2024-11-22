import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Adresse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adresse: string;

  @Column()
  city: string;

  @Column()
  code_postal: number;

  @Column()
  country: string;

  @OneToOne(() => User, (user) => user.adresse)
  @JoinColumn()
  user_adresse: User;
}
