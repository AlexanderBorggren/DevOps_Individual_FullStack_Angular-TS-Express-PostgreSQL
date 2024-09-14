import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IToDo} from "../../../server/entities/IToDo";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<IToDo[]> {
    return this.http.get<{status: string, data: IToDo[]}>(`${this.baseUrl}/todos`)
      .pipe(
        map(res => res.data)
      )
  }

  addTodo(newTodo: { task: string, dateDue: string, priority: number }) {
    return this.http.post(`${this.baseUrl}/todos`, newTodo);
  }

  updateTodo(todo: IToDo) {
    const {id, completed} = todo;

    return this.http.patch(`${this.baseUrl}/todos/${id}`, {completed});
  }

  deleteTodo(todo: IToDo) {
    const {id} = todo;

    return this.http.delete(`${this.baseUrl}/todos/${id}`);
  }
}
