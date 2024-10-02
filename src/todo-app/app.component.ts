import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoTableComponent } from "./todo-table/todo-table.component";
import { IToDo } from "../../models/interfaces/IToDo";
import { TodosService } from "./services/todos.service";
import { mergeMap, tap } from "rxjs";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoTableComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allTodos: IToDo[] = [];
  newTodoTask: string = '';
  newTodoDate: Date = new Date('');
  newTodoPriority: number | null = null;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosService.getTodos()
      .subscribe({
        next: (todos: IToDo[]) => {
          this.allTodos = todos;
          console.log(todos);
        }
      });
  }

  addTodo() {
    const parsedDate = new Date(this.newTodoDate);

    const todoPayload = {
      task: this.newTodoTask,
      dateDue: parsedDate,
      priority: this.newTodoPriority,
      completed: false
    } as Omit<IToDo, 'id' | 'created' | 'modified'>;

    this.todosService.addTodo(todoPayload)
      .pipe(
        mergeMap(() => this.todosService.getTodos()),
        tap((refreshedTodos: IToDo[]) => this.allTodos = refreshedTodos)
      )
      .subscribe({
        next: (result) => {
          console.log(result);
        }
      });
  }

  setTodoCompletedState(event: IToDo) {
    this.todosService.updateTodo(event)
      .subscribe({
        next: (result) => {
          console.log(result);
        }
      });
  }

  deleteTodo(event: IToDo) {
    this.todosService.removeTodo(event)
      .pipe(
        mergeMap(() => this.todosService.getTodos()),
        tap((refreshedTodos: IToDo[]) => this.allTodos = refreshedTodos)
      )
      .subscribe({
        next: (result) => {
          console.log(result);
        }
      });
  }
}
