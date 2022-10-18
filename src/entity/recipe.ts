import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  reference: string;

  @Column()
  memo: string;

  @Column()
  favorite: string;

  @Column()
  registration_date: string;
}
