import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Unique("uniq-source-league-team", ["source", "league", "external_id"])
@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @Column()
  name: string;

  @Column()
  league: string;

  @Column()
  external_id: string;

  @Column()
  source: string;

  @Column()
  abbrev: string;
}
