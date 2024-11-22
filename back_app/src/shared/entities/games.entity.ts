import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Partygames } from './party-games.entity';

@Entity()
export class Games {
  @PrimaryGeneratedColumn()
  id_jeu: number;

  @Column()
  gameName: string;

  @Column()
  type: string;

  @Column()
  nombre_joueurs_min: number;

  @Column()
  nombre_joueurs_max: number;

  @OneToMany(() => Partygames, (partyGame) => partyGame.associated_game)
  parties: Partygames[];
}
