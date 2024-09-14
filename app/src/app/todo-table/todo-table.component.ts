import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IToDo } from "../../../../server/entities/IToDo";
import {CommonModule} from "@angular/common";
@Component({
  selector: 'app-todo-table',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.css'
})
export class TodoTableComponent {

  @Input() todos: IToDo[] = [];
  @Output() changed = new EventEmitter<IToDo>();
  @Output() deleted = new EventEmitter<IToDo>();

  toggleTodoCompletedState(todo: IToDo){
    todo.completed = !todo.completed;
    this.changed.emit(todo);
  }
  removeTodo(todo: IToDo){
    this.deleted.emit(todo);}

}
