import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { InterfaceDates } from '../interfaces/the-dates.interface';
import { InterfaceUser } from '../interfaces/user.interface';
import { Comments } from './comments.entity';
import { Adresse } from './adresse.entity';
import { Parties } from './parties.entity';
import { Messages } from './messages.entity';
import { Participation } from './participation.entity';

@Entity()
@Index('index_email', ['email']) // Ajout d'un index
export class User extends BaseEntity implements InterfaceUser, InterfaceDates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'], default: 'other' })
  gender: string;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @Column({ type: 'text', nullable: true })
  hobbies: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Exclude({ toPlainOnly: true })
  @Column()
  salt: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToOne(() => Adresse, (adresse) => adresse.user_adresse, { eager: false })
  adresse: Adresse;

  @OneToMany(() => Comments, (comments) => comments.target_user)
  receipComments: Comments[];

  @OneToMany(() => Comments, (comments) => comments.author_user)
  postComments: Comments[];

  @OneToMany(() => Parties, (parties) => parties.organizer)
  organized_parties: Parties[];

  @OneToMany(() => Messages, (messages) => messages.sender)
  sent_messages: Messages[];

  @OneToMany(() => Messages, (messages) => messages.recipient)
  receip_messages: Messages[];

  @OneToMany(() => Participation, (participation) => participation.user)
  participations: Participation[];

  // Encrypt password
  async setPassword(password: string): Promise<void> {
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password, this.salt);
  }

  // Validate password
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
