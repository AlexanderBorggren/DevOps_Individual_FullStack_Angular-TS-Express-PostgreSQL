import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "../server/node_modules/typeorm";
import {IToDo} from "./interfaces/IToDo";

@Entity()
export class Todo implements IToDo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  task!: string;

  @Column()
  dateDue!: Date;

  @Column()
  priority!: number;

  @Column()
  completed!: boolean;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  modified!: Date;

  @DeleteDateColumn()
  deleted!: Date;
}
