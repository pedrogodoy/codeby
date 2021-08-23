import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@Entity("claps")
class Claps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  claps: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  article_id: number;

  @ManyToOne(() => Article)
  @JoinColumn({ name: "article_id" })
  article: Article;

}

export { Claps }