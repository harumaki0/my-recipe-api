import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Blog{

    @PrimaryGeneratedColumn()
    blog_id: number;

    @Column()
    content: string;

    @Column()
    created_at: Date;

    @Column()
    title: string;
}