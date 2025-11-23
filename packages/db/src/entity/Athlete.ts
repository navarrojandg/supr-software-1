import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique("uniq-source-athlete", ["source", "external_id"])
@Entity()
export class Athlete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  external_id: string;

  @Column()
  source: string;
}
