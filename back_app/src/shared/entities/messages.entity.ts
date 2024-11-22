import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Parties } from './parties.entity';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contain: string;

  @Column({ type: 'timestamp' })
  sent_date: Date;

  @ManyToOne(() => User, (user) => user.sent_messages)
  sender: User;

  @ManyToOne(() => User, (user) => user.receip_messages)
  recipient: User;

  @ManyToOne(() => Parties, (parties) => parties.party_messages)
  party: Parties;
}
