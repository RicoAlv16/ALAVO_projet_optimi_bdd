import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Parties } from './parties.entity';
import { User } from './user.entity';

@Entity()
export class Participation {
  @PrimaryGeneratedColumn()
  id_participation: number;

  @Column({ type: 'timestamp' })
  date_demande: Date;

  @Column()
  statut: string;

  @Column({ default: false })
  paiement_effectue: boolean;

  @ManyToOne(() => Parties, (parties) => parties.participations)
  parties: Parties;

  @ManyToOne(() => User, (user) => user.participations)
  user: User;
}
