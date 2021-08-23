import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("articles")
class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;
}

export { Article }