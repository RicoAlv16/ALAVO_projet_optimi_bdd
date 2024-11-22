import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Partygames } from './party-games.entity';
import { Messages } from './messages.entity';
import { Participation } from './participation.entity';

@Entity()
@Index('index_ville', ['city'])
@Index('index_type', ['type'])
@Index('index_date_heure', ['party_date_hour'])
export class Parties {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  place: string;

  @Column()
  type: string;

  @Column()
  party_date_hour: Date;

  @Column()
  total_places: number;

  @Column()
  remain_places: number;

  @Column()
  for_pay: boolean;

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column({ nullable: true })
  what_bring: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => User, (user) => user.organized_parties)
  organizer: User;

  @OneToMany(() => Participation, (participation) => participation.parties)
  participations: Participation[];

  @OneToMany(() => Messages, (message) => message.party)
  party_messages: Messages[];

  @OneToMany(() => Partygames, (partygames) => partygames.party)
  associated_party: Partygames[];
}
