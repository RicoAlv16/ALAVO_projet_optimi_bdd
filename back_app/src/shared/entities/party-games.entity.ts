import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Parties } from './parties.entity';
import { Games } from './games.entity';

@Entity()
export class Partygames {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  suggest_by_organizer: boolean;

  @Column({ type: 'int', default: 0 })
  votes: number;

  @ManyToOne(() => Parties, (parties) => parties.associated_party)
  party: Parties;

  @ManyToOne(() => Games, (games) => games.parties)
  associated_game: Games;
}
